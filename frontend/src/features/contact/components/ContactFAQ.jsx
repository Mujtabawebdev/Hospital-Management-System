import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card } from "../../../shared/components/ui";

const faqs = [
  {
    question: "How can MediHub help my hospital?",
    answer: "MediHub centralizes patient records, doctor schedules, appointments, billing, and operational workflows so your team can manage daily hospital tasks from one secure platform.",
  },
  {
    question: "Can I manage doctors and appointments from one dashboard?",
    answer: "Yes. Admins can manage doctors, review appointment activity, and keep schedules organized through the MediHub dashboard.",
  },
  {
    question: "Is patient data secure?",
    answer: "MediHub is designed around secure access patterns, authenticated accounts, and role-based workflows to help protect sensitive healthcare data.",
  },
  {
    question: "Do you provide support after setup?",
    answer: "Yes. Our support team can help with onboarding, setup questions, and operational guidance after your hospital starts using MediHub.",
  },
];

function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-white px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-7 text-center">
          <h2 className="text-3xl font-black text-[#0f1f44]">Frequently Asked Questions</h2>
          <p className="mt-3 text-slate-600">Quick answers for hospitals and healthcare providers.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <Card key={faq.question} className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span className="font-black text-[#0f1f44]">{index + 1}. {faq.question}</span>
                  <ChevronDown className={`h-5 w-5 text-blue-600 transition ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
                {isOpen && (
                  <div className="border-t border-slate-100 px-5 py-4 text-sm leading-7 text-slate-600">
                    {faq.answer}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ContactFAQ;
