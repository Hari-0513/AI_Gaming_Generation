"use client";

import Link from "next/link";
import {
  Sparkles,
  Globe,
  Mail,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-10 md:grid-cols-4">

          {/* Logo */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-purple-400" />
              <h2 className="text-xl font-bold">
                GameForge AI
              </h2>
            </div>

            <p className="text-muted-foreground">
              Build intelligent games using the power of Artificial Intelligence.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 font-semibold">Product</h3>

            <div className="space-y-3">
              <Link href="#" className="block text-muted-foreground hover:text-white">
                Features
              </Link>

              <Link href="#" className="block text-muted-foreground hover:text-white">
                Workflow
              </Link>

              <Link href="#" className="block text-muted-foreground hover:text-white">
                AI Studio
              </Link>
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="mb-4 font-semibold">Technologies</h3>

            <div className="space-y-3 text-muted-foreground">
              <p>Next.js</p>
              <p>TypeScript</p>
              <p>Tailwind CSS</p>
              <p>n8n Workflow</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold">
              Connect
            </h3>

            <div className="flex gap-4">
                <Globe className="cursor-pointer transition hover:text-purple-400" />
                <Mail className="cursor-pointer transition hover:text-purple-400" />
                <ArrowRight className="cursor-pointer transition hover:text-purple-400" />
            </div>
          </div>

        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center text-sm text-muted-foreground">
          © 2026 GameForge AI • AI Powered Game Generation Platform
        </div>

      </div>
    </footer>
  );
}