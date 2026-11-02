import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  CASE_041_GAME,
  getCase041Carryover,
  isCase041DeductionCorrect,
  isCase041TimelineCorrect,
} from '../../artifacts/casezero/game/case041Game';
import {
  archiveCompletedCase,
  EMPTY_INVESTIGATION_ARCHIVE,
} from '../../artifacts/casezero/game/investigationArchive';

test('Case 041 contains four unique records and three complete witnesses', () => {
  assert.equal(CASE_041_GAME.clues.length, 4);
  assert.equal(new Set(CASE_041_GAME.clues.map((item) => item.id)).size, 4);
  assert.equal(CASE_041_GAME.witnesses.length, 3);
  assert.ok(CASE_041_GAME.witnesses.every((witness) => witness.questions.length === 2));
});

test('Case 041 reconstructs dispatch copy, Annex routing, control intake and archive indexing', () => {
  assert.equal(isCase041TimelineCorrect(['dispatchCopy', 'annexManifest', 'controlIntake', 'archiveIndex']), true);
  assert.equal(isCase041TimelineCorrect(['annexManifest', 'dispatchCopy', 'controlIntake', 'archiveIndex']), false);
  assert.equal(isCase041TimelineCorrect(['dispatchCopy', 'controlIntake', 'annexManifest', 'archiveIndex']), false);
});

test('Case 041 distinguishes an archived duplicate from an unproven signature alteration', () => {
  assert.equal(isCase041DeductionCorrect('unknown', 'archive'), true);
  assert.equal(isCase041DeductionCorrect('mara', 'archive'), false);
  assert.equal(isCase041DeductionCorrect('elias', 'archive'), false);
  assert.equal(isCase041DeductionCorrect('unknown', 'erased'), false);
  assert.equal(isCase041DeductionCorrect('unknown', 'never'), false);
});

test('Case 041 carries the preceding dispatch investigations into the new file', () => {
  let archive = EMPTY_INVESTIGATION_ARCHIVE;
  for (const [caseId, caseTitle] of [
    ['case039', 'The Station Without an Operator'],
    ['case040', 'The Shift-Change Gap'],
  ]) archive = archiveCompletedCase(archive, {
    caseId, caseTitle, closedAt: '2026-11-02T00:00:00.000Z',
    selectedSuspectId: 'unknown', selectedMotiveId: 'record',
    inspectedClues: ['one', 'two'], askedQuestions: ['audit:one'], unansweredQuestions: [],
  });
  const memory = getCase041Carryover(archive);
  assert.equal(memory.priorFiles.length, 2);
  assert.equal(memory.clueCount, 4);
  assert.equal(memory.dispatchTrailFiles, 2);
});
