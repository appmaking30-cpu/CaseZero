import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  archiveCompletedCase,
  EMPTY_INVESTIGATION_ARCHIVE,
  getPriorCaseMemory,
} from '../../artifacts/casezero/game/investigationArchive';
import {
  CASE_001,
  getInvestigationMemory,
  isDeductionCorrect,
  isTimelineCorrect,
} from '../../artifacts/casezero/game/case001';
import { CASE_002, getCase002Carryover } from '../../artifacts/casezero/game/case002';
import { getMissingDetectiveArcStatus, MISSING_DETECTIVE_DOSSIER } from '../../artifacts/casezero/game/missingDetectiveArc';
import {
  CASE_003_GAME,
  EMPTY_CASE003_PROGRESS,
  getCase003Carryover,
  getCase003QuestionReply,
  isCase003DeductionCorrect,
  isCase003TimelineCorrect,
} from '../../artifacts/casezero/game/case003Game';

test('Case 001 has a complete, distinct evidence and witness set', () => {
  assert.equal(CASE_001.clues.length, 5);
  assert.equal(new Set(CASE_001.clues.map((clue) => clue.id)).size, 5);
  assert.equal(CASE_001.witnesses.length, 3);
  assert.ok(CASE_001.witnesses.every((witness) => witness.questions.length === 2));
});

test('timeline accepts the evidence-backed chronological order only', () => {
  assert.equal(
    isTimelineCorrect(['key', 'cart', 'receipt', 'inventory']),
    true,
  );
  assert.equal(
    isTimelineCorrect(['inventory', 'receipt', 'cart', 'key']),
    false,
  );
  assert.equal(isTimelineCorrect(['key', 'cart']), false);
});

test('deduction requires both the correct person and motive', () => {
  assert.equal(isDeductionCorrect('miles', 'protect'), true);
  assert.equal(isDeductionCorrect('miles', 'steal'), false);
  assert.equal(isDeductionCorrect('ada', 'protect'), false);
  assert.equal(isDeductionCorrect(null, 'protect'), false);
});

test('the case review separates truth, proof and outcome', () => {
  assert.ok(CASE_001.truth.length > 40);
  assert.ok(CASE_001.proof.length > 80);
  assert.ok(CASE_001.outcome.length > 40);
});

test('the protective motive is supported by a dated, signed record', () => {
  const leakClue = CASE_001.clues.find((clue) => clue.id === 'leak');
  assert.ok(leakClue);
  assert.match(leakClue.detail, /21:05/);
  assert.match(leakClue.detail, /21:11/);
  assert.ok(leakClue.detail.includes('M.R.'));
  assert.match(leakClue.detail, /keep it dry/i);
  assert.match(CASE_001.proof, /maintenance ticket/i);
});


test('investigation memory records exact evidence and interview choices', () => {
  const memory = getInvestigationMemory(
    ['leak', 'wheel'],
    ['jo:sound', 'nia:route'],
  );

  assert.deepEqual(memory.inspectedClues, [
    'The ceiling stain',
    'The chipped cart wheel',
  ]);
  assert.deepEqual(memory.askedQuestions, [
    'Jo Bell: What did you hear near the records room?',
    'Nia Vale: What did you see after the departure announcement?',
  ]);
  assert.equal(memory.unansweredQuestions.length, 4);
  assert.ok(memory.unansweredQuestions.every((note) => !memory.askedQuestions.includes(note)));
});


