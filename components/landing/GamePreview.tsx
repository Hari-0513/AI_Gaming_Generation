import {
  Gamepad2,
  Cpu,
  CheckCircle2,
  Play,
} from "lucide-react";

export default function GamePreview() {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-6xl">

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-400">
                AI Generated Preview
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Space Runner
              </h2>
            </div>

            <button className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-white transition hover:bg-purple-700">
              <Play size={18} />
              Preview
            </button>
          </div>

          {/* Preview */}
          <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-black">
            <Gamepad2
              size={80}
              className="text-purple-400"
            />
          </div>

          {/* Info */}
          <div className="mt-8 grid gap-6 md:grid-cols-3">

            <div className="rounded-xl bg-black/30 p-5">
              <Cpu className="mb-3 text-purple-400" />
              <h3 className="font-semibold">
                Engine
              </h3>
              <p className="text-muted-foreground">
                Phaser.js
              </p>
            </div>

            <div className="rounded-xl bg-black/30 p-5">
              <Gamepad2 className="mb-3 text-purple-400" />
              <h3 className="font-semibold">
                Genre
              </h3>
              <p className="text-muted-foreground">
                Platform Adventure
              </p>
            </div>

            <div className="rounded-xl bg-black/30 p-5">
              <CheckCircle2 className="mb-3 text-green-400" />
              <h3 className="font-semibold">
                Status
              </h3>
              <p className="text-muted-foreground">
                Ready to Play
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}