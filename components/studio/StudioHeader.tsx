import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function StudioHeader() {
  return (
    <header className="mb-10 flex items-center justify-between">

      <div>
        <Link
          href="/dashboard"
          className="mb-5 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <div className="flex items-center gap-3">
          <Sparkles className="h-8 w-8 text-purple-400" />

          <h1 className="text-5xl font-bold">
            AI Studio
          </h1>
        </div>

        <p className="mt-4 max-w-2xl text-muted-foreground">
          Describe your dream game in natural language.
          Our AI will analyze your idea and generate a playable game.
        </p>
      </div>

      <div className="rounded-2xl border border-green-500/20 bg-green-500/10 px-5 py-3">
        <p className="font-medium text-green-400">
          ● AI Online
        </p>
      </div>

    </header>
  );
}