test('cross-case archive stores completed investigations without duplicate cases', () => {
  const firstRecord = {
    caseId: 'case001',
    caseTitle: 'The Last Train Home',
    closedAt: '2026-11-01T12:00:00.000Z',
    selectedSuspectId: 'miles',
    selectedMotiveId: 'protect',
    inspectedClues: ['The ceiling stain'],
    askedQuestions: ['Jo Bell: What did you hear near the records room?'],
    unansweredQuestions: ['Nia Vale: Was the parcel damaged?'],
  };
  const secondRecord = {
    ...firstRecord,
    caseId: 'case002',
    caseTitle: 'The Unlit Room',
  };

  const withFirst = archiveCompletedCase(EMPTY_INVESTIGATION_ARCHIVE, firstRecord);
  const withBoth = archiveCompletedCase(withFirst, secondRecord);
  const updatedFirst = archiveCompletedCase(withBoth, {
    ...firstRecord,
    unansweredQuestions: [],
  });

  assert.equal(updatedFirst.version, 1);
  assert.deepEqual(
    updatedFirst.completedCases.map((record) => record.caseId),
    ['case002', 'case001'],
  );
  assert.deepEqual(
    getPriorCaseMemory(updatedFirst, 'case002').map((record) => record.caseId),
    ['case001'],
  );
  assert.equal(updatedFirst.completedCases[1].unansweredQuestions.length, 0);
});


test('Case 002 receives only the actual findings and unanswered lead from Case 001', () => {
  const fresh = getCase002Carryover(EMPTY_INVESTIGATION_ARCHIVE);
  assert.equal(fresh.hasPriorCase, false);
  assert.equal(fresh.unansweredLead, null);

  const prior = archiveCompletedCase(EMPTY_INVESTIGATION_ARCHIVE, {
    caseId: 'case001',
    caseTitle: CASE_001.title,
    closedAt: '2026-11-01T12:00:00.000Z',
    selectedSuspectId: 'miles',
    selectedMotiveId: 'protect',
    inspectedClues: ['The ceiling stain', 'The chipped cart wheel'],
    askedQuestions: ['Jo Bell: What did you hear near the records room?'],
    unansweredQuestions: ['Nia Vale: Was the parcel damaged?'],
  });
  const carryover = getCase002Carryover(prior);

  assert.equal(CASE_002.id, 'case002');
  assert.equal(carryover.hasPriorCase, true);
  assert.match(carryover.priorConclusion ?? '', /Miles Renn moved the envelope/);
  assert.match(carryover.fieldLesson, /environmental conditions/i);
  assert.equal(carryover.unansweredLead, 'Nia Vale: Was the parcel damaged?');
  assert.deepEqual(carryover.inspectedEvidence, [
    'The ceiling stain',
    'The chipped cart wheel',
  ]);
});


import {
  CASE_002_GAME,
  getCase002QuestionReply,
  isCase002DeductionCorrect,
  isCase002TimelineCorrect,
} from '../../artifacts/casezero/game/case002Game';

test('Case 002 is a complete, evidence-backed investigation', () => {
  assert.equal(CASE_002_GAME.clues.length, 4);
  assert.equal(CASE_002_GAME.witnesses.length, 3);
  assert.ok(CASE_002_GAME.witnesses.every((witness) => witness.questions.length === 2));
  assert.equal(CASE_002_GAME.timelineEvents.length, 4);
  assert.ok(CASE_002_GAME.truth.length > 60);
  assert.ok(CASE_002_GAME.proof.length > 100);
});

test('Case 002 timeline and deduction require the complete correct solution', () => {
  assert.equal(isCase002TimelineCorrect(['access', 'closed', 'outage', 'transfer']), true);
  assert.equal(isCase002TimelineCorrect(['access', 'outage', 'closed', 'transfer']), false);
  assert.equal(isCase002DeductionCorrect('june', 'protect'), true);
  assert.equal(isCase002DeductionCorrect('june', 'steal'), false);
  assert.equal(isCase002DeductionCorrect('ellis', 'protect'), false);
});

test('Case 001 history changes Case 002 interview dialogue', () => {
  const emptyReply = getCase002QuestionReply('ellis', 'water', EMPTY_INVESTIGATION_ARCHIVE);
  const withPrior = archiveCompletedCase(EMPTY_INVESTIGATION_ARCHIVE, {
    caseId: 'case001',
    caseTitle: CASE_001.title,
    closedAt: '2026-11-01T12:00:00.000Z',
    selectedSuspectId: 'miles',
    selectedMotiveId: 'protect',
    inspectedClues: ['The ceiling stain'],
    askedQuestions: [],
    unansweredQuestions: ['Nia Vale: Was the parcel damaged?'],
  });
  const rememberedReply = getCase002QuestionReply('ellis', 'water', withPrior);
  assert.notEqual(rememberedReply, emptyReply);
  assert.match(rememberedReply, /last file/i);
  assert.match(getCase002QuestionReply('mara', 'key', withPrior), /left a question unanswered/i);
});


