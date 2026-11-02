import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CASE_037_GAME, getCase037Carryover, isCase037DeductionCorrect, isCase037TimelineCorrect } from '../../artifacts/casezero/game/case037Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 037 contains four unique transfer records and three complete witnesses', () => {
  assert.equal(CASE_037_GAME.clues.length, 4);
  assert.equal(new Set(CASE_037_GAME.clues.map((item) => item.id)).size, 4);
  assert.equal(CASE_037_GAME.witnesses.length, 3);
  assert.ok(CASE_037_GAME.witnesses.every((witness) => witness.questions.length === 2));
});

test('Case 037 orders dispatch, seal check, lift journey and imaging receipt', () => {
  assert.equal(isCase037TimelineCorrect(['dispatch', 'seal', 'lift', 'intake']), true);
  assert.equal(isCase037TimelineCorrect(['seal', 'dispatch', 'lift', 'intake']), false);
});

test('Case 037 distinguishes a documented cart route from an unidentified carrier', () => {
  assert.equal(isCase037DeductionCorrect('unknown', 'route'), true);
  assert.equal(isCase037DeductionCorrect('rowan', 'route'), false);
  assert.equal(isCase037DeductionCorrect('unknown', 'sana'), false);
});

test('Case 037 carries forward the restricted review and Annex investigations', () => {
  let archive = EMPTY_INVESTIGATION_ARCHIVE;
  for (const [caseId, caseTitle] of [
    ['case035', 'The Page from Annex K-17'],
    ['case036', 'The Restricted Review'],
  ]) archive = archiveCompletedCase(archive, {
    caseId, caseTitle, closedAt: '2026-11-02T00:00:00.000Z',
    selectedSuspectId: 'unknown', selectedMotiveId: 'record',
    inspectedClues: ['one', 'two'], askedQuestions: ['audit:one'], unansweredQuestions: [],
  });
  const memory = getCase037Carryover(archive);
  assert.equal(memory.priorFiles.length, 2);
  assert.equal(memory.clueCount, 4);
  assert.equal(memory.dispatchTrailFiles, 2);
});
