import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { addToHistory } from "@/lib/podcastHistory";
import { Progress } from "@/components/ui/progress";
import { Twitter, Facebook, Linkedin, Link as LinkIcon, Check } from "lucide-react";
import ShareButtons from "@/components/ShareButtons";

const LOADING_STEPS = [
  { label: "Generating Script...", icon: "📝" },
  { label: "Converting to Audio...", icon: "🔊" },
  { label: "Finalizing Podcast...", icon: "✨" },
];

const DURATIONS = [
  { label: "Short", value: "short", desc: "~2 min" },
  { label: "Medium", value: "medium", desc: "~5 min" },
  { label: "Long", value: "long", desc: "~10 min" },
];

const VOICE_STYLES = [
  { label: "Casual", value: "casual", icon: "😎", desc: "Relaxed & friendly" },
  { label: "Professional", value: "professional", icon: "👔", desc: "Formal & polished" },
  { label: "Storytelling", value: "storytelling", icon: "📖", desc: "Narrative & engaging" },
  { label: "Educational", value: "educational", icon: "🎓", desc: "Clear & informative" },
];

const VOICES = [
  { label: "Male", value: "male", icon: "🧑" },
  { label: "Female", value: "female", icon: "👩" },
  { label: "Storytelling", value: "storytelling", icon: "📖" },
  { label: "News Anchor", value: "news-anchor", icon: "📺" },
];

const Index = () => {
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("medium");
  const [voiceStyle, setVoiceStyle] = useState("casual");
  const [voice, setVoice] = useState("male");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [script, setScript] = useState<string | null>(null);
  const [lastTopic, setLastTopic] = useState("");

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setLoadingStep(0);
    const currentTopic = topic;

    // Simulate step progression
    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
    }, 4000);

    try {
      const response = await fetch(
        "https://vyshnavikadira666.app.n8n.cloud/webhook-test/9d1a248d-0713-4ef7-b916-14f5efb02ab9",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: currentTopic, duration, voiceStyle, voice }),
        }
      );
      if (!response.ok) throw new Error("Request failed");
      const contentType = response.headers.get("content-type") || "";
      let newAudioUrl: string | null = null;
      let newScript: string | null = null;

      if (contentType.includes("application/json")) {
        const data = await response.json();
        newAudioUrl = data.audioFile || data.audioUrl || null;
        newScript = data.script || data.transcript || data.text || null;
      } else {
        const blob = await response.blob();
        newAudioUrl = URL.createObjectURL(blob);
      }

      setAudioUrl(newAudioUrl);
      setScript(newScript);
      setResult("🎧 Podcast is ready! Click play to listen");
      setLastTopic(currentTopic);
      setTopic("");

      addToHistory({
        id: crypto.randomUUID(),
        topic: currentTopic,
        duration: DURATIONS.find((d) => d.value === duration)?.label || duration,
        script: newScript,
        audioUrl: newAudioUrl,
        createdAt: new Date().toISOString(),
      });
    } catch {
      setResult("😔 Oops! Something went wrong. Please try again");
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
    }
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
          {/* Topic input */}
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

          {/* Duration selector */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Podcast Length
            </label>
            <div className="grid grid-cols-3 gap-2">
              {DURATIONS.map((d) => (
                <button
                  key={d.value}
                  onClick={() => setDuration(d.value)}
                  className={`rounded-xl border-2 py-2.5 px-3 text-sm font-semibold transition-all ${
                    duration === d.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-input text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {d.label}
                  <span className="block text-xs font-normal mt-0.5 opacity-70">{d.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Voice style selector */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Voice Style
            </label>
            <div className="grid grid-cols-2 gap-2">
              {VOICE_STYLES.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setVoiceStyle(s.value)}
                  className={`rounded-xl border-2 py-2.5 px-3 text-sm font-semibold transition-all text-left ${
                    voiceStyle === s.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-input text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  <span className="mr-1">{s.icon}</span> {s.label}
                  <span className="block text-xs font-normal mt-0.5 opacity-70">{s.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Voice selector */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Voice
            </label>
            <div className="grid grid-cols-2 gap-2">
              {VOICES.map((v) => (
                <button
                  key={v.value}
                  onClick={() => setVoice(v.value)}
                  className={`rounded-xl border-2 py-2.5 px-3 text-sm font-semibold transition-all flex items-center gap-2 ${
                    voice === v.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-input text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  <span>{v.icon}</span>
                  <span>{v.label}</span>
                </button>
              ))}
            </div>
          </div>
          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={loading || !topic.trim()}
            className="w-full rounded-xl bg-generate py-3 font-bold text-generate-foreground hover:bg-generate-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base"
          >
            🔊 Generate Podcast
          </button>

          {/* Player / Result area */}
          <div className="rounded-xl bg-player p-6 min-h-[80px] flex flex-col items-center justify-center gap-4">
            {loading ? (
              <div className="flex flex-col items-center gap-4 w-full animate-fade-in">
                <div className="w-full space-y-3">
                  {LOADING_STEPS.map((step, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-2 text-sm transition-all duration-300 ${
                        i < loadingStep
                          ? "text-primary opacity-60"
                          : i === loadingStep
                          ? "text-foreground font-semibold"
                          : "text-muted-foreground opacity-40"
                      }`}
                    >
                      <span>{i < loadingStep ? "✅" : step.icon}</span>
                      <span>{step.label}</span>
                    </div>
                  ))}
                </div>
                <Progress
                  value={((loadingStep + 1) / LOADING_STEPS.length) * 100}
                  className="h-2"
                />
                <p className="text-muted-foreground text-xs">This may take a moment...</p>
              </div>
            ) : result ? (
              <>
                <p className="text-foreground font-semibold text-lg animate-fade-in">{result}</p>
                {audioUrl && (
                  <div className="w-full space-y-3">
                    <audio controls src={audioUrl} className="w-full rounded-lg" />
                    <button
                      onClick={async () => {
                        try {
                          const res = await fetch(audioUrl);
                          const blob = await res.blob();
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = "podcast.wav";
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                          URL.revokeObjectURL(url);
                        } catch {
                          window.open(audioUrl, "_blank");
                        }
                      }}
                      className="flex items-center justify-center gap-2 w-full rounded-xl bg-secondary py-2.5 font-semibold text-secondary-foreground hover:bg-secondary/80 transition-colors text-sm"
                    >
                      ⬇️ Download Podcast
                    </button>
                    <ShareButtons topic={lastTopic} />
                  </div>
                )}
              </>
            ) : (
              <p className="text-muted-foreground text-sm">🎧 Podcast will appear here</p>
            )}
          </div>

          {/* Script display */}
          {script && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground">📜 Generated Script</h3>
              <div className="rounded-xl bg-muted p-4 text-sm text-foreground whitespace-pre-wrap max-h-64 overflow-y-auto leading-relaxed">
                {script}
              </div>
            </div>
          )}
        </div>

        {/* History link */}
        <div className="text-center">
          <Link
            to="/history"
            className="text-primary font-semibold text-sm hover:underline transition-colors"
          >
            📚 View Podcast History →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
