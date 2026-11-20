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
