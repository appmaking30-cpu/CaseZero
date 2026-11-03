import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CASE_061_GAME, getCase061Carryover, isCase061DeductionCorrect, isCase061TimelineCorrect } from '../../artifacts/casezero/game/case061Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 061 has five distinct evidence records and three witnesses with two questions each', () => {
  assert.equal(CASE_061_GAME.clues.length, 5);
  assert.equal(new Set(CASE_061_GAME.clues.map((item) => item.id)).size, 5);
  assert.equal(CASE_061_GAME.witnesses.length, 3);
  assert.ok(CASE_061_GAME.witnesses.every((witness) => witness.questions.length === 2));
});

test('Case 061 timeline distinguishes duplicate creation, reserve status, incident and later audit', () => {
  assert.equal(CASE_061_GAME.timelineEvents.length, 6);
  assert.equal(isCase061TimelineCorrect(CASE_061_GAME.correctOrder), true);
  assert.equal(isCase061TimelineCorrect([...CASE_061_GAME.correctOrder].reverse()), false);
});

test('Case 061 does not confuse duplicate existence with incident-time use', () => {
  assert.equal(isCase061DeductionCorrect('reserve', 'limit'), true);
  assert.equal(isCase061DeductionCorrect('sana', 'limit'), false);
  assert.equal(isCase061DeductionCorrect('reserve', 'dev'), false);
});

test('Case 061 carries forward the key-control investigation archive', () => {
  const archive = archiveCompletedCase(EMPTY_INVESTIGATION_ARCHIVE, {
    caseId: 'case060', caseTitle: 'The Missing Key Record', closedAt: '2026-11-03T10:00:00.000Z',
    selectedSuspectId: 'shared', selectedMotiveId: 'boundary',
    inspectedClues: ['Physical key issue ledger'], askedQuestions: [], unansweredQuestions: [],
  });
  const memory = getCase061Carryover(archive);
  assert.equal(memory.priorFiles.length, 1);
  assert.equal(memory.clueCount, 1);
  assert.equal(memory.keyTrailFiles, 1);
});
