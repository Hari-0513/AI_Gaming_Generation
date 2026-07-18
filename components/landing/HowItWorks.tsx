"use client";

import {
  Lightbulb,
  BrainCircuit,
  FileText,
  Cpu,
  Gamepad2,
} from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    title: "Describe Your Idea",
    description:
      "Tell GameForge AI about your game concept using natural language.",
  },
  {
    icon: BrainCircuit,
    title: "AI Requirement Analysis",
    description:
      "The AI extracts game mechanics, genre, objectives, and player interactions.",
  },
  {
    icon: FileText,
    title: "Prompt Optimization",
    description:
      "Your request is transformed into optimized prompts for the generation engine.",
  },
  {
    icon: Cpu,
    title: "Game Generation",
    description:
      "The backend AI workflow generates code, assets, and game logic.",
  },
  {
    icon: Gamepad2,
    title: "Play & Improve",
    description:
      "Preview the generated game instantly and continue refining it with AI.",
  },
];

export default function HowItWorks() {
  return (
    <section id="workflow" className="py-28">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-20 text-center">
          <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
            WORKFLOW
          </span>

          <h2 className="mt-6 text-5xl font-bold">
            How It Works
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
            From a simple idea to a playable AI-generated game in just a few intelligent steps.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-5">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative rounded-3xl border border-white/10 bg-white/5 p-6 text-center transition hover:-translate-y-2 hover:border-purple-500/40"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10">
                  <Icon className="h-8 w-8 text-purple-400" />
                </div>

                <div className="mb-3 text-sm font-semibold text-purple-300">
                  Step {index + 1}
                </div>

                <h3 className="mb-3 text-xl font-bold">
                  {step.title}
                </h3>

                <p className="text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}