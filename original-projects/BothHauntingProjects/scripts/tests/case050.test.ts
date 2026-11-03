import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CASE_050_GAME, getCase050Carryover, isCase050DeductionCorrect, isCase050TimelineCorrect } from '../../artifacts/casezero/game/case050Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 050 has four unique records and three witnesses with two questions each', () => {
  assert.equal(CASE_050_GAME.clues.length, 4);
  assert.equal(new Set(CASE_050_GAME.clues.map((clue) => clue.id)).size, 4);
  assert.equal(CASE_050_GAME.witnesses.length, 3);
  assert.ok(CASE_050_GAME.witnesses.every((witness) => witness.questions.length === 2));
});

test('Case 050 orders the ledger, tray transfer, shelf audit and search', () => {
  assert.equal(isCase050TimelineCorrect(['ledger', 'transfer', 'shelf', 'search']), true);
  assert.equal(isCase050TimelineCorrect(['transfer', 'ledger', 'shelf', 'search']), false);
  assert.equal(isCase050TimelineCorrect(['ledger', 'shelf', 'transfer', 'search']), false);
});

test('Case 050 distinguishes a ledger allocation from proof of physical custody', () => {
  const ledger = CASE_050_GAME.clues.find((clue) => clue.id === 'ledger')!;
  const transfer = CASE_050_GAME.clues.find((clue) => clue.id === 'transfer')!;
  assert.match(ledger.detail, /not that an auditor independently saw the physical page/);
  assert.match(transfer.detail, /individual handover fields are blank/);
  assert.equal(isCase050DeductionCorrect('unknown', 'limits'), true);
  assert.equal(isCase050DeductionCorrect('niko', 'limits'), false);
  assert.equal(isCase050DeductionCorrect('rhea', 'limits'), false);
  assert.equal(isCase050DeductionCorrect('unknown', 'niko'), false);
});

test('Case 050 carries the authorization-page and correction trail forward', () => {
  let archive = EMPTY_INVESTIGATION_ARCHIVE;
  for (const [caseId, caseTitle] of [
    ['case049', 'The Missing Authorization Page'],
    ['case048', 'The Original Request'],
    ['case047', 'The Pickup Slip']
  ]) {
    archive = archiveCompletedCase(archive, {
      caseId, caseTitle, closedAt: '2026-11-03T00:00:00.000Z',
      selectedSuspectId: 'unknown', selectedMotiveId: 'limits',
      inspectedClues: ['one', 'two'], askedQuestions: ['audit:one'], unansweredQuestions: []
    });
  }
  const memory = getCase050Carryover(archive);
  assert.equal(memory.priorFiles.length, 3);
  assert.equal(memory.clueCount, 6);
  assert.equal(memory.correctionTrailFiles, 3);
});
