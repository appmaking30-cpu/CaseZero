import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CASE_034_GAME, getCase034Carryover, isCase034DeductionCorrect, isCase034TimelineCorrect } from '../../artifacts/casezero/game/case034Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 034 contains four unique revision records and three two-question witnesses', () => {
  assert.equal(CASE_034_GAME.clues.length, 4);
  assert.equal(new Set(CASE_034_GAME.clues.map((item) => item.id)).size, 4);
  assert.equal(CASE_034_GAME.witnesses.length, 3);
  assert.ok(CASE_034_GAME.witnesses.every((witness) => witness.questions.length === 2));
});

test('Case 034 orders original manifest, revision, shared-profile commit and receipt', () => {
  assert.equal(isCase034TimelineCorrect(['manifest', 'revision', 'ledger', 'receipt']), true);
  assert.equal(isCase034TimelineCorrect(['manifest', 'ledger', 'revision', 'receipt']), false);
});

test('Case 034 attributes the revision only to an unidentified shared-profile operator', () => {
  assert.equal(isCase034DeductionCorrect('unknown', 'revision'), true);
  assert.equal(isCase034DeductionCorrect('niko', 'revision'), false);
  assert.equal(isCase034DeductionCorrect('unknown', 'niko'), false);
});

test('Case 034 preserves the dispatch investigation trail', () => {
  let archive = EMPTY_INVESTIGATION_ARCHIVE;
  for (const [caseId, caseTitle] of [
    ['case031', 'The Session Without a Name'],
    ['case032', 'The Signed Handover'],
    ['case033', 'The Receipt at 07:24'],
  ]) archive = archiveCompletedCase(archive, {
    caseId, caseTitle, closedAt: '2026-11-02T00:00:00.000Z',
    selectedSuspectId: 'unknown', selectedMotiveId: 'record',
    inspectedClues: ['one', 'two'], askedQuestions: ['audit:one'], unansweredQuestions: [],
  });
  const memory = getCase034Carryover(archive);
  assert.equal(memory.priorFiles.length, 3);
  assert.equal(memory.clueCount, 6);
  assert.equal(memory.dispatchTrailFiles, 3);
});
