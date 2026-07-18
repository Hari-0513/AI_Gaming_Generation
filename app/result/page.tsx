import GamePreview from "@/components/result/GamePreview";
import GameInfo from "@/components/result/GameInfo";
import GeneratedAssets from "@/components/result/GeneratedAssets";
import ActionButtons from "@/components/result/ActionButtons";

export default function ResultPage() {
  return (
    <main className="min-h-screen bg-background p-10">
      <div className="mx-auto max-w-7xl">

        <GamePreview />

        <div className="mt-10 grid gap-8 lg:grid-cols-2">

          <GameInfo />

          <GeneratedAssets />

        </div>

        <ActionButtons />

      </div>
    </main>
  );
}