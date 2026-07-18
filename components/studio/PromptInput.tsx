"use client";

import { Paperclip, Mic, WandSparkles } from "lucide-react";

interface Props {
  prompt: string;
  setPrompt: (value: string) => void;
}

export default function PromptInput({
  prompt,
  setPrompt,
}: Props) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6">

      <label className="mb-4 block text-lg font-semibold">
        Describe Your Game
      </label>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={8}
        className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 p-5 outline-none"
        placeholder="Describe your game..."
      />

      <div className="mt-5 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <button className="rounded-xl border border-white/10 p-3">
            <Paperclip size={18} />
          </button>

          <button className="rounded-xl border border-white/10 p-3">
            <Mic size={18} />
          </button>

          <span className="text-sm text-muted-foreground">
            {prompt.length}/1000
          </span>

        </div>

        <button
          disabled={!prompt.trim()}
          className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 transition disabled:cursor-not-allowed disabled:opacity-50"
        >
          <WandSparkles size={18} />
          Generate Game
        </button>

      </div>

    </section>
  );
}