import assert from 'node:assert/strict';
import { test } from 'node:test';
import { getBureauSpecialistInsight } from '../../artifacts/casezero/game/bureauTeam';

test('dispatch specialist insights stay hidden until their evidence gate is met', () => {
  assert.equal(getBureauSpecialistInsight('inez', 'case028', ['visitor', 'badge', 'purpose']), null);
  assert.equal(getBureauSpecialistInsight('tomas', 'case029', [], ['mara:assignment']), null);
  assert.equal(getBureauSpecialistInsight('rhea', 'case030', ['radio', 'occupancy', 'door']), null);
});

test('Inez cross-checks reception presence without overstating terminal access', () => {
  const insight = getBureauSpecialistInsight('inez', 'case028', ['visitor', 'badge', 'purpose', 'exit']);
  assert.ok(insight);
  assert.match(insight.detail, /reception/);
  assert.match(insight.detail, /connects him to terminal D-3/);
});

test('Tomas compares escort statements only after both relevant answers', () => {
  const insight = getBureauSpecialistInsight('tomas', 'case029', [], ['mara:assignment', 'sana:limit']);
  assert.ok(insight);
  assert.match(insight.detail, /as a completed journey/);
});

test('Rhea reconstructs the Case 030 room event without naming the occupant', () => {
  const insight = getBureauSpecialistInsight('rhea', 'case030', ['radio', 'occupancy', 'door', 'clock']);
  assert.ok(insight);
  assert.match(insight.detail, /do not establish who crossed the threshold/);
});

test('senior review perk is shown only at senior rank', () => {
  const trainee = getBureauSpecialistInsight('inez', 'case028', ['visitor', 'badge', 'purpose', 'exit'], [], 0);
  const senior = getBureauSpecialistInsight('inez', 'case028', ['visitor', 'badge', 'purpose', 'exit'], [], 2);
  assert.equal(trainee?.rankPerk, null);
  assert.match(senior?.rankPerk ?? '', /Senior review/);
});
