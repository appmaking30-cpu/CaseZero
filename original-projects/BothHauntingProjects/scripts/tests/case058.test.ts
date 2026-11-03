import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CASE_058_GAME, getCase058Carryover, isCase058DeductionCorrect, isCase058TimelineCorrect } from '../../artifacts/casezero/game/case058Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 058 contains five unique evidence records and three witnesses with two questions each', () => {
  assert.equal(CASE_058_GAME.clues.length, 5);
  assert.equal(new Set(CASE_058_GAME.clues.map((clue) => clue.id)).size, 5);
  assert.equal(CASE_058_GAME.witnesses.length, 3);
  assert.ok(CASE_058_GAME.witnesses.every((witness) => witness.questions.length === 2));
});

test('Case 058 orders the fragment, corrected cache time, inventory, integrity check, export and lab comparison', () => {
  assert.equal(isCase058TimelineCorrect(['fragment', 'cache', 'inventory', 'integrity', 'export', 'lab']), true);
  assert.equal(isCase058TimelineCorrect(['cache', 'fragment', 'inventory', 'integrity', 'export', 'lab']), false);
  assert.equal(isCase058TimelineCorrect(['fragment', 'inventory', 'cache', 'integrity', 'export', 'lab']), false);
  assert.equal(isCase058TimelineCorrect(['fragment', 'cache', 'inventory', 'export', 'integrity', 'lab']), false);
});

test('Case 058 separates data integrity and timing from device identity', () => {
  assert.match(CASE_058_GAME.clues[1].detail, /checksum confirms data integrity, not the identity/);
  assert.match(CASE_058_GAME.clues[2].detail, /six minutes slow/);
  assert.match(CASE_058_GAME.clues[3].detail, /shared MT-4 maintenance role/);
  assert.match(CASE_058_GAME.clues[4].detail, /no device serial, hardware signature or recorder-specific watermark/);
  assert.equal(isCase058DeductionCorrect('authentic', 'integrity'), true);
  assert.equal(isCase058DeductionCorrect('oren', 'integrity'), false);
  assert.equal(isCase058DeductionCorrect('talia', 'integrity'), false);
  assert.equal(isCase058DeductionCorrect('authentic', 'rowan'), false);
});

test('Case 058 carries the Missing Detective evidence chain forward from Cases 048–057', () => {
  let archive = EMPTY_INVESTIGATION_ARCHIVE;
  for (const [caseId, caseTitle] of [
    ['case057', 'The West-Corridor Response'], ['case056', 'The Relay Window'],
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
  const memory = getCase058Carryover(archive);
  assert.equal(memory.priorFiles.length, 10);
  assert.equal(memory.clueCount, 20);
  assert.equal(memory.recorderTrailFiles, 10);
});
