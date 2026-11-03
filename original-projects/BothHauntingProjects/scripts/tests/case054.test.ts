import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CASE_054_GAME, getCase054Carryover, isCase054DeductionCorrect, isCase054TimelineCorrect } from '../../artifacts/casezero/game/case054Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 054 contains five unique records and three witnesses with two questions each', () => {
  assert.equal(CASE_054_GAME.clues.length, 5);
  assert.equal(new Set(CASE_054_GAME.clues.map((clue) => clue.id)).size, 5);
  assert.equal(CASE_054_GAME.witnesses.length, 3);
  assert.ok(CASE_054_GAME.witnesses.every((witness) => witness.questions.length === 2));
});

test('Case 054 orders the index, retrieval request, packet receipt, routing and exception', () => {
  assert.equal(isCase054TimelineCorrect(['index', 'request', 'receipt', 'routing', 'exception']), true);
  assert.equal(isCase054TimelineCorrect(['request', 'index', 'receipt', 'routing', 'exception']), false);
  assert.equal(isCase054TimelineCorrect(['index', 'request', 'routing', 'receipt', 'exception']), false);
  assert.equal(isCase054TimelineCorrect(['index', 'request', 'receipt', 'exception', 'routing']), false);
});

test('Case 054 distinguishes an archive packet from proof that the recorder was physically received', () => {
  assert.match(CASE_054_GAME.clues[0].detail, /does not prove the packet contents/);
  assert.match(CASE_054_GAME.clues[2].detail, /no device serial/);
  assert.match(CASE_054_GAME.clues[4].detail, /recorder itself remains unlocated/);
  assert.equal(isCase054DeductionCorrect('gap', 'custody'), true);
  assert.equal(isCase054DeductionCorrect('sela', 'custody'), false);
  assert.equal(isCase054DeductionCorrect('corin', 'custody'), false);
  assert.equal(isCase054DeductionCorrect('gap', 'corin'), false);
});

test('Case 054 carries the six-case dispatch and recorder trail forward', () => {
  let archive = EMPTY_INVESTIGATION_ARCHIVE;
  for (const [caseId, caseTitle] of [
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
  const memory = getCase054Carryover(archive);
  assert.equal(memory.priorFiles.length, 6);
  assert.equal(memory.clueCount, 12);
  assert.equal(memory.dispatchFiles, 6);
});