test('Missing Detective campaign arc unlocks only after both opening cases close', () => {
  const locked = getMissingDetectiveArcStatus(EMPTY_INVESTIGATION_ARCHIVE);
  assert.equal(locked.unlocked, false);
  assert.equal(locked.completedCaseCount, 0);
  assert.deepEqual(locked.missingCaseIds, ['case001', 'case002']);

  const caseOne = archiveCompletedCase(EMPTY_INVESTIGATION_ARCHIVE, {
    caseId: 'case001',
    caseTitle: CASE_001.title,
    closedAt: '2026-11-01T12:00:00.000Z',
    selectedSuspectId: 'miles',
    selectedMotiveId: 'protect',
    inspectedClues: [],
    askedQuestions: [],
    unansweredQuestions: [],
  });
  const oneClosed = getMissingDetectiveArcStatus(caseOne);
  assert.equal(oneClosed.unlocked, false);
  assert.deepEqual(oneClosed.missingCaseIds, ['case002']);

  const bothClosed = archiveCompletedCase(caseOne, {
    caseId: 'case002',
    caseTitle: 'The Unlit Room',
    closedAt: '2026-11-01T12:30:00.000Z',
    selectedSuspectId: 'june',
    selectedMotiveId: 'protect',
    inspectedClues: [],
    askedQuestions: [],
    unansweredQuestions: [],
  });
  const unlocked = getMissingDetectiveArcStatus(bothClosed);
  assert.equal(unlocked.unlocked, true);
  assert.equal(unlocked.completedCaseCount, 2);
  assert.deepEqual(unlocked.missingCaseIds, []);
  assert.match(MISSING_DETECTIVE_DOSSIER.recoveredNote, /changed after they were closed/i);
});


test('Missing Detective case has a complete investigation with distinct evidence', () => {
  assert.equal(CASE_003_GAME.id, 'case003');
  assert.equal(CASE_003_GAME.clues.length, 4);
  assert.equal(new Set(CASE_003_GAME.clues.map((clue) => clue.id)).size, 4);
  assert.equal(CASE_003_GAME.witnesses.length, 3);
  assert.ok(CASE_003_GAME.witnesses.every((witness) => witness.questions.length === 2));
  assert.equal(CASE_003_GAME.timelineEvents.length, 4);
  assert.ok(CASE_003_GAME.truth.length > 80);
  assert.ok(CASE_003_GAME.proof.length > 100);
  assert.deepEqual(EMPTY_CASE003_PROGRESS.cluesFound, []);
});

test('Missing Detective timeline and deduction require a complete evidence-backed solution', () => {
  assert.equal(isCase003TimelineCorrect(['signout', 'print', 'cabinet', 'delivery']), true);
  assert.equal(isCase003TimelineCorrect(['signout', 'cabinet', 'print', 'delivery']), false);
  assert.equal(isCase003TimelineCorrect(['signout', 'print']), false);
  assert.equal(isCase003DeductionCorrect('arden', 'control'), true);
  assert.equal(isCase003DeductionCorrect('arden', 'profit'), false);
  assert.equal(isCase003DeductionCorrect('lyle', 'control'), false);
});

