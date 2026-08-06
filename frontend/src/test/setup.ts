// Setup in-memory mock for localStorage in Vitest Node environment
if (typeof window === 'undefined' || !global.localStorage) {
  const storage: Record<string, string> = {};
  const localStorageMock = {
    getItem: (key: string) => storage[key] || null,
    setItem: (key: string, value: string) => {
      storage[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete storage[key];
    },
    clear: () => {
      Object.keys(storage).forEach((key) => delete storage[key]);
    },
    length: 0,
    key: (index: number) => Object.keys(storage)[index] || null,
  };

  if (typeof global !== 'undefined') {
    (global as any).localStorage = localStorageMock;
  }
}
