"use client";

const sessions = [
  {
    slug: "morniplus",
    title: "Garden of Eden",
    subtitle: "Fashion Archaeology",
    thumbnail: "/morniplus/col-mesopotamian.png",
    date: "Dec 9, 2025",
    duration: "1:44",
    tool: "Claude Code",
    prompts: 19,
  },
  {
    slug: "dereklomas",
    title: "dereklomas.me",
    subtitle: "Portfolio Site",
    thumbnail: "/dereklomas/headshot.png",
    date: "Jan 25, 2026",
    duration: "1:46",
    tool: "Claude Code",
    prompts: 22,
  },
  {
    slug: "designtherapy",
    title: "Design Therapy",
    subtitle: "Therapy Practice Website",
    thumbnail: "/designtherapy/about-therapist.png",
    date: "Jan 2026",
    duration: "1:22",
    tool: "Claude Code",
    prompts: 15,
  },
  {
    slug: "alchemy",
    title: "Alchemy Deck",
    subtitle: "Oracle Cards from Ancient Texts",
    thumbnail: "/alchemy/stage-01.png",
    date: "Jan 2026",
    duration: "1:34",
    tool: "Claude Code",
    prompts: 20,
  },
  {
    slug: "futures",
    title: "Futures Deck",
    subtitle: "Speculative Futures Cards",
    thumbnail: "/futures/arc-01.png",
    date: "Jan 2026",
    duration: "1:36",
    tool: "Claude Code",
    prompts: 20,
  },
  {
    slug: "therapycards",
    title: "Reframing Relationships",
    subtitle: "MFT Therapy Card Deck",
    thumbnail: "/therapycards/pattern-01.png",
    date: "Jan 2026",
    duration: "1:33",
    tool: "Claude Code",
    prompts: 18,
  },
];

export default function SessionsPage() {
  return (
    <div className="min-h-screen bg-[#08080c]">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-sm font-bold text-white">
            cv
          </div>
          <span className="font-semibold text-lg tracking-tight text-white">
            codevibing
          </span>
        </a>
        <span className="text-sm text-white/40">sessions</span>
      </nav>

      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-8">
        <h1 className="text-4xl font-bold tracking-tight text-white/90 mb-2">
          Sessions
        </h1>
        <p className="text-white/40 text-lg">
          Watch projects get built with AI. Real prompts, real process.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session) => (
            <a
              key={session.slug}
              href={`/sessions/${session.slug}.html`}
              className="group block rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden hover:border-violet-500/30 transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={session.thumbnail}
                  alt={session.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Play icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg
                      width="20"
                      height="24"
                      viewBox="0 0 20 24"
                      fill="white"
                    >
                      <polygon points="0,0 20,12 0,24" />
                    </svg>
                  </div>
                </div>

                {/* Duration badge */}
                <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/60 text-white/80 text-xs font-mono">
                  {session.duration}
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white/90 mb-1">
                  {session.title}
                </h3>
                <p className="text-sm text-white/40 mb-3">
                  {session.subtitle}
                </p>
                <div className="flex items-center gap-3 text-xs text-white/30">
                  <span className="px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400">
                    {session.tool}
                  </span>
                  <span>{session.prompts} prompts</span>
                  <span>{session.date}</span>
                </div>
              </div>
            </a>
          ))}

          {/* Coming soon placeholder */}
          <div className="rounded-xl border border-dashed border-white/[0.08] bg-white/[0.01] flex items-center justify-center aspect-[4/3] text-white/20 text-sm">
            more sessions coming
          </div>
        </div>
      </div>
    </div>
  );
}
