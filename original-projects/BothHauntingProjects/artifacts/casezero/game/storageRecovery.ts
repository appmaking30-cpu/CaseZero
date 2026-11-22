export type StorageReader = {
  getItem(key: string): Promise<string | null>;
};

export type StorageReadResult = {
  key: string;
  value: string | null;
  failed: boolean;
};

/**
 * Read independent local-save records without allowing one failed key to discard
 * the other records. Callers can pause writes to keys whose reads failed.
 */
export async function readStorageItemsSafely(
  storage: StorageReader,
  keys: readonly string[],
): Promise<StorageReadResult[]> {
  return Promise.all(
    keys.map(async (key) => {
      try {
        return { key, value: await storage.getItem(key), failed: false };
      } catch {
        return { key, value: null, failed: true };
      }
    }),
  );
}

export type StorageWriter = {
  setItem(key: string, value: string): Promise<void>;
};

/**
 * Convert a rejected local-save write into an explicit result so the app can
 * warn the player instead of silently pretending the progress was persisted.
 */
export async function writeStorageItemSafely(
  storage: StorageWriter,
  key: string,
  value: string,
): Promise<boolean> {
  try {
    await storage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}


/**
 * Validate a persisted JSON record before restoring defaults can be written back.
 * Missing keys are normal on a fresh install; present keys must contain an object
 * with the arrays required by that record's current schema.
 */
export function isValidStoredJsonRecord(
  raw: string | null,
  requiredArrayFields: readonly string[] = [],
  expectedVersion?: number,
): boolean {
  if (raw === null) return true;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) return false;
    const record = parsed as Record<string, unknown>;
    if (expectedVersion !== undefined && record.version !== expectedVersion) return false;
    return requiredArrayFields.every((field) => Array.isArray(record[field]));
  } catch {
    return false;
  }
}
