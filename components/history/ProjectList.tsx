import { ArrowRight, CheckCircle2, Clock3, Gamepad2 } from "lucide-react";

const projects = [
  {
    title: "Zombie Survival",
    genre: "Survival",
    engine: "Phaser.js",
    status: "Completed",
    date: "Jul 15",
  },
  {
    title: "Speed Rush",
    genre: "Racing",
    engine: "Unity",
    status: "Completed",
    date: "Jul 12",
  },
  {
    title: "Puzzle World",
    genre: "Puzzle",
    engine: "Godot",
    status: "In Progress",
    date: "Jul 10",
  },
];

export default function ProjectList() {
  return (
    <div className="space-y-5">

      {projects.map((project) => (
        <div
          key={project.title}
          className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-purple-500/40"
        >
          <div className="flex items-center gap-5">

            <div className="rounded-2xl bg-purple-500/10 p-4">
              <Gamepad2 className="text-purple-400" />
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                {project.title}
              </h2>

              <p className="text-muted-foreground">
                {project.genre} • {project.engine}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {project.date}
              </p>
            </div>

          </div>

          <div className="flex items-center gap-6">

            <div className="flex items-center gap-2">

              {project.status === "Completed" ? (
                <CheckCircle2 className="text-green-400" />
              ) : (
                <Clock3 className="text-yellow-400" />
              )}

              <span>{project.status}</span>

            </div>

            <button className="rounded-xl bg-purple-600 px-5 py-3 hover:bg-purple-700 transition">
              <ArrowRight className="inline mr-2" size={16} />
              Open
            </button>

          </div>

        </div>
      ))}

    </div>
  );
}