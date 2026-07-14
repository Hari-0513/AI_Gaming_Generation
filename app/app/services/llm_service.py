import os
import openai
from abc import ABC, abstractmethod

# The main blueprint for our AI service
class BaseLLMProvider(ABC):
    @abstractmethod
    async def generate_code(self, system_prompt: str, user_prompt: str) -> str:
        pass

# The OpenAI specific setup
class OpenAIProvider(BaseLLMProvider):
    def __init__(self):
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError("OPENAI_API_KEY environment variable is missing.")
        self.client = openai.AsyncOpenAI(api_key=api_key)
        self.model = os.getenv("LLM_MODEL", "gpt-4o")

    async def generate_code(self, system_prompt: str, user_prompt: str) -> str:
        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.2,
            )
            return response.choices[0].message.content or ""
        except Exception as e:
            raise RuntimeError(f"LLM Provider Error: {str(e)}")

# This function tells the app to use OpenAI
def get_llm_provider() -> BaseLLMProvider:
    return OpenAIProvider()
