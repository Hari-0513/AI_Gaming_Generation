import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="mb-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">

      <Search className="text-muted-foreground" />

      <input
        placeholder="Search projects..."
        className="w-full bg-transparent outline-none"
      />

    </div>
  );
}