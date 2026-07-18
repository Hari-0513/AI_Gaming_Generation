import { Gamepad2 } from "lucide-react";

export default function GamePreview() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-8">

      <h1 className="text-5xl font-bold">
        🎮 Zombie Survival
      </h1>

      <p className="mt-3 text-green-400">
        Generated Successfully
      </p>

      <div className="mt-8 flex h-[400px] items-center justify-center rounded-2xl border border-dashed border-purple-500 bg-black/20">

        <div className="text-center">

          <Gamepad2
            className="mx-auto mb-4 text-purple-400"
            size={80}
          />

          <p className="text-muted-foreground">
            Game Preview Area
          </p>

        </div>

      </div>

    </section>
  );
}