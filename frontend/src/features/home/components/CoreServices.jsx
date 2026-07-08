import React from "react";
import { CalendarDays, ClipboardList, ReceiptText, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button, Card } from "../../../shared/components/ui";

const services = [
  {
    title: "Patient Management",
    description: "Easily manage patient registrations, history, and profiles.",
    icon: Users,
  },
  {
    title: "Appointment Scheduling",
    description: "Smart scheduling system for appointments and follow-ups.",
    icon: CalendarDays,
  },
  {
    title: "Medical Records",
    description: "Securely store and access medical records instantly.",
    icon: ClipboardList,
  },
  {
    title: "Billing & Invoices",
    description: "Automated billing, invoices, and payment management.",
    icon: ReceiptText,
  },
];

function CoreServices() {
  return (
    <section className="bg-white px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <Card className="rounded-2xl border border-slate-200 p-6 shadow-lg shadow-slate-200/60 md:p-8">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-blue-600">Services</p>
              <h2 className="mt-2 text-3xl font-black text-[#0f1f44]">Our Core Services</h2>
            </div>
            <Link to="/specialities">
              <Button variant="secondary" className="rounded-xl border-blue-600 text-blue-600 hover:bg-blue-50">
                View All Services
              </Button>
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <div key={service.title} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <service.icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-black text-[#0f1f44]">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{service.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

export default CoreServices;
