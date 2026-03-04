import { useState } from "react";

const Index = () => {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setLoading(false);
      setResult("🎉 Feature coming soon!");
    }, 2500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-lg space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            🎙️ Podcast Generator
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter a topic and let the magic happen
          </p>
        </div>

        <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-sm border border-border space-y-5">
          <div>
            <label htmlFor="topic" className="block text-sm font-semibold text-foreground mb-2">
              Topic
            </label>
            <input
              id="topic"
              type="text"
              placeholder="Type podcast topic here..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              className="w-full rounded-xl border border-border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !topic.trim()}
            className="w-full rounded-xl bg-generate py-3 font-bold text-generate-foreground hover:bg-generate-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base"
          >
            🔊 Generate Podcast
          </button>

          <div className="rounded-xl bg-player p-6 min-h-[80px] flex items-center justify-center">
            {loading ? (
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-dot-1 dot-bounce-1" />
                <span className="w-3 h-3 rounded-full bg-dot-2 dot-bounce-2" />
                <span className="w-3 h-3 rounded-full bg-dot-3 dot-bounce-3" />
              </div>
            ) : result ? (
              <p className="text-foreground font-semibold text-lg animate-fade-in">{result}</p>
            ) : (
              <p className="text-muted-foreground text-sm">🎧 Podcast will appear here</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
