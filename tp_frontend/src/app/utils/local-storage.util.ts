export function isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__local_storage_test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
  