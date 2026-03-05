import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getHistory, clearHistory, type PodcastEntry } from "@/lib/podcastHistory";

const History = () => {
  const [entries, setEntries] = useState<PodcastEntry[]>([]);

  useEffect(() => {
    setEntries(getHistory());
  }, []);

  const handleClear = () => {
    clearHistory();
    setEntries([]);
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-background px-4 py-12">
      <div className="w-full max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground">📚 Podcast History</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {entries.length} podcast{entries.length !== 1 ? "s" : ""} generated
            </p>
          </div>
          <div className="flex gap-2">
            {entries.length > 0 && (
              <button
                onClick={handleClear}
                className="rounded-xl bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground hover:bg-destructive/80 transition-colors"
              >
                🗑️ Clear All
              </button>
            )}
            <Link
              to="/"
              className="rounded-xl bg-generate px-4 py-2 text-sm font-semibold text-generate-foreground hover:bg-generate-hover transition-colors"
            >
              ➕ New Podcast
            </Link>
          </div>
        </div>

        {entries.length === 0 ? (
          <div className="bg-card rounded-2xl p-12 border border-border text-center">
            <p className="text-muted-foreground text-lg">No podcasts yet. Generate your first one!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-card rounded-2xl p-5 border border-border space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-foreground text-lg">🎙️ {entry.topic}</h3>
                    <div className="flex gap-3 mt-1">
                      <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full font-medium">
                        {entry.duration}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(entry.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {entry.script && (
                  <details className="group">
                    <summary className="cursor-pointer text-sm font-semibold text-primary hover:underline">
                      📜 View Script
                    </summary>
                    <div className="mt-2 rounded-xl bg-muted p-4 text-sm text-foreground whitespace-pre-wrap max-h-60 overflow-y-auto">
                      {entry.script}
                    </div>
                  </details>
                )}

                {entry.audioUrl && (
                  <audio controls src={entry.audioUrl} className="w-full rounded-lg" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
