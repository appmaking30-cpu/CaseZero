import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CASE_064_GAME, getCase064Carryover, isCase064DeductionCorrect, isCase064TimelineCorrect } from '../../artifacts/casezero/game/case064Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 064 contains five distinct custody records and three witnesses', () => {
  assert.equal(CASE_064_GAME.clues.length, 5);
  assert.equal(new Set(CASE_064_GAME.clues.map((item) => item.id)).size, 5);
  assert.equal(CASE_064_GAME.witnesses.length, 3);
  assert.ok(CASE_064_GAME.witnesses.every((witness) => witness.questions.length === 2));
});

test('Case 064 chronology runs from accession through witnessed retrieval authorization', () => {
  assert.equal(CASE_064_GAME.timelineEvents.length, 6);
  assert.equal(isCase064TimelineCorrect(CASE_064_GAME.correctOrder), true);
  assert.equal(isCase064TimelineCorrect([...CASE_064_GAME.correctOrder].reverse()), false);
});

test('Case 064 deduction identifies the last corroborated tray without naming a carrier', () => {
  assert.equal(isCase064DeductionCorrect('tray', 'gap'), true);
  assert.equal(isCase064DeductionCorrect('tomas', 'gap'), false);
  assert.equal(isCase064DeductionCorrect('tray', 'carrier'), false);
  assert.equal(isCase064DeductionCorrect('tray', 'breach'), false);
});

test('Case 064 preserves the earlier recorder and North Annex investigation memory', () => {
  const archive = archiveCompletedCase(EMPTY_INVESTIGATION_ARCHIVE, {
    caseId: 'case063', caseTitle: 'The North Annex Cross-Index', closedAt: '2026-11-04T10:00:00.000Z',
    selectedSuspectId: 'event', selectedMotiveId: 'window',
    inspectedClues: ['Signed North Annex hardware baseline'], askedQuestions: [], unansweredQuestions: [],
  });
  const memory = getCase064Carryover(archive);
  assert.equal(memory.priorFiles.length, 1);
  assert.equal(memory.clueCount, 1);
  assert.equal(memory.routeFiles, 1);
});
