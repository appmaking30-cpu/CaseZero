import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CASE_047_GAME, getCase047Carryover, isCase047DeductionCorrect, isCase047TimelineCorrect } from '../../artifacts/casezero/game/case047Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 047 has four unique records and three witnesses with two questions each', () => {
  assert.equal(CASE_047_GAME.clues.length, 4);
  assert.equal(new Set(CASE_047_GAME.clues.map((clue) => clue.id)).size, 4);
  assert.equal(CASE_047_GAME.witnesses.length, 3);
  assert.ok(CASE_047_GAME.witnesses.every((witness) => witness.questions.length === 2));
});

test('Case 047 orders the counter register, carbon mark, correction and return seal', () => {
  assert.equal(isCase047TimelineCorrect(['register', 'carbon', 'correction', 'seal']), true);
  assert.equal(isCase047TimelineCorrect(['carbon', 'register', 'correction', 'seal']), false);
  assert.equal(isCase047TimelineCorrect(['register', 'carbon', 'seal', 'correction']), false);
});

test('Case 047 refuses to attribute unauthenticated initials to a named person', () => {
  const carbon = CASE_047_GAME.clues.find((clue) => clue.id === 'carbon')!;
  const register = CASE_047_GAME.clues.find((clue) => clue.id === 'register')!;
  assert.match(carbon.detail, /M\.P\./);
  assert.match(carbon.detail, /not unique/);
  assert.match(register.detail, /relief desk/);
  assert.equal(isCase047DeductionCorrect('unknown', 'limits'), true);
  assert.equal(isCase047DeductionCorrect('mara', 'limits'), false);
  assert.equal(isCase047DeductionCorrect('omar', 'limits'), false);
  assert.equal(isCase047DeductionCorrect('unknown', 'mara'), false);
});

test('Case 047 carries the pickup trail and earlier investigation memory forward', () => {
  let archive = EMPTY_INVESTIGATION_ARCHIVE;
  for (const [caseId, caseTitle] of [
    ['case046', 'The Relief Roster'],
    ['case045', 'The Handover Copy'],
    ['case044', 'The Badge Without a Name']
  ]) {
    archive = archiveCompletedCase(archive, {
      caseId,
      caseTitle,
      closedAt: '2026-11-03T00:00:00.000Z',
      selectedSuspectId: 'unknown',
      selectedMotiveId: 'record',
      inspectedClues: ['one', 'two'],
      askedQuestions: ['audit:one'],
      unansweredQuestions: []
    });
  }
  const memory = getCase047Carryover(archive);
  assert.equal(memory.priorFiles.length, 3);
  assert.equal(memory.clueCount, 6);
  assert.equal(memory.pickupTrailFiles, 3);
});
