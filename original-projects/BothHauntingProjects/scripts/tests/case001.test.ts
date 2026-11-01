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
