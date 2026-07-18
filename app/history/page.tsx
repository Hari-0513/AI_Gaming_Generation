import HistoryHeader from "@/components/history/HistoryHeader";
import SearchBar from "@/components/history/SearchBar";
import ProjectList from "@/components/history/ProjectList";

export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-background p-10">
      <div className="mx-auto max-w-6xl">

        <HistoryHeader />

        <SearchBar />

        <ProjectList />

      </div>
    </main>
  );
}