test('Case 003 carries actual prior investigation choices into witness dialogue', () => {
  const one = archiveCompletedCase(EMPTY_INVESTIGATION_ARCHIVE, {
    caseId: 'case001', caseTitle: CASE_001.title, closedAt: '2026-11-01T12:00:00.000Z',
    selectedSuspectId: 'miles', selectedMotiveId: 'protect', inspectedClues: ['The ceiling stain'],
    askedQuestions: [], unansweredQuestions: ['Nia Vale: Was the parcel damaged?'],
  });
  const both = archiveCompletedCase(one, {
    caseId: 'case002', caseTitle: 'The Unlit Room', closedAt: '2026-11-01T12:30:00.000Z',
    selectedSuspectId: 'june', selectedMotiveId: 'protect', inspectedClues: ['The damp shelf'],
    askedQuestions: [], unansweredQuestions: [],
  });
  const carryover = getCase003Carryover(both);
  assert.equal(carryover.hasBothOpeningCases, true);
  assert.equal(carryover.openingCasesInspected, 2);
  assert.equal(carryover.unansweredFromPrior.length, 1);
  assert.match(getCase003QuestionReply('arden', 'terminal', both), /earlier files taught the Bureau/i);
  assert.match(getCase003QuestionReply('lyle', 'delivery', both), /order of events matters/i);
  assert.match(getCase003QuestionReply('arden', 'terminal', EMPTY_INVESTIGATION_ARCHIVE), /terminal log alone/i);
});


import {
  CASE_004_GAME,
  EMPTY_CASE004_PROGRESS,
  getCase004Carryover,
  getCase004QuestionReply,
  isCase004DeductionCorrect,
  isCase004TimelineCorrect,
} from '../../artifacts/casezero/game/case004Game';

test('Case 004 is a complete, distinct investigation with an evidence-backed solution', () => {
  assert.equal(CASE_004_GAME.id, 'case004');
  assert.equal(CASE_004_GAME.clues.length, 4);
  assert.equal(new Set(CASE_004_GAME.clues.map((clue) => clue.id)).size, 4);
  assert.equal(CASE_004_GAME.witnesses.length, 3);
  assert.ok(CASE_004_GAME.witnesses.every((witness) => witness.questions.length === 2));
  assert.equal(CASE_004_GAME.timelineEvents.length, 4);
  assert.ok(CASE_004_GAME.truth.length > 80);
  assert.ok(CASE_004_GAME.proof.length > 100);
  assert.deepEqual(EMPTY_CASE004_PROGRESS.cluesFound, []);
});

test('Case 004 timeline and deduction require the complete correct solution', () => {
  assert.equal(isCase004TimelineCorrect(['key', 'seal', 'override', 'pickup']), true);
  assert.equal(isCase004TimelineCorrect(['seal', 'key', 'override', 'pickup']), false);
  assert.equal(isCase004TimelineCorrect(['key', 'override']), false);
  assert.equal(isCase004DeductionCorrect('holt', 'silence'), true);
  assert.equal(isCase004DeductionCorrect('holt', 'profit'), false);
  assert.equal(isCase004DeductionCorrect('senn', 'silence'), false);
});

test('Case 004 carries the first three case conclusions and open questions forward', () => {
  const archive = ['case001', 'case002', 'case003'].reduce((current, id, index) =>
    archiveCompletedCase(current, {
      caseId: id,
      caseTitle: ['The Last Train Home', 'The Unlit Room', 'The Black Square'][index],
      closedAt: '2026-11-01T12:00:00.000Z',
      selectedSuspectId: ['miles', 'june', 'arden'][index],
      selectedMotiveId: ['protect', 'protect', 'control'][index],
      inspectedClues: ['Clue ' + id],
      askedQuestions: [],
      unansweredQuestions: index === 2 ? ['Owen Pike: Who signed the annex access form?'] : [],
    }), EMPTY_INVESTIGATION_ARCHIVE);
  const carryover = getCase004Carryover(archive);
  assert.equal(carryover.hasCase003, true);
  assert.equal(carryover.inspectedAcrossCampaign, 3);
  assert.equal(carryover.priorConclusions.length, 3);
  assert.equal(carryover.unansweredLeads.length, 1);
  assert.match(carryover.lastFinding, /Silas Arden/);
  assert.match(getCase004QuestionReply('marr', 'override', archive), /After the Black Square file/);
  assert.match(getCase004QuestionReply('holt', 'key', archive), /earlier files left questions open/i);
});


import {
  DAILY_BULLETIN_CASES,
  getDailyCaseForDate,
  isDailyCaseSolutionCorrect,
} from '../../artifacts/casezero/game/dailyCaseBulletin';

