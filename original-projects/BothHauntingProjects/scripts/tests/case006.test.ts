import assert from 'node:assert/strict';
import test from 'node:test';
import {
  CASE_006_EMPTY_PROGRESS,
  CASE_006_GAME,
  isCase006OrderCorrect,
  isCase006SourceCorrect,
} from '../../artifacts/casezero/game/case006Game';

test('Case 006 contains three distinct, time-stamped transcript fragments', () => {
  assert.equal(CASE_006_GAME.fragments.length, 3);
  assert.equal(new Set(CASE_006_GAME.fragments.map((fragment) => fragment.id)).size, 3);
  assert.equal(CASE_006_GAME.sources.length, 3);
  assert.ok(CASE_006_GAME.truth.length > 80);
  assert.ok(CASE_006_GAME.proof.length > 100);
  assert.ok(CASE_006_GAME.outcome.length > 60);
});

test('Case 006 sequence matches the fragment timestamps and can be retried', () => {
  const chronologicalIds = [...CASE_006_GAME.fragments]
    .sort((left, right) => left.time.localeCompare(right.time))
    .map((fragment) => fragment.id);

  assert.deepEqual(CASE_006_GAME.correctOrder, chronologicalIds);
  assert.equal(isCase006OrderCorrect(chronologicalIds), true);
  assert.equal(isCase006OrderCorrect([...chronologicalIds].reverse()), false);
  assert.equal(isCase006OrderCorrect(chronologicalIds.slice(0, 2)), false);
});

test('Case 006 attributes the instruction to an upstream authority, not an unsupported person', () => {
  assert.equal(isCase006SourceCorrect('dispatch'), true);
  assert.equal(isCase006SourceCorrect('quill'), false);
  assert.equal(isCase006SourceCorrect('vesper'), false);
  assert.equal(isCase006SourceCorrect(null), false);
  assert.match(CASE_006_GAME.truth, /does not identify the speaker/i);
  assert.match(CASE_006_GAME.proof, /speaker remains unidentified/i);
});

test('Case 006 starts with no fragments, sequence or attribution selected', () => {
  assert.deepEqual(CASE_006_EMPTY_PROGRESS, {
    heardFragments: [],
    order: [],
    selectedSource: null,
    completed: false,
  });
});
