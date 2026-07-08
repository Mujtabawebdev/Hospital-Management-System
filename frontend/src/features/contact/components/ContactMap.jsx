import React from "react";
import { Building2, MapPin } from "lucide-react";
import { Card } from "../../../shared/components/ui";

function ContactMap() {
  return (
    <section className="bg-white px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-5 text-2xl font-black text-[#0f1f44]">Our Location</h2>
        <Card className="relative min-h-[310px] overflow-hidden rounded-2xl border border-slate-200 bg-blue-50 shadow-sm">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(37,99,235,0.08)_1px,transparent_1px),linear-gradient(rgba(37,99,235,0.08)_1px,transparent_1px)] bg-[size:44px_44px]" />
          <div className="absolute -left-10 top-20 h-32 w-64 rotate-[-18deg] rounded-full bg-white/80" />
          <div className="absolute right-0 top-8 h-64 w-32 rounded-l-full bg-blue-200/70" />
          <div className="relative flex min-h-[310px] flex-col items-center justify-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl shadow-blue-300">
              <MapPin className="h-11 w-11" aria-hidden="true" />
            </div>
            <div className="rounded-2xl border border-blue-100 bg-white/90 px-8 py-5 shadow-xl backdrop-blur">
              <Building2 className="mx-auto mb-3 h-8 w-8 text-blue-600" aria-hidden="true" />
              <h3 className="text-xl font-black text-[#0f1f44]">MediHub Office</h3>
              <p className="mt-1 font-semibold text-slate-600">Lahore, Pakistan</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

export default ContactMap;