test('daily bulletin rotates deterministically and each short case has a complete evidence set', () => {
  const selected = getDailyCaseForDate('2026-11-01');
  assert.equal(getDailyCaseForDate('2026-11-01').id, selected.id);
  assert.equal(DAILY_BULLETIN_CASES.length, 7);
  assert.ok(DAILY_BULLETIN_CASES.every((dailyCase) => dailyCase.clues.length === 3));
  assert.ok(DAILY_BULLETIN_CASES.every((dailyCase) => dailyCase.suspects.length === 3));
  assert.ok(DAILY_BULLETIN_CASES.every((dailyCase) => dailyCase.motives.length === 3));
  assert.ok(DAILY_BULLETIN_CASES.every((dailyCase) => dailyCase.truth.length > 40 && dailyCase.proof.length > 50));
});

test('daily bulletin deduction requires the correct person and motive', () => {
  const dailyCase = getDailyCaseForDate('2026-11-01');
  assert.equal(isDailyCaseSolutionCorrect(dailyCase, dailyCase.correctSuspectId, dailyCase.correctMotiveId), true);
  assert.equal(isDailyCaseSolutionCorrect(dailyCase, null, dailyCase.correctMotiveId), false);
  assert.equal(isDailyCaseSolutionCorrect(dailyCase, dailyCase.correctSuspectId, 'not-the-motive'), false);
});


import {
  BUREAU_SPECIALISTS,
  EMPTY_BUREAU_TEAM_BOARD,
  assignBureauSpecialist,
  getUnlockedBureauSpecialists,
  normalizeBureauTeamBoard,
  removeBureauAssignment,
  getBureauSpecialistInsight,
  restoreBureauTeamBoard,
  parseStoredJson,
} from '../../artifacts/casezero/game/bureauTeam';

test('Bureau specialists unlock only after their campaign milestones', () => {
  assert.equal(getUnlockedBureauSpecialists(EMPTY_INVESTIGATION_ARCHIVE).length, 0);
  const first = archiveCompletedCase(EMPTY_INVESTIGATION_ARCHIVE, {
    caseId: 'case001', caseTitle: CASE_001.title, closedAt: '2026-11-01T12:00:00.000Z',
    selectedSuspectId: 'miles', selectedMotiveId: 'protect',
    inspectedClues: [], askedQuestions: [], unansweredQuestions: [],
  });
  assert.deepEqual(getUnlockedBureauSpecialists(first).map((member) => member.id), ['inez']);
  const second = archiveCompletedCase(first, {
    caseId: 'case002', caseTitle: 'The Unlit Room', closedAt: '2026-11-01T12:30:00.000Z',
    selectedSuspectId: 'june', selectedMotiveId: 'protect',
    inspectedClues: [], askedQuestions: [], unansweredQuestions: [],
  });
  assert.deepEqual(getUnlockedBureauSpecialists(second).map((member) => member.id), ['inez', 'tomas']);
  const third = archiveCompletedCase(second, {
    caseId: 'case003', caseTitle: 'The Black Square', closedAt: '2026-11-01T13:00:00.000Z',
    selectedSuspectId: 'arden', selectedMotiveId: 'control',
    inspectedClues: [], askedQuestions: [], unansweredQuestions: [],
  });
  assert.equal(getUnlockedBureauSpecialists(third).length, BUREAU_SPECIALISTS.length);
});

test('Bureau assignments keep one specialist per file and one file per specialist', () => {
  const first = assignBureauSpecialist(EMPTY_BUREAU_TEAM_BOARD, 'inez', 'case004', '2026-11-01T12:00:00.000Z');
  assert.equal(first.assignments.length, 1);
  const replacement = assignBureauSpecialist(first, 'tomas', 'case004', '2026-11-01T12:05:00.000Z');
  assert.equal(replacement.assignments.length, 1);
  assert.equal(replacement.assignments[0].specialistId, 'tomas');
  const moved = assignBureauSpecialist(replacement, 'tomas', 'next-case', '2026-11-01T12:10:00.000Z');
  assert.equal(moved.assignments.length, 1);
  assert.equal(moved.assignments[0].targetId, 'next-case');
  assert.equal(removeBureauAssignment(moved, 'next-case').assignments.length, 0);
});


