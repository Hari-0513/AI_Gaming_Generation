"use client";

import { useState } from "react";

import StudioHeader from "@/components/studio/StudioHeader";
import PromptSuggestions from "@/components/studio/PromptSuggestions";
import PromptInput from "@/components/studio/PromptInput";
import ChatArea from "@/components/studio/ChatArea";

export default function StudioPage() {
  const [prompt, setPrompt] = useState("");

  return (
    <main className="min-h-screen bg-background p-10">
      <div className="mx-auto max-w-6xl">

        <StudioHeader />

        <PromptSuggestions
          onSelect={(text) => setPrompt(text)}
        />

        <PromptInput
          prompt={prompt}
          setPrompt={setPrompt}
        />

        <ChatArea />

      </div>
    </main>
  );
}