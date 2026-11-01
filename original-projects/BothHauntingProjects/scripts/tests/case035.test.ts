import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CASE_035_GAME, getCase035Carryover, isCase035DeductionCorrect, isCase035TimelineCorrect } from '../../artifacts/casezero/game/case035Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 035 contains unique source and custody clues plus three complete witnesses', () => {
  assert.equal(CASE_035_GAME.clues.length, 4);
  assert.equal(new Set(CASE_035_GAME.clues.map((item) => item.id)).size, 4);
  assert.equal(CASE_035_GAME.witnesses.length, 3);
  assert.ok(CASE_035_GAME.witnesses.every((witness) => witness.questions.length === 2));
});

test('Case 035 orders packet intake, shelf routing, indexing and later attachment', () => {
  assert.equal(isCase035TimelineCorrect(['intake', 'routing', 'index', 'scan']), true);
  assert.equal(isCase035TimelineCorrect(['intake', 'index', 'routing', 'scan']), false);
});

test('Case 035 verifies the source without inventing the handler identity', () => {
  assert.equal(isCase035DeductionCorrect('unknown', 'source'), true);
  assert.equal(isCase035DeductionCorrect('sana', 'source'), false);
  assert.equal(isCase035DeductionCorrect('unknown', 'mara'), false);
});

test('Case 035 carries forward the archived dispatch trail', () => {
  let archive = EMPTY_INVESTIGATION_ARCHIVE;
  for (const [caseId, caseTitle] of [
    ['case031', 'The Session Without a Name'],
    ['case032', 'The Signed Handover'],
    ['case033', 'The Receipt at 07:24'],
    ['case034', 'The Revision in the Margin'],
  ]) archive = archiveCompletedCase(archive, {
    caseId, caseTitle, closedAt: '2026-11-02T00:00:00.000Z',
    selectedSuspectId: 'unknown', selectedMotiveId: 'record',
    inspectedClues: ['one', 'two'], askedQuestions: ['audit:one'], unansweredQuestions: [],
  });
  const memory = getCase035Carryover(archive);
  assert.equal(memory.priorFiles.length, 4);
  assert.equal(memory.clueCount, 8);
  assert.equal(memory.dispatchTrailFiles, 4);
});
