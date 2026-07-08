import React from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { Card } from "../../../shared/components/ui";

const points = [
  "Easy to use and fully integrated",
  "Secure cloud-based platform",
  "24/7 support and training",
  "Designed for all hospital sizes",
];

function WhyChooseUs() {
  return (
    <section className="bg-white px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <Card className="overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-blue-100 p-7 shadow-lg shadow-blue-100/70 md:p-9">
          <div className="grid gap-8 md:grid-cols-[1fr_280px] md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-blue-600">Why Choose Us</p>
              <h2 className="mt-2 text-3xl font-black text-[#0f1f44]">Why Hospitals Trust MediHub?</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {points.map((point) => (
                  <p key={point} className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
                    {point}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex h-48 w-48 items-center justify-center rounded-[2rem] bg-white text-blue-600 shadow-xl">
                <ShieldCheck className="h-28 w-28" strokeWidth={1.4} aria-hidden="true" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

export default WhyChooseUs;
