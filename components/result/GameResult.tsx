const details = [
  ["Genre", "Survival"],
  ["Engine", "Phaser.js"],
  ["Platform", "Web"],
  ["Graphics", "Pixel Art"],
  ["Players", "Single Player"],
];

export default function GameInfo() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-8">

      <h2 className="mb-6 text-2xl font-bold">
        Game Information
      </h2>

      <div className="space-y-5">

        {details.map(([key, value]) => (
          <div
            key={key}
            className="flex justify-between border-b border-white/10 pb-3"
          >
            <span className="text-muted-foreground">
              {key}
            </span>

            <span>{value}</span>
          </div>
        ))}

      </div>

    </section>
  );
}