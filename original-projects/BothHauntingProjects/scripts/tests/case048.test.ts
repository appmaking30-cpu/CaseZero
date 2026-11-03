import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CASE_048_GAME, getCase048Carryover, isCase048DeductionCorrect, isCase048TimelineCorrect } from '../../artifacts/casezero/game/case048Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 048 has four unique records and three witnesses with two questions each', () => {
  assert.equal(CASE_048_GAME.clues.length, 4);
  assert.equal(new Set(CASE_048_GAME.clues.map((clue) => clue.id)).size, 4);
  assert.equal(CASE_048_GAME.witnesses.length, 3);
  assert.ok(CASE_048_GAME.witnesses.every((witness) => witness.questions.length === 2));
});

test('Case 048 orders terminal activity, request, intake docket and retention scan', () => {
  assert.equal(isCase048TimelineCorrect(['terminal', 'request', 'docket', 'retention']), true);
  assert.equal(isCase048TimelineCorrect(['request', 'terminal', 'docket', 'retention']), false);
  assert.equal(isCase048TimelineCorrect(['terminal', 'request', 'retention', 'docket']), false);
});

test('Case 048 refuses to attribute an unauthenticated request to a named employee', () => {
  const request = CASE_048_GAME.clues.find((clue) => clue.id === 'request')!;
  const terminal = CASE_048_GAME.clues.find((clue) => clue.id === 'terminal')!;
  assert.match(request.detail, /T\.R\./);
  assert.match(request.detail, /personal-name line is blank/);
  assert.match(terminal.detail, /shared DC-1 role credential/);
  assert.equal(isCase048DeductionCorrect('unknown', 'limits'), true);
  assert.equal(isCase048DeductionCorrect('tamsin', 'limits'), false);
  assert.equal(isCase048DeductionCorrect('ilya', 'limits'), false);
  assert.equal(isCase048DeductionCorrect('unknown', 'tamsin'), false);
});

test('Case 048 carries the correction trail and earlier investigation memory forward', () => {
  let archive = EMPTY_INVESTIGATION_ARCHIVE;
  for (const [caseId, caseTitle] of [
    ['case047', 'The Pickup Slip'],
    ['case046', 'The Relief Roster'],
    ['case045', 'The Handover Copy']
  ]) {
    archive = archiveCompletedCase(archive, {
      caseId, caseTitle, closedAt: '2026-11-03T00:00:00.000Z',
      selectedSuspectId: 'unknown', selectedMotiveId: 'record',
      inspectedClues: ['one', 'two'], askedQuestions: ['audit:one'], unansweredQuestions: []
    });
  }
  const memory = getCase048Carryover(archive);
  assert.equal(memory.priorFiles.length, 3);
  assert.equal(memory.clueCount, 6);
  assert.equal(memory.correctionTrailFiles, 3);
});
