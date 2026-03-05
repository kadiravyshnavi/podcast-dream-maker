export interface PodcastEntry {
  id: string;
  topic: string;
  duration: string;
  script: string | null;
  createdAt: string;
  // Note: blob URLs don't persist across sessions, so audio won't be replayable after refresh
  audioUrl: string | null;
}

const STORAGE_KEY = "podcast_history";

export function getHistory(): PodcastEntry[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function addToHistory(entry: PodcastEntry) {
  const history = getHistory();
  history.unshift(entry);
  // Keep last 50
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 50)));
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}
