import React from "react";
import { ArrowRight, HeartPulse, PlusCircle } from "lucide-react";
import { Button } from "../../../shared/components/ui";

function AboutCTA() {
  return (
    <section className="bg-white px-4 py-12">
      <div className="relative mx-auto overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 via-white to-blue-100 p-7 shadow-lg shadow-blue-100/70 md:p-9">
        <div className="absolute right-8 top-1/2 hidden -translate-y-1/2 items-center gap-4 text-blue-200 md:flex">
          <HeartPulse className="h-24 w-24" strokeWidth={1.3} aria-hidden="true" />
          <div className="h-24 w-24 rounded-full bg-[radial-gradient(circle,#bfdbfe_2px,transparent_2px)] [background-size:14px_14px]" />
        </div>
        <div className="relative mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-[#2563eb] shadow-sm">
              <PlusCircle className="h-10 w-10" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#0f1f44]">Ready to transform your hospital management?</h2>
              <p className="mt-2 text-slate-600">Join hundreds of healthcare providers who trust MediHub.</p>
            </div>
          </div>
          <Button className="w-full gap-2 rounded-xl bg-[#2563eb] px-8 py-4 text-base shadow-lg shadow-blue-500/20 hover:bg-blue-700 md:w-auto">
            Get Started
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default AboutCTA;
