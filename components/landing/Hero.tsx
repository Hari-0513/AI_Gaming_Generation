"use client";

import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden px-6">
      
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">

        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
          <Sparkles size={16} />
          AI Powered Game Generation Platform
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-bold leading-tight md:text-7xl">
          Create Amazing
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-fuchsia-500 bg-clip-text text-transparent">
            AI Generated Games
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Turn your imagination into playable games.
          Simply describe your idea, and let AI generate mechanics,
          assets, levels, and gameplay in minutes.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

          <button className="flex items-center gap-2 rounded-xl bg-purple-600 px-7 py-3 font-semibold text-white transition duration-300 hover:scale-105 hover:bg-purple-700">
            Start Building
            <ArrowRight size={18} />
          </button>

          <button className="rounded-xl border border-border px-7 py-3 font-semibold transition hover:bg-white/5">
            Learn More
          </button>

        </div>

      </div>
    </section>
  );
}