test('saved Bureau assignments discard locked specialists, completed files and malformed entries', () => {
  const archive = archiveCompletedCase(EMPTY_INVESTIGATION_ARCHIVE, {
    caseId: 'case001', caseTitle: CASE_001.title, closedAt: '2026-11-01T12:00:00.000Z',
    selectedSuspectId: 'miles', selectedMotiveId: 'protect',
    inspectedClues: [], askedQuestions: [], unansweredQuestions: [],
  });
  const repaired = normalizeBureauTeamBoard({
    version: 1,
    assignments: [
      { specialistId: 'tomas', targetId: 'case004', assignedAt: '2026-11-01T12:01:00.000Z' },
      { specialistId: 'inez', targetId: 'case001', assignedAt: '2026-11-01T12:02:00.000Z' },
      { specialistId: 'inez', targetId: 'case004', assignedAt: '2026-11-01T12:03:00.000Z' },
      { specialistId: 'inez', targetId: 'daily', assignedAt: 'not-a-date' },
      { specialistId: 'unknown', targetId: 'daily', assignedAt: '2026-11-01T12:04:00.000Z' },
      null,
    ],
  }, archive);

  assert.deepEqual(repaired.assignments, [
    { specialistId: 'inez', targetId: 'case004', assignedAt: '2026-11-01T12:03:00.000Z' },
  ]);
});

test('shared save parser returns null for missing or corrupt local data', () => {
  assert.equal(parseStoredJson(null), null);
  assert.equal(parseStoredJson('{bad'), null);
  assert.deepEqual(parseStoredJson('{"ok":true}'), { ok: true });
});

test('Bureau roster restoration survives corrupt JSON without blocking startup', () => {
  assert.deepEqual(restoreBureauTeamBoard(null, EMPTY_INVESTIGATION_ARCHIVE), EMPTY_BUREAU_TEAM_BOARD);
  assert.deepEqual(restoreBureauTeamBoard('{broken-json', EMPTY_INVESTIGATION_ARCHIVE), EMPTY_BUREAU_TEAM_BOARD);
  assert.deepEqual(restoreBureauTeamBoard('{"version":1,"assignments":[]}', EMPTY_INVESTIGATION_ARCHIVE), EMPTY_BUREAU_TEAM_BOARD);
});

test('Bureau board normalization safely handles malformed saved data', () => {
  assert.deepEqual(normalizeBureauTeamBoard(null, EMPTY_INVESTIGATION_ARCHIVE), EMPTY_BUREAU_TEAM_BOARD);
  assert.deepEqual(normalizeBureauTeamBoard({ version: 9, assignments: 'broken' }, EMPTY_INVESTIGATION_ARCHIVE), EMPTY_BUREAU_TEAM_BOARD);
});


test('specialist insights require the player to inspect their supporting records', () => {
  assert.equal(getBureauSpecialistInsight('inez', 'case002', ['access', 'shelf']), null);
  assert.equal(getBureauSpecialistInsight('inez', 'case002', ['access', 'shelf', 'transfer']), null);
  assert.ok(getBureauSpecialistInsight('inez', 'case002', ['access', 'shelf', 'generator', 'transfer']));

  assert.equal(getBureauSpecialistInsight('tomas', 'case003', ['printer', 'ledger'], []), null);
  assert.ok(getBureauSpecialistInsight('tomas', 'case003', ['printer', 'ledger'], ['arden:terminal']));

  assert.equal(getBureauSpecialistInsight('rhea', 'case004', ['seal', 'relay']), null);
  assert.ok(getBureauSpecialistInsight('rhea', 'case004', ['seal', 'relay', 'docket']));

  assert.equal(getBureauSpecialistInsight('inez', 'case004', ['seal', 'relay', 'docket']), null);
});
