const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export interface GenerateGameRequest {
  prompt: string;
}

export interface GenerateGameResponse {
  success: boolean;
  gameId: string;
  title: string;
  genre: string;
  engine: string;
  previewUrl?: string;
  downloadUrl?: string;
}

export async function generateGame(
  data: GenerateGameRequest
): Promise<GenerateGameResponse> {
  const response = await fetch(`${API_URL}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to generate game");
  }

  return response.json();
}