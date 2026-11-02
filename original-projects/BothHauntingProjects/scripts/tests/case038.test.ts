import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CASE_038_GAME, getCase038Carryover, isCase038DeductionCorrect, isCase038TimelineCorrect } from '../../artifacts/casezero/game/case038Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 038 contains four unique queue records and three complete witnesses', () => {
  assert.equal(CASE_038_GAME.clues.length, 4);
  assert.equal(new Set(CASE_038_GAME.clues.map((item) => item.id)).size, 4);
  assert.equal(CASE_038_GAME.witnesses.length, 3);
  assert.ok(CASE_038_GAME.witnesses.every((witness) => witness.questions.length === 2));
});

test('Case 038 orders queue ticket, permission audit, bay preparation and arrival match', () => {
  assert.equal(isCase038TimelineCorrect(['ticket', 'permissions', 'bay', 'arrival']), true);
  assert.equal(isCase038TimelineCorrect(['permissions', 'ticket', 'bay', 'arrival']), false);
});

test('Case 038 distinguishes shared-account permission from requester identity', () => {
  assert.equal(isCase038DeductionCorrect('unknown', 'reservation'), true);
  assert.equal(isCase038DeductionCorrect('mara', 'reservation'), false);
  assert.equal(isCase038DeductionCorrect('unknown', 'niko'), false);
});

test('Case 038 carries forward the movement ledger and restricted review', () => {
  let archive = EMPTY_INVESTIGATION_ARCHIVE;
  for (const [caseId, caseTitle] of [
    ['case037', 'The Missing Movement Ledger'],
    ['case036', 'The Restricted Review'],
  ]) archive = archiveCompletedCase(archive, {
    caseId, caseTitle, closedAt: '2026-11-02T00:00:00.000Z',
    selectedSuspectId: 'unknown', selectedMotiveId: 'record',
    inspectedClues: ['one', 'two'], askedQuestions: ['audit:one'], unansweredQuestions: [],
  });
  const memory = getCase038Carryover(archive);
  assert.equal(memory.priorFiles.length, 2);
  assert.equal(memory.clueCount, 4);
  assert.equal(memory.dispatchTrailFiles, 2);
});
