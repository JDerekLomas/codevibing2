"use client";

import { useState, useEffect } from "react";

function WaitlistForm({ variant = "default" }: { variant?: "default" | "minimal" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong");
      } else {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  }

  if (status === "success") {
    return (
      <p className="font-[family-name:var(--font-crimson)] italic text-xl text-emerald-300">
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${variant === "minimal" ? "max-w-sm" : "max-w-md"}`}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email"
        required
        className="flex-1 px-4 py-2.5 bg-transparent border-b-2 border-white/20 text-white placeholder:text-white/20 focus:outline-none focus:border-fuchsia-400 transition-colors font-mono text-sm"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-5 py-2.5 border-2 border-white/20 hover:border-fuchsia-400 hover:text-fuchsia-300 text-white/70 font-mono text-sm transition-all disabled:opacity-50 cursor-pointer"
      >
        {status === "loading" ? "..." : "enter"}
      </button>
      {status === "error" && (
        <p className="absolute mt-12 text-red-400 text-xs font-mono">{message}</p>
      )}
    </form>
  );
}

// Mock "weird things people made" gallery
const GALLERY_ITEMS = [
  { color: "from-fuchsia-600 to-violet-900", label: "recursive soup generator", author: "mika", tag: "cursed" },
  { color: "from-cyan-500 to-emerald-800", label: "AI that only draws hands wrong", author: "jess", tag: "tool" },
  { color: "from-orange-500 to-red-900", label: "feelings-based database", author: "rio", tag: "concept" },
  { color: "from-indigo-500 to-blue-900", label: "website that breathes", author: "sam", tag: "live" },
  { color: "from-pink-500 to-purple-900", label: "chatbot trained on my diary", author: "alex", tag: "unhinged" },
  { color: "from-lime-400 to-teal-800", label: "procedural bird sounds", author: "kim", tag: "audio" },
  { color: "from-amber-400 to-orange-900", label: "font that changes with the weather", author: "lee", tag: "type" },
  { color: "from-violet-400 to-fuchsia-900", label: "3D scan of my lunch", author: "pat", tag: "scan" },
];

function GalleryCard({ item, index }: { item: typeof GALLERY_ITEMS[0]; index: number }) {
  return (
    <div
      className="group relative overflow-hidden scanlines cursor-pointer"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`aspect-[4/3] bg-gradient-to-br ${item.color} relative`}>
        {/* Abstract shape inside */}
        <div
          className="absolute inset-4 bg-white/10 animate-morph"
          style={{ animationDelay: `${index * 1000}ms` }}
        />
        <div
          className="absolute inset-8 bg-black/20 animate-morph"
          style={{ animationDelay: `${index * 800 + 400}ms` }}
        />
      </div>
      <div className="p-3 space-y-1">
        <p className="text-sm font-mono text-white/80 group-hover:text-fuchsia-300 transition-colors leading-snug">
          {item.label}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/30 font-mono">@{item.author}</span>
          <span className="text-[10px] uppercase tracking-widest text-white/20 border border-white/10 px-2 py-0.5">
            {item.tag}
          </span>
        </div>
      </div>
    </div>
  );
}

function Marquee() {
  const text = "CODEVIBING \u00b7 PEOPLE MAKING WEIRD THINGS WITH AI \u00b7 WATCH PEOPLE BUILD \u00b7 SHARE YOUR PROCESS \u00b7 THE VIBE IS THE PRODUCT \u00b7 ";
  return (
    <div className="overflow-hidden border-y border-white/5 py-3">
      <div className="animate-marquee whitespace-nowrap">
        <span className="font-mono text-xs tracking-[0.3em] text-white/15 uppercase">
          {text}{text}
        </span>
      </div>
    </div>
  );
}

function BlobBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-fuchsia-600/8 rounded-full blur-[120px] animate-drift" />
      <div className="absolute top-1/3 -right-32 w-[400px] h-[400px] bg-cyan-500/6 rounded-full blur-[100px] animate-drift delay-700" />
      <div className="absolute -bottom-32 left-1/3 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[140px] animate-drift delay-1500" />
    </div>
  );
}

function GlitchText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 4000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`${glitch ? "animate-glitch" : ""} ${className}`}>
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <BlobBackground />

      {/* Nav — minimal */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <span className="font-mono text-sm tracking-widest uppercase text-white/40">
          codevibing
        </span>
        <a
          href="#join"
          className="font-mono text-xs text-white/30 hover:text-fuchsia-400 transition-colors tracking-wider uppercase"
        >
          join
        </a>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-16 sm:pt-24 pb-20 max-w-7xl mx-auto">
        <div className="max-w-3xl space-y-8">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-[family-name:var(--font-crimson)] font-bold leading-[0.95] tracking-tight">
            <GlitchText>
              <span className="text-white/90">people</span>
              <br />
              <span className="italic text-fuchsia-400/90">making weird things</span>
              <br />
              <span className="text-white/90">with AI</span>
            </GlitchText>
          </h1>
          <p className="font-mono text-sm text-white/35 max-w-md leading-relaxed">
            screen recordings of the process. live sessions.
            the moment it clicks. the moment it breaks.
            the things you build at 2am that shouldn&apos;t exist.
          </p>
        </div>
      </section>

      <Marquee />

      {/* Gallery — weird things */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-mono text-xs text-white/20 uppercase tracking-widest mb-2">
              from the feed
            </p>
            <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-crimson)] italic text-white/70">
              things that shouldn&apos;t exist yet
            </h2>
          </div>
          <span className="font-mono text-xs text-white/15 hidden sm:block">
            coming soon
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {GALLERY_ITEMS.map((item, i) => (
            <GalleryCard key={i} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <div className="border-l-2 border-fuchsia-500/30 pl-8 py-4 max-w-2xl">
          <p className="text-2xl sm:text-3xl font-[family-name:var(--font-crimson)] italic text-white/60 leading-relaxed">
            &ldquo;I built something impossible before lunch and nobody saw it happen&rdquo;
          </p>
          <p className="font-mono text-xs text-white/20 mt-4 tracking-wider">
            &mdash; literally everyone right now
          </p>
        </div>
      </section>

      <Marquee />

      {/* What this is */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { n: "01", title: "record", desc: "screen capture your AI sessions. the prompts, the fails, the magic." },
            { n: "02", title: "stream", desc: "go live while you build. let people watch the vibe in real-time." },
            { n: "03", title: "share", desc: "post the weird things you made. demos, screenshots, broken prototypes." },
            { n: "04", title: "lurk", desc: "watch other people build. steal ideas. get inspired. repeat." },
          ].map((item) => (
            <div key={item.n} className="space-y-3">
              <span className="font-mono text-xs text-fuchsia-500/50">{item.n}</span>
              <h3 className="text-xl font-[family-name:var(--font-crimson)] italic text-white/80">
                {item.title}
              </h3>
              <p className="font-mono text-xs text-white/30 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section id="join" className="px-6 py-24 max-w-7xl mx-auto">
        <div className="max-w-lg space-y-6">
          <h2 className="text-3xl sm:text-4xl font-[family-name:var(--font-crimson)] font-bold">
            <span className="italic text-fuchsia-400/80">get in early</span>
          </h2>
          <p className="font-mono text-xs text-white/30 leading-relaxed">
            we&apos;re building this right now. with AI, obviously.
            <br />
            join the waitlist. be first to share your weird creations.
          </p>
          <WaitlistForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/5 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono text-[10px] text-white/15 uppercase tracking-widest">
          <span>codevibing</span>
          <span>built with AI, naturally</span>
        </div>
      </footer>
    </div>
  );
}
