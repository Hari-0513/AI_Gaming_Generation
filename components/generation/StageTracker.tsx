import {
  CheckCircle2,
  LoaderCircle,
  Circle,
} from "lucide-react";

const stages = [
  {
    title: "Requirement Analysis",
    status: "done",
  },
  {
    title: "Prompt Engineering",
    status: "done",
  },
  {
    title: "Game Generation",
    status: "active",
  },
  {
    title: "Asset Creation",
    status: "pending",
  },
  {
    title: "Final Packaging",
    status: "pending",
  },
];

export default function StageTracker() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-8">

      <h2 className="mb-8 text-2xl font-bold">
        Generation Stages
      </h2>

      <div className="space-y-6">

        {stages.map((stage) => (
          <div
            key={stage.title}
            className="flex items-center gap-4"
          >

            {stage.status === "done" && (
              <CheckCircle2 className="text-green-400" />
            )}

            {stage.status === "active" && (
              <LoaderCircle className="animate-spin text-purple-400" />
            )}

            {stage.status === "pending" && (
              <Circle className="text-gray-500" />
            )}

            <span>{stage.title}</span>

          </div>
        ))}

      </div>

    </section>
  );
}