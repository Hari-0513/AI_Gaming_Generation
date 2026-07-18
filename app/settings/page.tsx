import SettingsHeader from "@/components/settings/SettingsHeader";
import SettingsGrid from "@/components/settings/SettingsGrid";

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-background p-10">
      <div className="mx-auto max-w-6xl">
        <SettingsHeader />
        <SettingsGrid />
      </div>
    </main>
  );
}