import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CASE_053_GAME, getCase053Carryover, isCase053DeductionCorrect, isCase053TimelineCorrect } from '../../artifacts/casezero/game/case053Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 053 has five unique records and three witnesses with two questions each', () => {
  assert.equal(CASE_053_GAME.clues.length, 5);
  assert.equal(new Set(CASE_053_GAME.clues.map((clue) => clue.id)).size, 5);
  assert.equal(CASE_053_GAME.witnesses.length, 3);
  assert.ok(CASE_053_GAME.witnesses.every((witness) => witness.questions.length === 2));
});

test('Case 053 orders the register, issue, two packet entries and audit', () => {
  assert.equal(isCase053TimelineCorrect(['register', 'counterfoil', 'd17', 'f09', 'audit']), true);
  assert.equal(isCase053TimelineCorrect(['counterfoil', 'register', 'd17', 'f09', 'audit']), false);
  assert.equal(isCase053TimelineCorrect(['register', 'counterfoil', 'f09', 'd17', 'audit']), false);
  assert.equal(isCase053TimelineCorrect(['register', 'counterfoil', 'd17', 'audit', 'f09']), false);
});

test('Case 053 distinguishes a duplicate record reference from a proven duplicate physical seal', () => {
  assert.match(CASE_053_GAME.clues[3].detail, /identifier collision/);
  assert.match(CASE_053_GAME.clues[3].detail, /does not establish whether a second physical seal existed/);
  assert.match(CASE_053_GAME.clues[4].detail, /record discrepancy/);
  assert.equal(isCase053DeductionCorrect('collision', 'record'), true);
  assert.equal(isCase053DeductionCorrect('yara', 'record'), false);
  assert.equal(isCase053DeductionCorrect('dev', 'record'), false);
  assert.equal(isCase053DeductionCorrect('collision', 'dev'), false);
});

test('Case 053 carries the dispatch authorization chain forward', () => {
  let archive = EMPTY_INVESTIGATION_ARCHIVE;
  for (const [caseId, caseTitle] of [
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
  const memory = getCase053Carryover(archive);
  assert.equal(memory.priorFiles.length, 5);
  assert.equal(memory.clueCount, 10);
  assert.equal(memory.dispatchFiles, 5);
});
