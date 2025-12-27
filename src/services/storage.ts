export function safeJsonParse<T>(raw: string | null): T | undefined {
  if (!raw) return undefined;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return undefined;
  }
}

export function loadFromStorage<T>(key: string, fallback: T): T {
  const parsed = safeJsonParse<T>(localStorage.getItem(key));
  return parsed ?? fallback;
}

export function saveToStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

