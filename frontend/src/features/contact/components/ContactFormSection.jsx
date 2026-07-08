import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Clock, Mail, Phone, Send, Tag, UserRound } from "lucide-react";
import { toast } from "react-toastify";
import { Button, Card, Input, Textarea } from "../../../shared/components/ui";
import { sendContactMessage } from "../../content/api/contactApi.js";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const supportPoints = [
  "Fast support for hospitals and clinics",
  "Help with doctor and patient management",
  "Guidance for appointments and billing setup",
  "Secure medical records support",
];

const workingHours = [
  ["Monday - Friday", "9:00 AM - 6:00 PM"],
  ["Saturday", "10:00 AM - 4:00 PM"],
  ["Sunday", "Closed"],
];

function ContactFormSection({ formRef }) {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const composedMessage = [
      `Name: ${form.fullName}`,
      `Phone: ${form.phone || "Not provided"}`,
      `Subject: ${form.subject}`,
      "",
      form.message,
    ].join("\n");

    try {
      setSubmitting(true);
      await sendContactMessage({
        email: form.email,
        message: composedMessage,
      });
      toast.success("Message sent successfully");
      setForm(initialForm);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClasses = "h-[52px] rounded-xl border-slate-200 px-4 pl-11 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100";

  return (
    <section ref={formRef} className="bg-white px-4 py-6">
      <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="rounded-2xl border border-slate-200 p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-black text-[#0f1f44]">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="relative">
              <UserRound className="pointer-events-none absolute left-4 top-[44px] h-4 w-4 text-slate-400" aria-hidden="true" />
              <Input label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Enter your full name" inputClassName={inputClasses} required />
            </div>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-4 top-[44px] h-4 w-4 text-slate-400" aria-hidden="true" />
              <Input label="Email Address" type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" inputClassName={inputClasses} required />
            </div>
            <div className="relative">
              <Phone className="pointer-events-none absolute left-4 top-[44px] h-4 w-4 text-slate-400" aria-hidden="true" />
              <Input label="Phone Number" name="phone" value={form.phone} onChange={handleChange} placeholder="Enter your phone number" inputClassName={inputClasses} />
            </div>
            <div className="relative">
              <Tag className="pointer-events-none absolute left-4 top-[44px] h-4 w-4 text-slate-400" aria-hidden="true" />
              <Input label="Subject" name="subject" value={form.subject} onChange={handleChange} placeholder="Enter subject" inputClassName={inputClasses} required />
            </div>
            <Textarea
              label="Message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Type your message here..."
              className="md:col-span-2"
              textareaClassName="min-h-[130px] rounded-xl border-slate-200 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              minLength={10}
              required
            />
            <div className="md:col-span-2">
              <Button type="submit" disabled={submitting} className="gap-2 rounded-xl bg-[#2563eb] px-6 py-3 hover:bg-blue-700">
                {submitting ? "Submitting..." : "Submit Message"}
                <Send className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </form>
        </Card>

        <div className="space-y-5">
          <Card className="rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#0f1f44]">Why Contact MediHub?</h2>
            <div className="mt-5 space-y-4">
              {supportPoints.map((point) => (
                <p key={point} className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
                  {point}
                </p>
              ))}
            </div>
          </Card>

          <Card className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-black text-[#0f1f44]">
              <Clock className="h-5 w-5 text-blue-600" aria-hidden="true" />
              Working Hours
            </h2>
            <div className="mt-5 space-y-3">
              {workingHours.map(([day, time]) => (
                <div key={day} className="flex items-center justify-between gap-4 text-sm">
                  <span className="font-bold text-[#0f1f44]">{day}</span>
                  <span className="font-semibold text-slate-600">{time}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#0f1f44]">Need urgent assistance?</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Our support team is available for critical healthcare system issues.
            </p>
            <Button variant="secondary" className="mt-5 gap-2 rounded-xl border-blue-600 text-blue-600 hover:bg-blue-50">
              Request Support
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default ContactFormSection;
