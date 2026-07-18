import {
  Gamepad2,
  CheckCircle2,
  Clock3,
} from "lucide-react";

const projects = [
  {
    title: "Space Runner",
    genre: "Platformer",
    status: "Completed",
    updated: "2 hours ago",
  },
  {
    title: "Zombie Escape",
    genre: "Survival",
    status: "Generating",
    updated: "10 mins ago",
  },
  {
    title: "Pixel Adventure",
    genre: "Adventure",
    status: "Completed",
    updated: "Yesterday",
  },
];

export default function RecentProjects() {
  return (
    <section className="mt-12">

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold">
          Recent Projects
        </h2>

        <button className="text-sm text-purple-400 hover:text-purple-300">
          View All
        </button>
      </div>

      <div className="space-y-5">

        {projects.map((project) => (
          <div
            key={project.title}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-purple-500/30"
          >

            <div className="flex items-center gap-5">

              <div className="rounded-xl bg-purple-500/10 p-4">
                <Gamepad2 className="text-purple-400" />
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  {project.title}
                </h3>

                <p className="text-muted-foreground">
                  {project.genre}
                </p>
              </div>

            </div>

            <div className="flex items-center gap-10">

              <div className="flex items-center gap-2">

                {project.status === "Completed" ? (
                  <CheckCircle2 className="text-green-400" />
                ) : (
                  <Clock3 className="text-yellow-400" />
                )}

                <span>{project.status}</span>

              </div>

              <span className="text-sm text-muted-foreground">
                {project.updated}
              </span>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}