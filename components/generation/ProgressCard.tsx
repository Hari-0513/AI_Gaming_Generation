"use client";

export default function ProgressCard() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-8">

      <h1 className="text-4xl font-bold">
        ⚡ Generating Your Game
      </h1>

      <p className="mt-3 text-muted-foreground">
        Please wait while our AI creates your game.
      </p>

      <div className="mt-8 h-4 overflow-hidden rounded-full bg-white/10">

        <div className="h-full w-[65%] rounded-full bg-purple-600 transition-all duration-1000" />

      </div>

      <div className="mt-3 flex justify-between text-sm text-muted-foreground">
        <span>Progress</span>
        <span>65%</span>
      </div>

    </section>
  );
}