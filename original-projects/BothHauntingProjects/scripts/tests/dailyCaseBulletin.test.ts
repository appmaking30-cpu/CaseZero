import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  DAILY_BULLETIN_CASES,
  getDailyCaseForDate,
  isDailyCaseSolutionCorrect,
  restoreDailyBulletinProgress,
} from '../../artifacts/casezero/game/dailyCaseBulletin';

test('daily bulletin rotation is deterministic for a local calendar key', () => {
  for (const dateKey of ['2026-11-06', '2026-11-07', '2027-01-01']) {
    assert.equal(getDailyCaseForDate(dateKey).id, getDailyCaseForDate(dateKey).id);
  }
  assert.ok(DAILY_BULLETIN_CASES.length >= 7);
});

test('daily bulletin requires both the correct suspect and motive', () => {
  for (const dailyCase of DAILY_BULLETIN_CASES) {
    assert.equal(isDailyCaseSolutionCorrect(dailyCase, dailyCase.correctSuspectId, dailyCase.correctMotiveId), true);
    assert.equal(isDailyCaseSolutionCorrect(dailyCase, dailyCase.correctSuspectId, null), false);
    assert.equal(isDailyCaseSolutionCorrect(dailyCase, null, dailyCase.correctMotiveId), false);
    assert.equal(isDailyCaseSolutionCorrect(dailyCase, 'not-a-suspect', dailyCase.correctMotiveId), false);
  }
});

test('restore filters unknown clue and choice identifiers from device storage', () => {
  const dailyCase = DAILY_BULLETIN_CASES[0];
  const restored = restoreDailyBulletinProgress(dailyCase, {
    inspectedClues: [dailyCase.clues[0].id, 'injected-clue', dailyCase.clues[0].id, 42],
    selectedSuspect: 'injected-suspect',
    selectedMotive: dailyCase.correctMotiveId,
    completed: true,
    phase: 'review',
  });
  assert.deepEqual(restored.inspectedClues, [dailyCase.clues[0].id]);
  assert.equal(restored.selectedSuspect, null);
  assert.equal(restored.selectedMotive, dailyCase.correctMotiveId);
  assert.equal(restored.completed, false);
  assert.equal(restored.phase, 'evidence');
});

test('a forged completed flag cannot skip evidence or the correct deduction', () => {
  const dailyCase = DAILY_BULLETIN_CASES[0];
  const forged = restoreDailyBulletinProgress(dailyCase, {
    inspectedClues: dailyCase.clues.map((clue) => clue.id),
    selectedSuspect: dailyCase.suspects[0].id,
    selectedMotive: dailyCase.motives[0].id,
    completed: true,
    phase: 'review',
  });
  assert.equal(forged.completed, false);
  assert.equal(forged.phase, 'evidence');

  const valid = restoreDailyBulletinProgress(dailyCase, {
    inspectedClues: dailyCase.clues.map((clue) => clue.id),
    selectedSuspect: dailyCase.correctSuspectId,
    selectedMotive: dailyCase.correctMotiveId,
    completed: true,
    phase: 'review',
  });
  assert.equal(valid.completed, true);
  assert.equal(valid.phase, 'review');
});

test('deduction phase is restored only after every valid clue is logged', () => {
  const dailyCase = DAILY_BULLETIN_CASES[0];
  const incomplete = restoreDailyBulletinProgress(dailyCase, {
    inspectedClues: [dailyCase.clues[0].id],
    phase: 'deduction',
  });
  assert.equal(incomplete.phase, 'evidence');
  const ready = restoreDailyBulletinProgress(dailyCase, {
    inspectedClues: dailyCase.clues.map((clue) => clue.id),
    phase: 'deduction',
  });
  assert.equal(ready.phase, 'deduction');
});
