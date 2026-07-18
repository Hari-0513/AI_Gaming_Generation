import { ArrowRight, Bot, Sparkles } from "lucide-react";

export default function QuickActions() {
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-2">

      {/* Create Game */}
      <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-600/20 to-black p-8">

        <Sparkles className="mb-6 h-10 w-10 text-purple-400" />

        <h2 className="text-3xl font-bold">
          Create New Game
        </h2>

        <p className="mt-4 text-muted-foreground">
          Start a new AI-powered game generation session.
        </p>

        <button className="mt-8 flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 transition hover:bg-purple-700">
          Start Now
          <ArrowRight size={18} />
        </button>

      </div>

      {/* AI Status */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

        <Bot className="mb-6 h-10 w-10 text-green-400" />

        <h2 className="text-3xl font-bold">
          AI Status
        </h2>

        <p className="mt-4 text-muted-foreground">
          Frontend Agent is online and connected to the generation workflow.
        </p>

        <div className="mt-8 flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-green-500" />

          <span className="font-medium text-green-400">
            Operational
          </span>
        </div>

      </div>

    </div>
  );
}