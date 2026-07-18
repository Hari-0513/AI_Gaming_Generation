import { CheckCircle2 } from "lucide-react";

const assets = [
  "Player Character",
  "Zombie Enemy",
  "Background",
  "Sound Effects",
  "Game Logic",
  "UI Elements",
];

export default function GeneratedAssets() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-8">

      <h2 className="mb-6 text-2xl font-bold">
        Generated Assets
      </h2>

      <div className="space-y-4">

        {assets.map((asset) => (
          <div
            key={asset}
            className="flex items-center gap-3"
          >
            <CheckCircle2 className="text-green-400" />

            {asset}

          </div>
        ))}

      </div>

    </section>
  );
}