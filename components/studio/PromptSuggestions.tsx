"use client";

import {
  Gamepad2,
  Car,
  Puzzle,
  Rocket,
  Ghost,
  Swords,
} from "lucide-react";

const prompts = [
  "Create a 2D Platformer game with coins and enemies.",
  "Create a Zombie Survival game with waves of enemies.",
  "Create a Racing game with multiple tracks.",
  "Create a Puzzle Adventure game with hidden clues.",
  "Create a Fantasy RPG with quests and magic.",
  "Create a Space Shooter with alien enemies.",
];

const icons = [
  Gamepad2,
  Ghost,
  Car,
  Puzzle,
  Swords,
  Rocket,
];

interface Props {
  onSelect: (text: string) => void;
}

export default function PromptSuggestions({ onSelect }: Props) {
  return (
    <section className="mb-10">
      <h2 className="mb-5 text-xl font-semibold">
        💡 Quick Ideas
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {prompts.map((prompt, index) => {
          const Icon = icons[index];

          return (
            <button
              key={index}
              onClick={() => onSelect(prompt)}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:border-purple-500 hover:bg-purple-500/10"
            >
              <Icon className="mb-3 h-8 w-8 text-purple-400" />

              <p className="font-medium">
                {prompt}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}