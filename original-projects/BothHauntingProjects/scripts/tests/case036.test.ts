import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CASE_036_GAME, getCase036Carryover, isCase036DeductionCorrect, isCase036TimelineCorrect } from '../../artifacts/casezero/game/case036Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 036 contains four unique review records and three complete witnesses', () => {
  assert.equal(CASE_036_GAME.clues.length, 4);
  assert.equal(new Set(CASE_036_GAME.clues.map((item) => item.id)).size, 4);
  assert.equal(CASE_036_GAME.witnesses.length, 3);
  assert.ok(CASE_036_GAME.witnesses.every((witness) => witness.questions.length === 2));
});

test('Case 036 orders assignment, room access, reviewer note and sign-off', () => {
  assert.equal(isCase036TimelineCorrect(['register', 'access', 'note', 'comparison']), true);
  assert.equal(isCase036TimelineCorrect(['access', 'register', 'note', 'comparison']), false);
});

test('Case 036 distinguishes authorized review from unproven physical transfer', () => {
  assert.equal(isCase036DeductionCorrect('unknown', 'review'), true);
  assert.equal(isCase036DeductionCorrect('rowan', 'review'), false);
  assert.equal(isCase036DeductionCorrect('unknown', 'transfer'), false);
});

test('Case 036 carries forward the Annex K-17 investigation', () => {
  let archive = EMPTY_INVESTIGATION_ARCHIVE;
  for (const [caseId, caseTitle] of [
    ['case034', 'The Revision in the Margin'],
    ['case035', 'The Page from Annex K-17'],
  ]) archive = archiveCompletedCase(archive, {
    caseId, caseTitle, closedAt: '2026-11-02T00:00:00.000Z',
    selectedSuspectId: 'unknown', selectedMotiveId: 'record',
    inspectedClues: ['one', 'two'], askedQuestions: ['audit:one'], unansweredQuestions: [],
  });
  const memory = getCase036Carryover(archive);
  assert.equal(memory.priorFiles.length, 2);
  assert.equal(memory.clueCount, 4);
  assert.equal(memory.dispatchTrailFiles, 2);
});
