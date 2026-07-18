"use client";

import {
  Bell,
  Search,
  UserCircle2,
} from "lucide-react";

export default function Header() {
  return (
    <header className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

      <div>
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-muted-foreground">
          Welcome back! Ready to create your next AI-powered game?
        </p>
      </div>

      <div className="flex items-center gap-4">

        {/* Search */}
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <Search size={18} className="text-muted-foreground" />

          <input
            placeholder="Search..."
            className="bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>

        {/* Notification */}
        <button className="rounded-xl border border-white/10 bg-white/5 p-3 transition hover:border-purple-500">
          <Bell size={20} />
        </button>

        {/* User */}
        <button className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-purple-500">
          <UserCircle2 size={24} />

          <div className="text-left">
            <p className="font-medium">
              Harish
            </p>

            <p className="text-xs text-muted-foreground">
              AI Developer
            </p>
          </div>
        </button>

      </div>

    </header>
  );
}