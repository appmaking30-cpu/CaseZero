import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  CASE_001,
  isDeductionCorrect,
  isTimelineCorrect,
} from '../../artifacts/casezero/game/case001';

test('Case 001 has a complete, distinct evidence and witness set', () => {
  assert.equal(CASE_001.clues.length, 5);
  assert.equal(new Set(CASE_001.clues.map((clue) => clue.id)).size, 5);
  assert.equal(CASE_001.witnesses.length, 3);
  assert.ok(CASE_001.witnesses.every((witness) => witness.questions.length === 2));
});

test('timeline accepts the evidence-backed chronological order only', () => {
  assert.equal(
    isTimelineCorrect(['key', 'cart', 'receipt', 'inventory']),
    true,
  );
  assert.equal(
    isTimelineCorrect(['inventory', 'receipt', 'cart', 'key']),
    false,
  );
  assert.equal(isTimelineCorrect(['key', 'cart']), false);
});

test('deduction requires both the correct person and motive', () => {
  assert.equal(isDeductionCorrect('miles', 'protect'), true);
  assert.equal(isDeductionCorrect('miles', 'steal'), false);
  assert.equal(isDeductionCorrect('ada', 'protect'), false);
  assert.equal(isDeductionCorrect(null, 'protect'), false);
});

test('the case review separates truth, proof and outcome', () => {
  assert.ok(CASE_001.truth.length > 40);
  assert.ok(CASE_001.proof.length > 80);
  assert.ok(CASE_001.outcome.length > 40);
});

test('the protective motive is supported by a dated, signed record', () => {
  const leakClue = CASE_001.clues.find((clue) => clue.id === 'leak');
  assert.ok(leakClue);
  assert.match(leakClue.detail, /21:05/);
  assert.match(leakClue.detail, /21:11/);
  assert.ok(leakClue.detail.includes('M.R.'));
  assert.match(leakClue.detail, /keep it dry/i);
  assert.match(CASE_001.proof, /maintenance ticket/i);
});
