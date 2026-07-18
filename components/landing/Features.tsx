"use client";

import { Bot, Gamepad2, Layers3, Sparkles, Zap, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Assistant",
    description:
      "Describe your game idea naturally and let AI understand mechanics, story, and gameplay.",
  },
  {
    icon: Layers3,
    title: "Requirement Analysis",
    description:
      "Automatically extracts game requirements and validates your ideas before generation.",
  },
  {
    icon: Gamepad2,
    title: "Game Generation",
    description:
      "Generate mechanics, levels, assets, and gameplay using AI-powered workflows.",
  },
  {
    icon: Zap,
    title: "Instant Preview",
    description:
      "Preview generated games instantly and iterate with AI suggestions.",
  },
  {
    icon: Sparkles,
    title: "Prompt Optimization",
    description:
      "AI enhances prompts behind the scenes to improve generation quality.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Workflow",
    description:
      "Safe communication between frontend, AI agents, and backend services.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative py-28"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-16 text-center">

          <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
            FEATURES
          </span>

          <h2 className="mt-6 text-5xl font-bold">
            Everything You Need
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
            From a simple idea to a playable game,
            GameForge AI provides every tool required for intelligent game generation.
          </p>

        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/40 hover:bg-white/10"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/10">
                  <Icon className="h-8 w-8 text-purple-400 transition-transform duration-300 group-hover:scale-110" />
                </div>

                <h3 className="mb-4 text-2xl font-bold">
                  {feature.title}
                </h3>

                <p className="leading-7 text-muted-foreground">
                  {feature.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}