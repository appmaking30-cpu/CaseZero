import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CASE_051_GAME, getCase051Carryover, isCase051DeductionCorrect, isCase051TimelineCorrect } from '../../artifacts/casezero/game/case051Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 051 has four unique approval records and three witnesses with two questions each', () => {
  assert.equal(CASE_051_GAME.clues.length, 4);
  assert.equal(new Set(CASE_051_GAME.clues.map((clue) => clue.id)).size, 4);
  assert.equal(CASE_051_GAME.witnesses.length, 3);
  assert.ok(CASE_051_GAME.witnesses.every((witness) => witness.questions.length === 2));
});

test('Case 051 orders eligibility, request, countersignature check and exception', () => {
  assert.equal(isCase051TimelineCorrect(['roster', 'request', 'counter', 'exception']), true);
  assert.equal(isCase051TimelineCorrect(['request', 'roster', 'counter', 'exception']), false);
  assert.equal(isCase051TimelineCorrect(['roster', 'counter', 'request', 'exception']), false);
});

test('Case 051 separates signatory eligibility and request entry from actual approval', () => {
  const register = CASE_051_GAME.clues.find((clue) => clue.id === 'register')!;
  const counter = CASE_051_GAME.clues.find((clue) => clue.id === 'counter')!;
  assert.match(register.detail, /awaiting signatory/);
  assert.match(counter.detail, /Both signature fields are blank/);
  assert.equal(isCase051DeductionCorrect('unknown', 'limits'), true);
  assert.equal(isCase051DeductionCorrect('elian', 'limits'), false);
  assert.equal(isCase051DeductionCorrect('mara', 'limits'), false);
  assert.equal(isCase051DeductionCorrect('unknown', 'elian'), false);
});

test('Case 051 carries the source-tray, missing-page and request trail forward', () => {
  let archive = EMPTY_INVESTIGATION_ARCHIVE;
  for (const [caseId, caseTitle] of [
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
  const memory = getCase051Carryover(archive);
  assert.equal(memory.priorFiles.length, 3);
  assert.equal(memory.clueCount, 6);
  assert.equal(memory.authorizationTrailFiles, 3);
});
