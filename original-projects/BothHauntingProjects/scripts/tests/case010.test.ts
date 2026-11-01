import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  CASE_010_GAME,
  getCase010Carryover,
  isCase010DeductionCorrect,
  isCase010TimelineCorrect,
} from '../../artifacts/casezero/game/case010Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 010 has four unique records and three two-question witnesses', () => {
  assert.equal(CASE_010_GAME.clues.length, 4);
  assert.equal(new Set(CASE_010_GAME.clues.map((clue) => clue.id)).size, 4);
  assert.equal(CASE_010_GAME.witnesses.length, 3);
  assert.ok(CASE_010_GAME.witnesses.every((witness) => witness.questions.length === 2));
});

test('Case 010 timeline follows the index, checkout, outage and delegation records', () => {
  assert.equal(isCase010TimelineCorrect(['locator', 'checkout', 'outage', 'delegation']), true);
  assert.equal(isCase010TimelineCorrect(['delegation', 'outage', 'checkout', 'locator']), false);
  assert.equal(isCase010TimelineCorrect(['locator', 'checkout']), false);
  assert.equal(isCase010TimelineCorrect(['locator', 'locator', 'outage', 'delegation']), false);
});

test('Case 010 identifies the active authority channel without accusing a person', () => {
  assert.equal(isCase010DeductionCorrect('continuity', 'window'), true);
  assert.equal(isCase010DeductionCorrect('route', 'window'), false);
  assert.equal(isCase010DeductionCorrect('registry', 'window'), false);
  assert.equal(isCase010DeductionCorrect('continuity', 'person'), false);
  assert.equal(isCase010DeductionCorrect(null, 'window'), false);
});

test('Case 010 carries the prior relay and authorization trail forward', () => {
  const archive = archiveCompletedCase(EMPTY_INVESTIGATION_ARCHIVE, {
    caseId: 'case009',
    caseTitle: 'The Third Reference',
    closedAt: '2026-11-01T00:00:00.000Z',
    selectedSuspectId: 'oren',
    selectedMotiveId: 'access',
    inspectedClues: ['Inventory copy', 'Drawer log', 'Renewal register', 'Transfer receipt'],
    askedQuestions: ['Oren: access'],
    unansweredQuestions: [],
  });
  const carryover = getCase010Carryover(archive);
  assert.equal(carryover.priorFiles.length, 1);
  assert.equal(carryover.priorFiles[0]?.caseId, 'case009');
  assert.equal(carryover.clueCount, 4);
  assert.equal(carryover.relayFiles, 1);
});
