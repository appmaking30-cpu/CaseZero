import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  CASE_007_GAME,
  getCase007Carryover,
  isCase007DeductionCorrect,
  isCase007TimelineCorrect,
} from '../../artifacts/casezero/game/case007Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 007 has four distinct records and three interview witnesses', () => {
  assert.equal(CASE_007_GAME.clues.length, 4);
  assert.equal(new Set(CASE_007_GAME.clues.map((clue) => clue.id)).size, 4);
  assert.equal(CASE_007_GAME.witnesses.length, 3);
  assert.ok(CASE_007_GAME.witnesses.every((witness) => witness.questions.length === 2));
});

test('Case 007 timeline accepts only the documented chronological sequence', () => {
  assert.equal(isCase007TimelineCorrect(['receipt', 'circuit', 'connection', 'correction']), true);
  assert.equal(isCase007TimelineCorrect(['correction', 'connection', 'circuit', 'receipt']), false);
  assert.equal(isCase007TimelineCorrect(['receipt', 'circuit']), false);
  assert.equal(isCase007TimelineCorrect(['receipt', 'receipt', 'connection', 'correction']), false);
});

test('Case 007 deduction distinguishes physical receipt from upstream authorization', () => {
  assert.equal(isCase007DeductionCorrect('ada', 'receipt'), true);
  assert.equal(isCase007DeductionCorrect('jon', 'receipt'), false);
  assert.equal(isCase007DeductionCorrect('pavel', 'authorize'), false);
  assert.equal(isCase007DeductionCorrect(null, 'receipt'), false);
  assert.equal(isCase007DeductionCorrect('ada', null), false);
});

test('Case 007 receives earlier archived evidence as campaign memory', () => {
  const archive = archiveCompletedCase(EMPTY_INVESTIGATION_ARCHIVE, {
    caseId: 'case006',
    caseTitle: 'The Voice Between Stations',
    closedAt: '2026-11-01T00:00:00.000Z',
    selectedSuspectId: 'dispatch-control',
    selectedMotiveId: 'conceal-authority',
    inspectedClues: ['Fragment A', 'Fragment B', 'Fragment C'],
    askedQuestions: [],
    unansweredQuestions: [],
  });
  const carryover = getCase007Carryover(archive);
  assert.equal(carryover.priorFiles.length, 1);
  assert.equal(carryover.priorFiles[0]?.caseId, 'case006');
  assert.equal(carryover.clueCount, 3);
});
