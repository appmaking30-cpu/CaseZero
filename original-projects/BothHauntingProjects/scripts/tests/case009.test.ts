import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  CASE_009_GAME,
  getCase009Carryover,
  isCase009DeductionCorrect,
  isCase009TimelineCorrect,
} from '../../artifacts/casezero/game/case009Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 009 has four unique records and three two-question witnesses', () => {
  assert.equal(CASE_009_GAME.clues.length, 4);
  assert.equal(new Set(CASE_009_GAME.clues.map((clue) => clue.id)).size, 4);
  assert.equal(CASE_009_GAME.witnesses.length, 3);
  assert.ok(CASE_009_GAME.witnesses.every((witness) => witness.questions.length === 2));
});

test('Case 009 timeline accepts only the documented event sequence', () => {
  assert.equal(isCase009TimelineCorrect(['inventory', 'drawer', 'renewal', 'transfer']), true);
  assert.equal(isCase009TimelineCorrect(['transfer', 'renewal', 'drawer', 'inventory']), false);
  assert.equal(isCase009TimelineCorrect(['inventory', 'drawer']), false);
  assert.equal(isCase009TimelineCorrect(['inventory', 'inventory', 'renewal', 'transfer']), false);
});

test('Case 009 deduction identifies schedule access without claiming authorization', () => {
  assert.equal(isCase009DeductionCorrect('oren', 'access'), true);
  assert.equal(isCase009DeductionCorrect('nell', 'access'), false);
  assert.equal(isCase009DeductionCorrect('talia', 'approve'), false);
  assert.equal(isCase009DeductionCorrect(null, 'access'), false);
  assert.equal(isCase009DeductionCorrect('oren', null), false);
});

test('Case 009 carries earlier relay evidence forward', () => {
  const archive = archiveCompletedCase(EMPTY_INVESTIGATION_ARCHIVE, {
    caseId: 'case008',
    caseTitle: 'The Second Address',
    closedAt: '2026-11-01T00:00:00.000Z',
    selectedSuspectId: 'mara',
    selectedMotiveId: 'receipt',
    inspectedClues: ['Duplicate index', 'Gate log', 'Intake receipt', 'Maintenance register'],
    askedQuestions: ['Mara: receipt'],
    unansweredQuestions: [],
  });
  const carryover = getCase009Carryover(archive);
  assert.equal(carryover.priorFiles.length, 1);
  assert.equal(carryover.priorFiles[0]?.caseId, 'case008');
  assert.equal(carryover.clueCount, 4);
  assert.equal(carryover.relayFiles, 1);
});
