import React from "react";
import { ArrowRight, CheckCircle2, Headphones, MessageCircle, Plus, Send, Stethoscope } from "lucide-react";
import { Button } from "../../../shared/components/ui";

function ContactHero({ onSendClick }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-blue-100 px-4 py-14 md:py-20">
      <div className="absolute left-8 top-28 hidden h-32 w-32 rounded-full bg-[radial-gradient(circle,#bfdbfe_2px,transparent_2px)] [background-size:16px_16px] md:block" />
      <Plus className="absolute left-24 top-1/2 hidden h-10 w-10 text-blue-200 md:block" strokeWidth={4} aria-hidden="true" />
      <Plus className="absolute right-20 top-24 hidden h-9 w-9 text-blue-200 md:block" strokeWidth={4} aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <div className="inline-flex items-center rounded-xl border border-blue-100 bg-white/80 px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm">
            Contact MediHub
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight text-[#0f1f44] md:text-6xl">
            Get in Touch with Our Healthcare Support Team
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
            Have questions about MediHub? Our team is here to help hospitals, doctors, and healthcare providers manage their operations smoothly.
          </p>
          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button
              className="gap-2 rounded-xl bg-[#2563eb] px-7 py-4 text-base shadow-lg shadow-blue-500/20 hover:bg-blue-700"
              onClick={onSendClick}
            >
              <Send className="h-5 w-5" aria-hidden="true" />
              Send Message
            </Button>
            <p className="text-sm font-semibold text-slate-600">
              Or reach us through secure support chat
            </p>
          </div>
        </div>

        <div className="relative min-h-[440px]">
          <div className="absolute right-2 top-4 hidden h-72 w-72 rounded-full bg-blue-200/40 blur-3xl md:block" />
          <div className="absolute right-10 top-6 hidden h-72 w-72 rounded-[2.5rem] border border-blue-100 bg-blue-50/80 md:block">
            <div className="absolute left-12 top-12 grid grid-cols-3 gap-3">
              {Array.from({ length: 9 }).map((_, index) => (
                <span key={index} className="h-8 w-8 rounded-md bg-blue-200/70" />
              ))}
            </div>
            <div className="absolute left-24 top-24 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
              <Plus className="h-12 w-12" strokeWidth={3} aria-hidden="true" />
            </div>
          </div>

          <div className="relative mx-auto max-w-xl rounded-[2rem] border border-blue-100 bg-white/80 p-5 shadow-2xl shadow-blue-200/70 backdrop-blur">
            <div className="flex justify-end">
              <div className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20">
                How can we help you?
              </div>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Headphones className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-black text-[#0f1f44]">We're Here for You</h3>
                  <div className="mt-4 space-y-3 text-sm font-semibold text-slate-600">
                    {["Fast Support", "Secure & Reliable", "24/7 Assistance"].map((item) => (
                      <p key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" aria-hidden="true" />
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-blue-700">
                  <MessageCircle className="mb-2 h-6 w-6" aria-hidden="true" />
                  Chat with our onboarding team
                </div>
              </div>

              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-100 to-white p-5">
                <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-slate-200 to-blue-100" />
                <div className="mx-auto mt-4 h-40 w-36 rounded-t-[4rem] bg-blue-600" />
                <div className="absolute bottom-8 left-10 h-32 w-28 rotate-6 rounded-t-[3rem] bg-white shadow-lg" />
                <div className="absolute bottom-8 right-10 h-32 w-28 -rotate-6 rounded-t-[3rem] bg-white shadow-lg" />
                <Stethoscope className="absolute bottom-16 left-20 h-12 w-12 text-slate-500" aria-hidden="true" />
                <div className="absolute bottom-5 right-5 rounded-2xl border border-blue-100 bg-white p-4 shadow-lg">
                  <p className="text-sm font-black text-[#0f1f44]">Support Team</p>
                  <div className="mt-3 flex -space-x-2">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <span key={index} className="h-8 w-8 rounded-full border-2 border-white bg-blue-200" />
                    ))}
                  </div>
                  <p className="mt-2 flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <span className="h-2 w-2 rounded-full bg-blue-600" />
                    Online
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2 rounded-xl bg-blue-50 p-3 text-sm font-semibold text-blue-700">
              Healthcare support that keeps operations moving
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactHero;
