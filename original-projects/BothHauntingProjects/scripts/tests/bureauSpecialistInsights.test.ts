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

test('Case 031 specialists separate shared-profile activity from human identity', () => {
  const analyst = getBureauSpecialistInsight('inez', 'case031', ['session', 'policy', 'export', 'request']);
  const interviewer = getBureauSpecialistInsight('tomas', 'case031', [], ['mara:handover', 'sana:limit']);
  const field = getBureauSpecialistInsight('rhea', 'case031', ['occupancy', 'session', 'export']);
  assert.match(analyst?.detail ?? '', /not a named operator/);
  assert.match(interviewer?.detail ?? '', /no contemporaneous record names the operator/);
  assert.match(field?.detail ?? '', /do not identify who was there/);
});
