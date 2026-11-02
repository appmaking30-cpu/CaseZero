import assert from 'node:assert/strict';
import test from 'node:test';
import {
  CASE_005_GAME,
  getCase005Carryover,
  isCase005DeductionCorrect,
  isCase005TimelineCorrect,
} from '../../artifacts/casezero/game/case005Game';
import {
  archiveCompletedCase,
  EMPTY_INVESTIGATION_ARCHIVE,
} from '../../artifacts/casezero/game/investigationArchive';

test('Case 005 has a complete, distinct evidence and interview set', () => {
  assert.equal(CASE_005_GAME.clues.length, 4);
  assert.equal(new Set(CASE_005_GAME.clues.map((clue) => clue.id)).size, 4);
  assert.equal(CASE_005_GAME.suspects.length, 3);
  assert.equal(CASE_005_GAME.witnesses.length, 3);
  assert.ok(CASE_005_GAME.witnesses.every((witness) => witness.questions.length === 2));
  assert.equal(CASE_005_GAME.timelineEvents.length, 4);
  assert.ok(CASE_005_GAME.truth.length > 60);
  assert.ok(CASE_005_GAME.proof.length > 100);
  assert.ok(CASE_005_GAME.outcome.length > 60);
});

test('Case 005 timeline requires the complete evidence-backed chronology', () => {
  assert.equal(isCase005TimelineCorrect(['receipt', 'courier', 'locker', 'audit']), true);
  assert.equal(isCase005TimelineCorrect(['audit', 'locker', 'receipt', 'courier']), false);
  assert.equal(isCase005TimelineCorrect(['receipt', 'courier']), false);
  assert.equal(isCase005TimelineCorrect(['receipt', 'receipt', 'locker', 'audit']), false);
});

test('Case 005 deduction requires both the registrar and supported concealment motive', () => {
  assert.equal(isCase005DeductionCorrect('quill', 'conceal'), true);
  assert.equal(isCase005DeductionCorrect('dane', 'conceal'), false);
  assert.equal(isCase005DeductionCorrect('quill', 'profit'), false);
  assert.equal(isCase005DeductionCorrect(null, 'conceal'), false);
});

test('Case 005 records distinguish registrar access from courier exit and supervisor audit', () => {
  const carbon = CASE_005_GAME.clues.find((clue) => clue.id === 'carbon');
  const ledger = CASE_005_GAME.clues.find((clue) => clue.id === 'ledger');
  const gate = CASE_005_GAME.clues.find((clue) => clue.id === 'gate');
  const audit = CASE_005_GAME.clues.find((clue) => clue.id === 'audit');

  assert.ok(carbon?.detail.includes('S.Q.'));
  assert.ok(carbon?.detail.includes('Locker 14'));
  assert.ok(ledger?.detail.includes('SQ-7'));
  assert.ok(gate?.detail.includes('20:25'));
  assert.ok(audit?.detail.includes('21:04'));
  assert.match(CASE_005_GAME.proof, /The supervisor’s audit came later/);
  assert.match(CASE_005_GAME.proof, /not the courier or supervisor/);
});

test('Case 005 receives archived Case 003 and Case 004 evidence memory', () => {
  const withCase003 = archiveCompletedCase(EMPTY_INVESTIGATION_ARCHIVE, {
    caseId: 'case003',
    caseTitle: 'The Black Square',
    closedAt: '2026-11-01T10:00:00.000Z',
    selectedSuspectId: 'arden',
    selectedMotiveId: 'route',
    inspectedClues: ['Annex printer log', 'Seal batch register'],
    askedQuestions: [],
    unansweredQuestions: [],
  });
  const withCase004 = archiveCompletedCase(withCase003, {
    caseId: 'case004',
    caseTitle: 'The Last Signal',
    closedAt: '2026-11-01T11:00:00.000Z',
    selectedSuspectId: 'holt',
    selectedMotiveId: 'suppress',
    inspectedClues: ['Recorder locker seal'],
    askedQuestions: [],
    unansweredQuestions: [],
  });

  const carryover = getCase005Carryover(withCase004);
  assert.equal(carryover.hasCase004, true);
  assert.deepEqual(
    carryover.priorFiles.map((record) => record.caseId),
    ['case003', 'case004'],
  );
  assert.equal(carryover.clueCount, 3);
});
