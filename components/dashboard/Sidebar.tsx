"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Bot,
  History,
  Settings,
  Sparkles,
} from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "AI Studio",
    icon: Bot,
    href: "/studio",
  },
  {
    title: "History",
    icon: History,
    href: "/history",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-white/10 bg-black/30 backdrop-blur-xl">

      {/* Logo */}
      <div className="border-b border-white/10 p-6">
        <div className="flex items-center gap-3">
          <Sparkles className="text-purple-400" />
          <h1 className="text-2xl font-bold">
            GameForge AI
          </h1>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-2 p-6">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center gap-4 rounded-xl px-4 py-3 text-muted-foreground transition hover:bg-purple-500/10 hover:text-white"
            >
              <Icon size={20} />
              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-6">
        <p className="text-sm text-muted-foreground">
          AI Frontend Agent
        </p>

        <p className="mt-1 text-xs text-purple-400">
          Online ●
        </p>
      </div>

    </aside>
  );
}