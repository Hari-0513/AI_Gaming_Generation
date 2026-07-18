import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import Stats from "@/components/dashboard/Stats";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentProjects from "@/components/dashboard/RecentProjects";

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen bg-background">
      <Sidebar />

      <section className="flex-1 p-10">
        <Header />

        <Stats />

        <QuickActions />

        <RecentProjects />
      </section>
    </main>
  );
}