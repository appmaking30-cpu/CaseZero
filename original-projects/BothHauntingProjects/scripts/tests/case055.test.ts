import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CASE_055_GAME, getCase055Carryover, isCase055DeductionCorrect, isCase055TimelineCorrect } from '../../artifacts/casezero/game/case055Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 055 contains five unique records and three witnesses with two questions each', () => {
  assert.equal(CASE_055_GAME.clues.length, 5);
  assert.equal(new Set(CASE_055_GAME.clues.map((clue) => clue.id)).size, 5);
  assert.equal(CASE_055_GAME.witnesses.length, 3);
  assert.ok(CASE_055_GAME.witnesses.every((witness) => witness.questions.length === 2));
});

test('Case 055 orders schedule, duty roster, desk acknowledgment, closeout and audit', () => {
  assert.equal(isCase055TimelineCorrect(['schedule', 'roster', 'route', 'closeout', 'variance']), true);
  assert.equal(isCase055TimelineCorrect(['roster', 'schedule', 'route', 'closeout', 'variance']), false);
  assert.equal(isCase055TimelineCorrect(['schedule', 'route', 'roster', 'closeout', 'variance']), false);
  assert.equal(isCase055TimelineCorrect(['schedule', 'roster', 'route', 'variance', 'closeout']), false);
});

test('Case 055 separates last verified assignment from personal arrival and recorder custody', () => {
  assert.match(CASE_055_GAME.clues[0].detail, /no device serial/);
  assert.match(CASE_055_GAME.clues[2].detail, /does not carry Rowan’s personal signature/);
  assert.match(CASE_055_GAME.clues[4].detail, /last person to hold the recorder/);
  assert.equal(isCase055DeductionCorrect('gap', 'assignment'), true);
  assert.equal(isCase055DeductionCorrect('elara', 'assignment'), false);
  assert.equal(isCase055DeductionCorrect('davin', 'assignment'), false);
  assert.equal(isCase055DeductionCorrect('gap', 'davin'), false);
});

test('Case 055 carries the recorder investigation forward from Case 048 through 054', () => {
  let archive = EMPTY_INVESTIGATION_ARCHIVE;
  for (const [caseId, caseTitle] of [
    ['case054', 'The Recorder Transfer'],
    ['case053', 'The Duplicate Dispatch Seal'],
    ['case052', 'The Dispatch Copy'],
    ['case051', 'The Blank Approval Line'],
    ['case050', 'The Empty Source Tray'],
    ['case049', 'The Missing Authorization Page'],
    ['case048', 'The Original Request']
  ]) {
    archive = archiveCompletedCase(archive, {
      caseId, caseTitle, closedAt: '2026-11-03T00:00:00.000Z',
      selectedSuspectId: 'unknown', selectedMotiveId: 'limits',
      inspectedClues: ['one', 'two'], askedQuestions: ['audit:one'], unansweredQuestions: []
    });
  }
  const memory = getCase055Carryover(archive);
  assert.equal(memory.priorFiles.length, 7);
  assert.equal(memory.clueCount, 14);
  assert.equal(memory.recorderTrailFiles, 7);
});
