import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CASE_057_GAME, getCase057Carryover, isCase057DeductionCorrect, isCase057TimelineCorrect } from '../../artifacts/casezero/game/case057Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 057 contains five unique evidence records and three witnesses with two questions each', () => {
  assert.equal(CASE_057_GAME.clues.length, 5);
  assert.equal(new Set(CASE_057_GAME.clues.map((clue) => clue.id)).size, 5);
  assert.equal(CASE_057_GAME.witnesses.length, 3);
  assert.ok(CASE_057_GAME.witnesses.every((witness) => witness.questions.length === 2));
});

test('Case 057 orders automatic mode, sealed inventory, carrier receipt, decoder audit and register close', () => {
  assert.equal(isCase057TimelineCorrect(['mode', 'inventory', 'carrier', 'audit', 'register']), true);
  assert.equal(isCase057TimelineCorrect(['inventory', 'mode', 'carrier', 'audit', 'register']), false);
  assert.equal(isCase057TimelineCorrect(['mode', 'carrier', 'inventory', 'audit', 'register']), false);
  assert.equal(isCase057TimelineCorrect(['mode', 'inventory', 'carrier', 'register', 'audit']), false);
});

test('Case 057 distinguishes an automatic network receipt from a person or recorder location', () => {
  assert.match(CASE_057_GAME.clues[0].detail, /no speaker identity/);
  assert.match(CASE_057_GAME.clues[1].detail, /automatic acknowledgement/);
  assert.match(CASE_057_GAME.clues[2].detail, /automatic relay mode/);
  assert.match(CASE_057_GAME.clues[3].detail, /seal check at 20:02 confirms the cage remained closed/);
  assert.match(CASE_057_GAME.clues[4].detail, /No individual handset serial/);
  assert.equal(isCase057DeductionCorrect('automatic', 'receipt'), true);
  assert.equal(isCase057DeductionCorrect('nara', 'receipt'), false);
  assert.equal(isCase057DeductionCorrect('joren', 'receipt'), false);
  assert.equal(isCase057DeductionCorrect('automatic', 'rowan'), false);
});

test('Case 057 carries the Missing Detective evidence chain forward from Case 048 through 056', () => {
  let archive = EMPTY_INVESTIGATION_ARCHIVE;
  for (const [caseId, caseTitle] of [
    ['case056', 'The Relay Window'], ['case055', 'The Last Verified Assignment'],
    ['case054', 'The Recorder Transfer'], ['case053', 'The Duplicate Dispatch Seal'],
    ['case052', 'The Dispatch Copy'], ['case051', 'The Blank Approval Line'],
    ['case050', 'The Empty Source Tray'], ['case049', 'The Missing Authorization Page'],
    ['case048', 'The Original Request']
  ]) {
    archive = archiveCompletedCase(archive, {
      caseId, caseTitle, closedAt: '2026-11-03T00:00:00.000Z',
      selectedSuspectId: 'unknown', selectedMotiveId: 'limits',
      inspectedClues: ['one', 'two'], askedQuestions: ['audit:one'], unansweredQuestions: []
    });
  }
  const memory = getCase057Carryover(archive);
  assert.equal(memory.priorFiles.length, 9);
  assert.equal(memory.clueCount, 18);
  assert.equal(memory.recorderTrailFiles, 9);
});
