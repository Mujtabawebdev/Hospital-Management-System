import React from "react";
import { ArrowRight, HeartPulse } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../../shared/components/ui";

function ContactCTA() {
  return (
    <section className="bg-white px-4 py-12">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 via-white to-blue-100 p-7 shadow-lg shadow-blue-100/70 md:p-9">
        <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 text-blue-200 md:block">
          <HeartPulse className="h-28 w-28" strokeWidth={1.4} aria-hidden="true" />
        </div>
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-black text-[#0f1f44] md:text-3xl">Ready to simplify hospital management?</h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-600">
              Start using MediHub to manage patients, doctors, appointments, billing, and records from one secure platform.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button className="gap-2 rounded-xl bg-[#2563eb] px-8 py-4 hover:bg-blue-700">
              Get Started
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
            <Link to="/specialities">
              <Button variant="secondary" className="w-full rounded-xl border-blue-600 px-8 py-4 text-blue-600 hover:bg-blue-50">
                View Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactCTA;
