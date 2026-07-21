import type { Answers } from "./types";

const STORAGE_KEY = "bqc_diagnosis_answers_v1";

/** Bumped on every write so consumers (e.g. useSyncExternalStore) know to re-read. */
let storageVersion = 0;

export function getStorageVersion(): number {
  return storageVersion;
}

export function saveAnswers(answers: Answers): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  storageVersion += 1;
}

export function loadAnswers(): Answers | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Answers;
  } catch {
    return null;
  }
}

export function clearAnswers(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  storageVersion += 1;
}
