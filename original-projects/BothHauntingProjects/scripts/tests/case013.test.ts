import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  CASE_013_GAME,
  getCase013Carryover,
  isCase013DeductionCorrect,
  isCase013TimelineCorrect,
} from '../../artifacts/casezero/game/case013Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 013 has four unique custody records and three two-question witnesses', () => {
  assert.equal(CASE_013_GAME.clues.length, 4);
  assert.equal(new Set(CASE_013_GAME.clues.map((clue) => clue.id)).size, 4);
  assert.equal(CASE_013_GAME.witnesses.length, 3);
  assert.ok(CASE_013_GAME.witnesses.every((witness) => witness.questions.length === 2));
});

test('Case 013 timeline orders assignment, release, receipt and return', () => {
  assert.equal(isCase013TimelineCorrect(['assignment', 'release', 'receipt', 'return']), true);
  assert.equal(isCase013TimelineCorrect(['return', 'receipt', 'release', 'assignment']), false);
  assert.equal(isCase013TimelineCorrect(['assignment', 'release']), false);
  assert.equal(isCase013TimelineCorrect(['assignment', 'assignment', 'receipt', 'return']), false);
});

test('Case 013 identifies recorded borrower without claiming badge presentation or terminal use', () => {
  assert.equal(isCase013DeductionCorrect('ivo', 'custody'), true);
  assert.equal(isCase013DeductionCorrect('sable', 'custody'), false);
  assert.equal(isCase013DeductionCorrect('mira', 'custody'), false);
  assert.equal(isCase013DeductionCorrect('ivo', 'carrier'), false);
  assert.equal(isCase013DeductionCorrect('ivo', 'operator'), false);
  assert.equal(isCase013DeductionCorrect(null, 'custody'), false);
});

test('Case 013 carries the corridor and custody investigation forward', () => {
  const archive = archiveCompletedCase(EMPTY_INVESTIGATION_ARCHIVE, {
    caseId: 'case012',
    caseTitle: 'The Door Beside the Terminal',
    closedAt: '2026-11-01T00:00:00.000Z',
    selectedSuspectId: 'south',
    selectedMotiveId: 'route',
    inspectedClues: ['C-4 corridor access plan', 'South vestibule reader event', 'Terminal session', 'South vestibule exit event'],
    askedQuestions: ['Nadi: reader'],
    unansweredQuestions: [],
  });
  const carryover = getCase013Carryover(archive);
  assert.equal(carryover.priorFiles.length, 1);
  assert.equal(carryover.priorFiles[0]?.caseId, 'case012');
  assert.equal(carryover.clueCount, 4);
  assert.equal(carryover.custodyTrailFiles, 1);
});
