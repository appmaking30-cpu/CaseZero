'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
require('../game.js');
const E = globalThis.CaseZeroEngine;

test('the four authored case files have unique identifiers', () => {
  assert.equal(E.CASES.length, 4);
  assert.equal(new Set(E.CASES.map(c => c.id)).size, 4);
});
test('each case has five clues and three witness questions', () => {
  for (const c of E.CASES) {
    assert.equal(c.clues.length, 5, c.id);
    assert.equal(c.witnesses.length, 3, c.id);
  }
});
test('each case has four timeline events in a complete sequence', () => {
  for (const c of E.CASES) {
    assert.equal(c.events.length, 4, c.id);
    assert.equal(c.sequence.length, 4, c.id);
    assert.deepEqual(new Set(c.sequence), new Set(c.events.map(e => e[0])));
  }
});
test('each answer is a listed suspect', () => {
  for (const c of E.CASES) assert.ok(c.suspects.some(s => s[0] === c.answer), c.id);
});
test('all proof and full-evidence requirements reference real clues', () => {
  for (const c of E.CASES) {
    const ids = new Set(c.clues.map(clue => clue[0]));
    for (const id of [...c.proof, ...c.full]) assert.ok(ids.has(id), c.id + ':' + id);
  }
});
test('timeline validation accepts the authored order and rejects a reversed order', () => {
  for (const c of E.CASES) {
    assert.equal(E.sequenceIsCorrect(c.sequence, c.sequence), true, c.id);
    assert.equal(E.sequenceIsCorrect([...c.sequence].reverse(), c.sequence), false, c.id);
  }
});
test('case unlocks are sequential', () => {
  assert.equal(E.caseUnlocked(0, []), true);
  assert.equal(E.caseUnlocked(1, []), false);
  assert.equal(E.caseUnlocked(1, ['case001']), true);
  assert.equal(E.caseUnlocked(2, ['case001']), false);
  assert.equal(E.caseUnlocked(2, ['case001', 'case002']), true);
});
test('a correct theory can still have incomplete proof', () => {
  for (const c of E.CASES) {
    const result = E.scoreCase(c, { ending: c.answer, found: c.proof, timeline: c.sequence });
    assert.equal(result.correct, true, c.id);
    assert.equal(result.proof, true, c.id);
    assert.equal(result.complete, false, c.id);
    assert.equal(result.timeline, true, c.id);
  }
});
test('a wrong theory is not marked correct', () => {
  for (const c of E.CASES) {
    const wrong = c.suspects.find(s => s[0] !== c.answer)[0];
    const result = E.scoreCase(c, { ending: wrong, found: c.full, timeline: c.sequence });
    assert.equal(result.correct, false, c.id);
    assert.equal(result.complete, true, c.id);
  }
});
test('an incomplete or out-of-order timeline does not pass', () => {
  for (const c of E.CASES) {
    const result = E.scoreCase(c, { ending: c.answer, found: c.full, timeline: [...c.sequence].reverse() });
    assert.equal(result.timeline, false, c.id);
  }
});
