const logs = [
  "✓ Requirements analyzed",
  "✓ Genre identified",
  "✓ Selecting Phaser.js engine",
  "✓ Creating player mechanics",
  "⏳ Building game world...",
];

export default function LiveLogs() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-8">

      <h2 className="mb-8 text-2xl font-bold">
        Live Generation Logs
      </h2>

      <div className="space-y-4">

        {logs.map((log) => (
          <div
            key={log}
            className="rounded-xl bg-black/20 p-4 font-mono text-sm"
          >
            {log}
          </div>
        ))}

      </div>

    </section>
  );
}