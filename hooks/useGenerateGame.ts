"use client";

import { useState } from "react";

import { generateGame } from "@/services/api";

export function useGenerateGame() {
  const [loading, setLoading] = useState(false);

  async function generate(prompt: string) {
    setLoading(true);

    try {
      const result = await generateGame({
        prompt,
      });

      return result;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    generate,
  };
}