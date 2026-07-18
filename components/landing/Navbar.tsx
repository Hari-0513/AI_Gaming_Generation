"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-400" />
          <span className="text-xl font-bold">
            GameForge AI
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden gap-8 md:flex">
          <a href="#features" className="text-muted-foreground transition hover:text-white">
            Features
          </a>

          <a href="#workflow" className="text-muted-foreground transition hover:text-white">
            Workflow
          </a>

          <a href="#about" className="text-muted-foreground transition hover:text-white">
            About
          </a>
        </nav>

        {/* CTA */}
        <Link
            href="/dashboard"
            className="rounded-xl bg-purple-600 px-5 py-2 font-medium text-white transition hover:scale-105 hover:bg-purple-700"
        >
            Get Started
        </Link>

      </div>
    </header>
  );
}