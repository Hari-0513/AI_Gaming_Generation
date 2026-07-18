import ProgressCard from "@/components/generation/ProgressCard";
import StageTracker from "@/components/generation/StageTracker";
import LiveLogs from "@/components/generation/LiveLogs";

export default function GenerationPage() {
  return (
    <main className="min-h-screen bg-background p-10">
      <div className="mx-auto max-w-6xl">

        <ProgressCard />

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <StageTracker />
          <LiveLogs />
        </div>

      </div>
    </main>
  );
}