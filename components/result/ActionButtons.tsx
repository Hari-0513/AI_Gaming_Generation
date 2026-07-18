import {
  Download,
  Play,
  RotateCcw,
  Pencil,
} from "lucide-react";

export default function ActionButtons() {
  return (
    <section className="mt-10 flex flex-wrap gap-5">

      <button className="rounded-xl bg-purple-600 px-6 py-3">
        <Play className="mr-2 inline" size={18} />
        Preview
      </button>

      <button className="rounded-xl border border-white/10 px-6 py-3">
        <Download className="mr-2 inline" size={18} />
        Download
      </button>

      <button className="rounded-xl border border-white/10 px-6 py-3">
        <Pencil className="mr-2 inline" size={18} />
        Edit Prompt
      </button>

      <button className="rounded-xl border border-white/10 px-6 py-3">
        <RotateCcw className="mr-2 inline" size={18} />
        Regenerate
      </button>

    </section>
  );
}