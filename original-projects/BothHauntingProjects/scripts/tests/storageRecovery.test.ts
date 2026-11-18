import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readStorageItemsSafely } from '../../artifacts/casezero/game/storageRecovery';

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
