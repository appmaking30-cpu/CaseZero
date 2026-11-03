import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CASE_056_GAME, getCase056Carryover, isCase056DeductionCorrect, isCase056TimelineCorrect } from '../../artifacts/casezero/game/case056Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 056 contains five unique records and three witnesses with two questions each', () => {
  assert.equal(CASE_056_GAME.clues.length, 5);
  assert.equal(new Set(CASE_056_GAME.clues.map((clue) => clue.id)).size, 5);
  assert.equal(CASE_056_GAME.witnesses.length, 3);
  assert.ok(CASE_056_GAME.witnesses.every((witness) => witness.questions.length === 2));
});

test('Case 056 reconciles channel setup, corrected gate event, relay recording, window close and audit', () => {
  assert.equal(isCase056TimelineCorrect(['channel', 'badge', 'recording', 'window', 'audit']), true);
  assert.equal(isCase056TimelineCorrect(['badge', 'channel', 'recording', 'window', 'audit']), false);
  assert.equal(isCase056TimelineCorrect(['channel', 'recording', 'badge', 'window', 'audit']), false);
  assert.equal(isCase056TimelineCorrect(['channel', 'badge', 'recording', 'audit', 'window']), false);
});

test('Case 056 distinguishes independently corroborated presence from recorder custody', () => {
  assert.match(CASE_056_GAME.clues[0].detail, /Rowan’s assigned credential/);
  assert.match(CASE_056_GAME.clues[1].detail, /registered voice/);
  assert.match(CASE_056_GAME.clues[2].detail, /four minutes fast/);
  assert.match(CASE_056_GAME.clues[4].detail, /last handler remain unknown/);
  assert.equal(isCase056DeductionCorrect('presence', 'corroborated'), true);
  assert.equal(isCase056DeductionCorrect('tessa', 'corroborated'), false);
  assert.equal(isCase056DeductionCorrect('malik', 'corroborated'), false);
  assert.equal(isCase056DeductionCorrect('presence', 'malik'), false);
});

test('Case 056 carries the Missing Detective evidence chain forward from Case 048 through 055', () => {
  let archive = EMPTY_INVESTIGATION_ARCHIVE;
  for (const [caseId, caseTitle] of [
    ['case055', 'The Last Verified Assignment'], ['case054', 'The Recorder Transfer'],
    ['case053', 'The Duplicate Dispatch Seal'], ['case052', 'The Dispatch Copy'],
    ['case051', 'The Blank Approval Line'], ['case050', 'The Empty Source Tray'],
    ['case049', 'The Missing Authorization Page'], ['case048', 'The Original Request']
  ]) {
    archive = archiveCompletedCase(archive, {
      caseId, caseTitle, closedAt: '2026-11-03T00:00:00.000Z',
      selectedSuspectId: 'unknown', selectedMotiveId: 'limits',
      inspectedClues: ['one', 'two'], askedQuestions: ['audit:one'], unansweredQuestions: []
    });
  }
  const memory = getCase056Carryover(archive);
  assert.equal(memory.priorFiles.length, 8);
  assert.equal(memory.clueCount, 16);
  assert.equal(memory.recorderTrailFiles, 8);
});
