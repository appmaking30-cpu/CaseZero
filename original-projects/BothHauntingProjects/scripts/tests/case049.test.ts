import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CASE_049_GAME, getCase049Carryover, isCase049DeductionCorrect, isCase049TimelineCorrect } from '../../artifacts/casezero/game/case049Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 049 has four unique records and three witnesses with two questions each', () => {
  assert.equal(CASE_049_GAME.clues.length, 4);
  assert.equal(new Set(CASE_049_GAME.clues.map((clue) => clue.id)).size, 4);
  assert.equal(CASE_049_GAME.witnesses.length, 3);
  assert.ok(CASE_049_GAME.witnesses.every((witness) => witness.questions.length === 2));
});

test('Case 049 orders the scan, transfer, sleeve receipt and discrepancy audit', () => {
  assert.equal(isCase049TimelineCorrect(['scan', 'transfer', 'sleeve', 'exception']), true);
  assert.equal(isCase049TimelineCorrect(['transfer', 'scan', 'sleeve', 'exception']), false);
  assert.equal(isCase049TimelineCorrect(['scan', 'sleeve', 'transfer', 'exception']), false);
});

test('Case 049 does not attribute the missing authorization leaf to a named employee', () => {
  const manifest = CASE_049_GAME.clues.find((clue) => clue.id === 'manifest')!;
  const transfer = CASE_049_GAME.clues.find((clue) => clue.id === 'transfer')!;
  assert.match(manifest.detail, /shared DC-1 role label/);
  assert.match(transfer.detail, /individual handover signatures are blank/);
  assert.equal(isCase049DeductionCorrect('unknown', 'limits'), true);
  assert.equal(isCase049DeductionCorrect('jonas', 'limits'), false);
  assert.equal(isCase049DeductionCorrect('asha', 'limits'), false);
  assert.equal(isCase049DeductionCorrect('unknown', 'jonas'), false);
});

test('Case 049 carries the missing-request and pickup trail forward', () => {
  let archive = EMPTY_INVESTIGATION_ARCHIVE;
  for (const [caseId, caseTitle] of [
    ['case048', 'The Original Request'],
    ['case047', 'The Pickup Slip'],
    ['case046', 'The Relief Roster']
  ]) {
    archive = archiveCompletedCase(archive, {
      caseId, caseTitle, closedAt: '2026-11-03T00:00:00.000Z',
      selectedSuspectId: 'unknown', selectedMotiveId: 'record',
      inspectedClues: ['one', 'two'], askedQuestions: ['audit:one'], unansweredQuestions: []
    });
  }
  const memory = getCase049Carryover(archive);
  assert.equal(memory.priorFiles.length, 3);
  assert.equal(memory.clueCount, 6);
  assert.equal(memory.correctionTrailFiles, 3);
});
