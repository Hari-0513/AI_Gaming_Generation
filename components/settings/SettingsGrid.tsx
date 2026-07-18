import {
  Bell,
  Palette,
  User,
  Server,
} from "lucide-react";

const cards = [
  {
    title: "Profile",
    icon: User,
    content: [
      "Name: Harish",
      "Role: Frontend Developer",
      "Email: user@example.com",
    ],
  },
  {
    title: "Appearance",
    icon: Palette,
    content: [
      "Theme: Dark",
      "Accent: Purple",
      "Font: Inter",
    ],
  },
  {
    title: "Notifications",
    icon: Bell,
    content: [
      "Email Alerts: Enabled",
      "Push Notifications: Enabled",
      "Generation Updates: Enabled",
    ],
  },
  {
    title: "API Configuration",
    icon: Server,
    content: [
      "Backend: Not Connected",
      "Status: Waiting",
      "Provider: n8n",
    ],
  },
];

export default function SettingsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <div className="mb-5 flex items-center gap-3">
              <Icon className="text-purple-400" />
              <h2 className="text-2xl font-semibold">
                {card.title}
              </h2>
            </div>

            <div className="space-y-3">
              {card.content.map((item) => (
                <p
                  key={item}
                  className="text-muted-foreground"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}