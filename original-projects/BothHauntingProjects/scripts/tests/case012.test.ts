import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  CASE_012_GAME,
  getCase012Carryover,
  isCase012DeductionCorrect,
  isCase012TimelineCorrect,
} from '../../artifacts/casezero/game/case012Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 012 has four unique records and three two-question witnesses', () => {
  assert.equal(CASE_012_GAME.clues.length, 4);
  assert.equal(new Set(CASE_012_GAME.clues.map((clue) => clue.id)).size, 4);
  assert.equal(CASE_012_GAME.witnesses.length, 3);
  assert.ok(CASE_012_GAME.witnesses.every((witness) => witness.questions.length === 2));
});

test('Case 012 timeline follows plan, entry, terminal session and exit', () => {
  assert.equal(isCase012TimelineCorrect(['plan', 'entry', 'session', 'exit']), true);
  assert.equal(isCase012TimelineCorrect(['exit', 'session', 'entry', 'plan']), false);
  assert.equal(isCase012TimelineCorrect(['plan', 'entry']), false);
  assert.equal(isCase012TimelineCorrect(['plan', 'plan', 'session', 'exit']), false);
});

test('Case 012 identifies the documented access route without accusing a badge carrier', () => {
  assert.equal(isCase012DeductionCorrect('south', 'route'), true);
  assert.equal(isCase012DeductionCorrect('service', 'route'), false);
  assert.equal(isCase012DeductionCorrect('lift', 'route'), false);
  assert.equal(isCase012DeductionCorrect('south', 'sable'), false);
  assert.equal(isCase012DeductionCorrect('south', 'operator'), false);
  assert.equal(isCase012DeductionCorrect(null, 'route'), false);
});

test('Case 012 carries the authority and terminal access trail forward', () => {
  const archive = archiveCompletedCase(EMPTY_INVESTIGATION_ARCHIVE, {
    caseId: 'case011',
    caseTitle: 'The Rotation Ledger',
    closedAt: '2026-11-01T00:00:00.000Z',
    selectedSuspectId: 'sable',
    selectedMotiveId: 'scheduled',
    inspectedClues: ['C-4 release warrant', 'Duty rotation snapshot', 'Shared-terminal session', 'Audit export'],
    askedQuestions: ['Sable: roster'],
    unansweredQuestions: [],
  });
  const carryover = getCase012Carryover(archive);
  assert.equal(carryover.priorFiles.length, 1);
  assert.equal(carryover.priorFiles[0]?.caseId, 'case011');
  assert.equal(carryover.clueCount, 4);
  assert.equal(carryover.accessTrailFiles, 1);
});
