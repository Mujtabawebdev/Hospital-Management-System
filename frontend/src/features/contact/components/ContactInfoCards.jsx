import React from "react";
import { Clock, Mail, MapPin } from "lucide-react";
import { Card } from "../../../shared/components/ui";

const contactCards = [
  {
    title: "Email Us",
    text: "support@medihub.com",
    description: "Send us your questions anytime.",
    icon: Mail,
    accent: "bg-blue-100 text-blue-600",
  },
  {
    title: "Support Hours",
    text: "9 AM - 6 PM",
    description: "Monday to Saturday support.",
    icon: Clock,
    accent: "bg-blue-100 text-blue-700",
  },
  {
    title: "Visit Us",
    text: "Lahore, Pakistan",
    description: "Healthcare innovation office.",
    icon: MapPin,
    accent: "bg-blue-100 text-blue-600",
  },
];

function ContactInfoCards() {
  return (
    <section className="bg-white px-4 py-8">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
        {contactCards.map((card) => (
          <Card
            key={card.title}
            className="flex items-center gap-5 rounded-2xl border border-slate-200 p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${card.accent}`}>
              <card.icon className="h-8 w-8" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-black text-[#0f1f44]">{card.title}</h3>
              <p className="mt-1 font-bold text-blue-600">{card.text}</p>
              <p className="mt-1 text-sm text-slate-600">{card.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default ContactInfoCards;
