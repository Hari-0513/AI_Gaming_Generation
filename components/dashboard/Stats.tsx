import {
  Gamepad2,
  FolderKanban,
  Bot,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Games Generated",
    value: "128",
    icon: Gamepad2,
  },
  {
    title: "Projects",
    value: "12",
    icon: FolderKanban,
  },
  {
    title: "AI Requests",
    value: "4.2K",
    icon: Bot,
  },
  {
    title: "Success Rate",
    value: "98%",
    icon: TrendingUp,
  },
];

export default function Stats() {
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1"
          >
            <div className="mb-5 flex items-center justify-between">
              <Icon className="h-8 w-8 text-purple-400" />
            </div>

            <h2 className="text-3xl font-bold">
              {stat.value}
            </h2>

            <p className="mt-2 text-muted-foreground">
              {stat.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}