import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isValidStoredJsonRecord, readStorageItemsSafely, writeStorageItemSafely } from '../../artifacts/casezero/game/storageRecovery';

test('a failed local-save read does not discard other stored records', async () => {
  const values = new Map<string, string>([
    ['case001', '{"phase":"timeline"}'],
    ['archive', '{"version":1,"completedCases":[]}'],
  ]);
  const storage = {
    getItem: async (key: string) => {
      if (key === 'case002') throw new Error('simulated storage read failure');
      return values.get(key) ?? null;
    },
  };

  const results = await readStorageItemsSafely(storage, ['case001', 'case002', 'archive']);

  assert.deepEqual(results, [
    { key: 'case001', value: '{"phase":"timeline"}', failed: false },
    { key: 'case002', value: null, failed: true },
    { key: 'archive', value: '{"version":1,"completedCases":[]}', failed: false },
  ]);
});

test('missing local-save keys are normal empty reads, not failures', async () => {
  const results = await readStorageItemsSafely(
    { getItem: async () => null },
    ['case001', 'archive'],
  );

  assert.deepEqual(results, [
    { key: 'case001', value: null, failed: false },
    { key: 'archive', value: null, failed: false },
  ]);
});

test('an empty storage key list resolves without touching storage', async () => {
  const results = await readStorageItemsSafely(
    { getItem: async () => { throw new Error('must not be called'); } },
    [],
  );

  assert.deepEqual(results, []);
});

test('a failed local-save write is reported without throwing', async () => {
  const saved = await writeStorageItemSafely(
    { setItem: async () => { throw new Error('simulated storage write failure'); } },
    'case001',
    '{"phase":"deduction"}',
  );

  assert.equal(saved, false);
});

test('a successful local-save write confirms the exact key and value', async () => {
  const values = new Map<string, string>();
  const saved = await writeStorageItemSafely(
    { setItem: async (key: string, value: string) => { values.set(key, value); } },
    'case001',
    '{"phase":"deduction"}',
  );

  assert.equal(saved, true);
  assert.equal(values.get('case001'), '{"phase":"deduction"}');
});


test('a missing save key is valid before the first save', () => {
  assert.equal(isValidStoredJsonRecord(null, ['cluesFound', 'askedQuestions']), true);
});

test('a valid save record must contain the expected arrays and version', () => {
  assert.equal(
    isValidStoredJsonRecord(
      '{"version":1,"assignments":[],"experienceBySpecialist":{}}',
      ['assignments'],
      1,
    ),
    true,
  );
});

test('malformed JSON and non-object JSON records are rejected', () => {
  for (const raw of ['{"cluesFound":', '', 'null', '[]', '"progress"', '4', 'false']) {
    assert.equal(isValidStoredJsonRecord(raw), false, `expected invalid record: ${raw}`);
  }
});

test('a record with missing required arrays or an unsupported version is rejected', () => {
  assert.equal(isValidStoredJsonRecord('{"cluesFound":[]}', ['cluesFound', 'askedQuestions']), false);
  assert.equal(isValidStoredJsonRecord('{"version":2,"assignments":[]}', ['assignments'], 1), false);
});
