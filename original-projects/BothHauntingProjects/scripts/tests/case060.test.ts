import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CASE_060_GAME, getCase060Carryover, isCase060DeductionCorrect, isCase060TimelineCorrect } from '../../artifacts/casezero/game/case060Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 060 has five distinct records and three witnesses with two questions each', () => {
  assert.equal(CASE_060_GAME.clues.length, 5);
  assert.equal(new Set(CASE_060_GAME.clues.map((item) => item.id)).size, 5);
  assert.equal(CASE_060_GAME.witnesses.length, 3);
  assert.ok(CASE_060_GAME.witnesses.every((witness) => witness.questions.length === 2));
});

test('Case 060 timeline distinguishes team roster, key issue, zone entry, return and independent audit', () => {
  assert.equal(CASE_060_GAME.timelineEvents.length, 6);
  assert.equal(isCase060TimelineCorrect(CASE_060_GAME.correctOrder), true);
  assert.equal(isCase060TimelineCorrect([...CASE_060_GAME.correctOrder].reverse()), false);
});

test('Case 060 does not confuse shared credential or team key issue with an individual cabinet opening', () => {
  assert.equal(isCase060DeductionCorrect('shared', 'boundary'), true);
  assert.equal(isCase060DeductionCorrect('maren', 'boundary'), false);
  assert.equal(isCase060DeductionCorrect('shared', 'sana'), false);
});

test('Case 060 carries forward the recorder investigation archive', () => {
  const archive = archiveCompletedCase(EMPTY_INVESTIGATION_ARCHIVE, {
    caseId: 'case059', caseTitle: 'The Cache Access Roster', closedAt: '2026-11-03T10:00:00.000Z',
    selectedSuspectId: 'authorized', selectedMotiveId: 'limits',
    inspectedClues: ['Signed C-2 access roster'], askedQuestions: [], unansweredQuestions: [],
  });
  const memory = getCase060Carryover(archive);
  assert.equal(memory.priorFiles.length, 1);
  assert.equal(memory.clueCount, 1);
  assert.equal(memory.recorderTrailFiles, 1);
});
