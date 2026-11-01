import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CASE_031_GAME, getCase031Carryover, isCase031DeductionCorrect, isCase031TimelineCorrect } from '../../artifacts/casezero/game/case031Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 031 has four unique records and three two-question witnesses', () => {
  assert.equal(CASE_031_GAME.clues.length, 4);
  assert.equal(new Set(CASE_031_GAME.clues.map((item) => item.id)).size, 4);
  assert.equal(CASE_031_GAME.witnesses.length, 3);
  assert.ok(CASE_031_GAME.witnesses.every((witness) => witness.questions.length === 2));
});

test('Case 031 timeline orders occupancy, session, export and pending request', () => {
  assert.equal(isCase031TimelineCorrect(['occupancy', 'session', 'export', 'request']), true);
  assert.equal(isCase031TimelineCorrect(['session', 'occupancy', 'request', 'export']), false);
});

test('Case 031 confirms a shared session without identifying the operator', () => {
  assert.equal(isCase031DeductionCorrect('unknown', 'session'), true);
  assert.equal(isCase031DeductionCorrect('mara', 'mara'), false);
  assert.equal(isCase031DeductionCorrect('ivo', 'ivo'), false);
});

test('Case 031 carries forward the visitor, escort and room investigation trail', () => {
  let archive = EMPTY_INVESTIGATION_ARCHIVE;
  for (const [caseId, caseTitle] of [
    ['case028', 'The Visitor Register'],
    ['case029', 'The Escort Sheet'],
    ['case030', 'The Room That Didn’t Register'],
  ]) {
    archive = archiveCompletedCase(archive, {
      caseId, caseTitle, closedAt: '2026-11-01T00:00:00.000Z',
      selectedSuspectId: 'unknown', selectedMotiveId: 'record',
      inspectedClues: ['one', 'two'], askedQuestions: ['audit:one'], unansweredQuestions: [],
    });
  }
  const memory = getCase031Carryover(archive);
  assert.equal(memory.priorFiles.length, 3);
  assert.equal(memory.clueCount, 6);
  assert.equal(memory.roomTrailFiles, 3);
});
