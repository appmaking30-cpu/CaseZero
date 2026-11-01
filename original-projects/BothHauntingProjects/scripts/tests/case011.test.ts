import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  CASE_011_GAME,
  getCase011Carryover,
  isCase011DeductionCorrect,
  isCase011TimelineCorrect,
} from '../../artifacts/casezero/game/case011Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 011 has four unique records and three two-question witnesses', () => {
  assert.equal(CASE_011_GAME.clues.length, 4);
  assert.equal(new Set(CASE_011_GAME.clues.map((clue) => clue.id)).size, 4);
  assert.equal(CASE_011_GAME.witnesses.length, 3);
  assert.ok(CASE_011_GAME.witnesses.every((witness) => witness.questions.length === 2));
});

test('Case 011 timeline follows warrant, roster, session and audit export', () => {
  assert.equal(isCase011TimelineCorrect(['warrant', 'roster', 'session', 'export']), true);
  assert.equal(isCase011TimelineCorrect(['export', 'session', 'roster', 'warrant']), false);
  assert.equal(isCase011TimelineCorrect(['warrant', 'roster']), false);
  assert.equal(isCase011TimelineCorrect(['warrant', 'warrant', 'session', 'export']), false);
});

test('Case 011 identifies the scheduled coordinator without claiming terminal use', () => {
  assert.equal(isCase011DeductionCorrect('sable', 'scheduled'), true);
  assert.equal(isCase011DeductionCorrect('ivo', 'scheduled'), false);
  assert.equal(isCase011DeductionCorrect('mara', 'scheduled'), false);
  assert.equal(isCase011DeductionCorrect('sable', 'operated'), false);
  assert.equal(isCase011DeductionCorrect(null, 'scheduled'), false);
});

test('Case 011 carries the authorization trail forward', () => {
  const archive = archiveCompletedCase(EMPTY_INVESTIGATION_ARCHIVE, {
    caseId: 'case010',
    caseTitle: 'The Names Behind the Seal',
    closedAt: '2026-11-01T00:00:00.000Z',
    selectedSuspectId: 'continuity',
    selectedMotiveId: 'window',
    inspectedClues: ['D-4 locator', 'P-1 extract', 'Outage notice', 'Delegation entry'],
    askedQuestions: ['Sable: authority window'],
    unansweredQuestions: [],
  });
  const carryover = getCase011Carryover(archive);
  assert.equal(carryover.priorFiles.length, 1);
  assert.equal(carryover.priorFiles[0]?.caseId, 'case010');
  assert.equal(carryover.clueCount, 4);
  assert.equal(carryover.authorityFiles, 1);
});
