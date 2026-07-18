import { Bot, User } from "lucide-react";

const messages = [
  {
    sender: "ai",
    text: "Hello! 👋 I'm GameForge AI. Tell me what kind of game you'd like to build.",
  },
  {
    sender: "user",
    text: "I want to create a zombie survival game.",
  },
  {
    sender: "ai",
    text: "Great choice! Could you tell me:\n\n• 2D or 3D?\n• Single-player or Multiplayer?\n• Pixel Art or Realistic?\n• Which game engine would you prefer?",
  },
];

export default function ChatArea() {
  return (
    <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

      <h2 className="mb-6 text-xl font-semibold">
        AI Conversation
      </h2>

      <div className="space-y-6">

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-2xl rounded-2xl p-5 ${
                message.sender === "user"
                  ? "bg-purple-600 text-white"
                  : "bg-black/30 border border-white/10"
              }`}
            >
              <div className="mb-3 flex items-center gap-2">

                {message.sender === "ai" ? (
                  <>
                    <Bot size={18} className="text-purple-400" />
                    <span className="font-semibold">
                      GameForge AI
                    </span>
                  </>
                ) : (
                  <>
                    <User size={18} />
                    <span className="font-semibold">
                      You
                    </span>
                  </>
                )}

              </div>

              <p className="whitespace-pre-line text-sm leading-7">
                {message.text}
              </p>

            </div>
          </div>
        ))}

      </div>

    </section>
  );
}