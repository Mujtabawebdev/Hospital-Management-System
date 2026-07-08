import React from "react";
import { CalendarClock, ShieldCheck, Users } from "lucide-react";
import { Card } from "../../../shared/components/ui";

const features = [
  {
    title: "Patient Management",
    description: "Easily register, track, and manage patient information, history, appointments, and treatment in one place.",
    icon: Users,
    accent: "bg-blue-100 text-blue-600",
  },
  {
    title: "Doctor Scheduling",
    description: "Efficiently manage doctor availability, schedules, and appointments to reduce delays and improve productivity.",
    icon: CalendarClock,
    accent: "bg-blue-100 text-[#2563eb]",
  },
  {
    title: "Secure Medical Records",
    description: "Store and access patient records securely with role-based access and advanced encryption for complete data safety.",
    icon: ShieldCheck,
    accent: "bg-blue-100 text-blue-700",
  },
];

function FeatureCards() {
  return (
    <section className="bg-white px-4 pb-8">
      <div className="mx-auto grid max-w-7xl gap-7 md:grid-cols-3">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="group grid gap-5 rounded-2xl border border-[#e5e7eb] p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className={`flex h-16 w-16 items-center justify-center rounded-full ${feature.accent}`}>
              <feature.icon className="h-9 w-9" strokeWidth={2} aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-xl font-black text-[#0f1f44]">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{feature.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default FeatureCards;
