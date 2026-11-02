import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CASE_039_GAME, getCase039Carryover, isCase039DeductionCorrect, isCase039TimelineCorrect } from '../../artifacts/casezero/game/case039Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 039 contains four unique terminal records and three complete witnesses', () => {
  assert.equal(CASE_039_GAME.clues.length, 4);
  assert.equal(new Set(CASE_039_GAME.clues.map((item) => item.id)).size, 4);
  assert.equal(CASE_039_GAME.witnesses.length, 3);
  assert.ok(CASE_039_GAME.witnesses.every((witness) => witness.questions.length === 2));
});

test('Case 039 orders shared sign-in, ticket creation, print and badge audit', () => {
  assert.equal(isCase039TimelineCorrect(['session', 'terminal', 'print', 'proximity']), true);
  assert.equal(isCase039TimelineCorrect(['terminal', 'session', 'print', 'proximity']), false);
});

test('Case 039 distinguishes workstation attribution from personal identity', () => {
  assert.equal(isCase039DeductionCorrect('unknown', 'station'), true);
  assert.equal(isCase039DeductionCorrect('mara', 'station'), false);
  assert.equal(isCase039DeductionCorrect('unknown', 'niko'), false);
});

test('Case 039 carries forward the queue and movement investigations', () => {
  let archive = EMPTY_INVESTIGATION_ARCHIVE;
  for (const [caseId, caseTitle] of [
    ['case037', 'The Missing Movement Ledger'],
    ['case038', 'The Queue Before Arrival'],
  ]) archive = archiveCompletedCase(archive, {
    caseId, caseTitle, closedAt: '2026-11-02T00:00:00.000Z',
    selectedSuspectId: 'unknown', selectedMotiveId: 'record',
    inspectedClues: ['one', 'two'], askedQuestions: ['audit:one'], unansweredQuestions: [],
  });
  const memory = getCase039Carryover(archive);
  assert.equal(memory.priorFiles.length, 2);
  assert.equal(memory.clueCount, 4);
  assert.equal(memory.dispatchTrailFiles, 2);
});
