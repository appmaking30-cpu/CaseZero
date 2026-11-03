import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CASE_046_GAME, getCase046Carryover, isCase046DeductionCorrect, isCase046TimelineCorrect } from '../../artifacts/casezero/game/case046Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 046 has four unique records and three witnesses with two questions each', () => {
  assert.equal(CASE_046_GAME.clues.length, 4);
  assert.equal(new Set(CASE_046_GAME.clues.map((clue) => clue.id)).size, 4);
  assert.equal(CASE_046_GAME.witnesses.length, 3);
  assert.ok(CASE_046_GAME.witnesses.every((witness) => witness.questions.length === 2));
});

test('Case 046 orders the roster, desk allocation, reader event and shared session', () => {
  assert.equal(isCase046TimelineCorrect(['roster', 'desk', 'reader', 'session']), true);
  assert.equal(isCase046TimelineCorrect(['desk', 'roster', 'reader', 'session']), false);
  assert.equal(isCase046TimelineCorrect(['roster', 'desk', 'session', 'reader']), false);
});

test('Case 046 distinguishes scheduled assignments from personal badge custody', () => {
  const roster = CASE_046_GAME.clues.find((clue) => clue.id === 'roster')!;
  const desk = CASE_046_GAME.clues.find((clue) => clue.id === 'deskBoard')!;
  const session = CASE_046_GAME.clues.find((clue) => clue.id === 'consoleAudit')!;
  assert.match(roster.detail, /Leena Voss.*Omar Pell/);
  assert.match(desk.detail, /assigns console DS-2 to Leena Voss/);
  assert.match(session.detail, /shared R2 role credential/);
  assert.equal(isCase046DeductionCorrect('unknown', 'limits'), true);
  assert.equal(isCase046DeductionCorrect('leena', 'limits'), false);
  assert.equal(isCase046DeductionCorrect('omar', 'limits'), false);
  assert.equal(isCase046DeductionCorrect('unknown', 'leena'), false);
});

test('Case 046 carries the badge trail and earlier investigation memory forward', () => {
  let archive = EMPTY_INVESTIGATION_ARCHIVE;
  for (const [caseId, caseTitle] of [
    ['case045', 'The Handover Copy'],
    ['case044', 'The Badge Without a Name'],
    ['case043', 'The Specimen Register']
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
  const memory = getCase046Carryover(archive);
  assert.equal(memory.priorFiles.length, 3);
  assert.equal(memory.clueCount, 6);
  assert.equal(memory.badgeTrailFiles, 3);
});
