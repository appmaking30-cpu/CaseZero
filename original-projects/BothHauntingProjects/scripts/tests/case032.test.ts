import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CASE_032_GAME, getCase032Carryover, isCase032DeductionCorrect, isCase032TimelineCorrect } from '../../artifacts/casezero/game/case032Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 032 has four unique duty records and three two-question witnesses', () => {
  assert.equal(CASE_032_GAME.clues.length, 4);
  assert.equal(new Set(CASE_032_GAME.clues.map((item) => item.id)).size, 4);
  assert.equal(CASE_032_GAME.witnesses.length, 3);
  assert.ok(CASE_032_GAME.witnesses.every((witness) => witness.questions.length === 2));
});

test('Case 032 timeline orders roster, signed handover, session and variance', () => {
  assert.equal(isCase032TimelineCorrect(['roster', 'handover', 'session', 'variance']), true);
  assert.equal(isCase032TimelineCorrect(['handover', 'roster', 'variance', 'session']), false);
});

test('Case 032 confirms team responsibility without identifying the operator', () => {
  assert.equal(isCase032DeductionCorrect('unknown', 'responsibility'), true);
  assert.equal(isCase032DeductionCorrect('mara', 'mara'), false);
  assert.equal(isCase032DeductionCorrect('eli', 'eli'), false);
});

test('Case 032 carries forward the dispatch and room investigation trail', () => {
  let archive = EMPTY_INVESTIGATION_ARCHIVE;
  for (const [caseId, caseTitle] of [
    ['case028', 'The Visitor Register'],
    ['case029', 'The Escort Sheet'],
    ['case030', 'The Room That Didn’t Register'],
    ['case031', 'The Session Without a Name'],
  ]) {
    archive = archiveCompletedCase(archive, {
      caseId, caseTitle, closedAt: '2026-11-01T00:00:00.000Z',
      selectedSuspectId: 'unknown', selectedMotiveId: 'record',
      inspectedClues: ['one', 'two'], askedQuestions: ['audit:one'], unansweredQuestions: [],
    });
  }
  const memory = getCase032Carryover(archive);
  assert.equal(memory.priorFiles.length, 4);
  assert.equal(memory.clueCount, 8);
  assert.equal(memory.dispatchTrailFiles, 4);
});
