import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CASE_040_GAME, getCase040Carryover, isCase040DeductionCorrect, isCase040TimelineCorrect } from '../../artifacts/casezero/game/case040Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 040 contains four unique handover records and three complete witnesses', () => {
  assert.equal(CASE_040_GAME.clues.length, 4);
  assert.equal(new Set(CASE_040_GAME.clues.map((item) => item.id)).size, 4);
  assert.equal(CASE_040_GAME.witnesses.length, 3);
  assert.ok(CASE_040_GAME.witnesses.every((witness) => witness.questions.length === 2));
});

test('Case 040 reconstructs roster, handover, checklist, session and ticket chronology', () => {
  assert.equal(isCase040TimelineCorrect(['roster', 'handover', 'checklist', 'session', 'ticket']), true);
  assert.equal(isCase040TimelineCorrect(['handover', 'roster', 'checklist', 'session', 'ticket']), false);
  assert.equal(isCase040TimelineCorrect(['roster', 'handover', 'ticket', 'session', 'checklist']), false);
});

test('Case 040 distinguishes shift-level responsibility from personal identity', () => {
  assert.equal(isCase040DeductionCorrect('unknown', 'shift'), true);
  assert.equal(isCase040DeductionCorrect('mara', 'shift'), false);
  assert.equal(isCase040DeductionCorrect('niko', 'shift'), false);
  assert.equal(isCase040DeductionCorrect('unknown', 'niko'), false);
});

test('Case 040 carries forward the dispatch investigation chain', () => {
  let archive = EMPTY_INVESTIGATION_ARCHIVE;
  for (const [caseId, caseTitle] of [
    ['case038', 'The Queue Before Arrival'],
    ['case039', 'The Station Without an Operator'],
  ]) archive = archiveCompletedCase(archive, {
    caseId, caseTitle, closedAt: '2026-11-02T00:00:00.000Z',
    selectedSuspectId: 'unknown', selectedMotiveId: 'record',
    inspectedClues: ['one', 'two'], askedQuestions: ['audit:one'], unansweredQuestions: [],
  });
  const memory = getCase040Carryover(archive);
  assert.equal(memory.priorFiles.length, 2);
  assert.equal(memory.clueCount, 4);
  assert.equal(memory.dispatchTrailFiles, 2);
});
