import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  CASE_008_GAME,
  getCase008Carryover,
  isCase008DeductionCorrect,
  isCase008TimelineCorrect,
} from '../../artifacts/casezero/game/case008Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 008 has four unique records and three two-question witnesses', () => {
  assert.equal(CASE_008_GAME.clues.length, 4);
  assert.equal(new Set(CASE_008_GAME.clues.map((clue) => clue.id)).size, 4);
  assert.equal(CASE_008_GAME.witnesses.length, 3);
  assert.ok(CASE_008_GAME.witnesses.every((witness) => witness.questions.length === 2));
});

test('Case 008 timeline accepts only the documented event sequence', () => {
  assert.equal(isCase008TimelineCorrect(['index', 'gate', 'intake', 'maintenance']), true);
  assert.equal(isCase008TimelineCorrect(['maintenance', 'intake', 'gate', 'index']), false);
  assert.equal(isCase008TimelineCorrect(['index', 'gate']), false);
  assert.equal(isCase008TimelineCorrect(['index', 'index', 'intake', 'maintenance']), false);
});

test('Case 008 deduction identifies the intake receipt without claiming the controller', () => {
  assert.equal(isCase008DeductionCorrect('mara', 'receipt'), true);
  assert.equal(isCase008DeductionCorrect('eli', 'receipt'), false);
  assert.equal(isCase008DeductionCorrect('niko', 'controller'), false);
  assert.equal(isCase008DeductionCorrect(null, 'receipt'), false);
  assert.equal(isCase008DeductionCorrect('mara', null), false);
});

test('Case 008 carries archived relay evidence forward', () => {
  const archive = archiveCompletedCase(EMPTY_INVESTIGATION_ARCHIVE, {
    caseId: 'case007',
    caseTitle: 'The Relay at Station Three',
    closedAt: '2026-11-01T00:00:00.000Z',
    selectedSuspectId: 'ada',
    selectedMotiveId: 'receipt',
    inspectedClues: ['Routing slip', 'Switchboard log', 'Night roster', 'Call index'],
    askedQuestions: ['Ada: receipt'],
    unansweredQuestions: [],
  });
  const carryover = getCase008Carryover(archive);
  assert.equal(carryover.priorFiles.length, 1);
  assert.equal(carryover.priorFiles[0]?.caseId, 'case007');
  assert.equal(carryover.clueCount, 4);
  assert.equal(carryover.linkedRelayFiles, 1);
});
