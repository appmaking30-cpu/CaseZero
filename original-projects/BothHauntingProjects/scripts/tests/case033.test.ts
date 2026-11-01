import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CASE_033_GAME, getCase033Carryover, isCase033DeductionCorrect, isCase033TimelineCorrect } from '../../artifacts/casezero/game/case033Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 033 has four unique records and three two-question witnesses', () => {
  assert.equal(CASE_033_GAME.clues.length, 4);
  assert.equal(new Set(CASE_033_GAME.clues.map((item) => item.id)).size, 4);
  assert.equal(CASE_033_GAME.witnesses.length, 3);
  assert.ok(CASE_033_GAME.witnesses.every((witness) => witness.questions.length === 2));
});

test('Case 033 orders the shared session, export queue, receipt and validation', () => {
  assert.equal(isCase033TimelineCorrect(['session', 'queue', 'receipt', 'validation']), true);
  assert.equal(isCase033TimelineCorrect(['receipt', 'session', 'queue', 'validation']), false);
});

test('Case 033 attributes only the receipt acknowledgement to Niko', () => {
  assert.equal(isCase033DeductionCorrect('niko', 'acknowledgement'), true);
  assert.equal(isCase033DeductionCorrect('niko', 'session'), false);
  assert.equal(isCase033DeductionCorrect('mara', 'acknowledgement'), false);
});

test('Case 033 carries forward the dispatch investigation archive', () => {
  let archive = EMPTY_INVESTIGATION_ARCHIVE;
  for (const [caseId, caseTitle] of [
    ['case030', 'The Room That Didn’t Register'],
    ['case031', 'The Session Without a Name'],
    ['case032', 'The Signed Handover'],
  ]) archive = archiveCompletedCase(archive, {
    caseId, caseTitle, closedAt: '2026-11-02T00:00:00.000Z',
    selectedSuspectId: 'unknown', selectedMotiveId: 'record',
    inspectedClues: ['one', 'two'], askedQuestions: ['audit:one'], unansweredQuestions: [],
  });
  const memory = getCase033Carryover(archive);
  assert.equal(memory.priorFiles.length, 3);
  assert.equal(memory.clueCount, 6);
  assert.equal(memory.dispatchTrailFiles, 3);
});
