import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CASE_063_GAME, getCase063Carryover, isCase063DeductionCorrect, isCase063TimelineCorrect } from '../../artifacts/casezero/game/case063Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 063 contains five distinct cross-index records and three witnesses', () => {
  assert.equal(CASE_063_GAME.clues.length, 5);
  assert.equal(new Set(CASE_063_GAME.clues.map((item) => item.id)).size, 5);
  assert.equal(CASE_063_GAME.witnesses.length, 3);
  assert.ok(CASE_063_GAME.witnesses.every((witness) => witness.questions.length === 2));
});

test('Case 063 timeline distinguishes baseline, machine event, independent digest and reconciliation', () => {
  assert.equal(CASE_063_GAME.timelineEvents.length, 6);
  assert.equal(isCase063TimelineCorrect(CASE_063_GAME.correctOrder), true);
  assert.equal(isCase063TimelineCorrect([...CASE_063_GAME.correctOrder].reverse()), false);
});

test('Case 063 requires the corroborated event and does not infer a person or physical replacement', () => {
  assert.equal(isCase063DeductionCorrect('event', 'window'), true);
  assert.equal(isCase063DeductionCorrect('dev', 'window'), false);
  assert.equal(isCase063DeductionCorrect('event', 'replacement'), false);
});

test('Case 063 carries forward the hardware and cylinder investigation archive', () => {
  const archive = archiveCompletedCase(EMPTY_INVESTIGATION_ARCHIVE, {
    caseId: 'case062', caseTitle: 'The Cylinder Service Report', closedAt: '2026-11-04T10:00:00.000Z',
    selectedSuspectId: 'continuity', selectedMotiveId: 'scope',
    inspectedClues: ['C-2 cylinder installation register'], askedQuestions: [], unansweredQuestions: [],
  });
  const memory = getCase063Carryover(archive);
  assert.equal(memory.priorFiles.length, 1);
  assert.equal(memory.clueCount, 1);
  assert.equal(memory.hardwareTrailFiles, 1);
});
