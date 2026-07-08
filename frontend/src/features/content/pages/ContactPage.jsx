import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Card, Input, Textarea } from "../../../shared/components/ui";
import { sendContactMessage } from "../api/contactApi.js";

const initialForm = {
  email: "",
  message: "",
};

function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      await sendContactMessage(form);
      toast.success("Message sent successfully");
      setForm(initialForm);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-light_theme/40 px-4 py-12">
      <section className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="text-3xl font-black text-slate-900">Contact MediHub</h1>
          <p className="mt-2 text-slate-600">
            Send your query to the MediHub team.
          </p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Textarea
              label="Message"
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={6}
              minLength={10}
              required
            />
            <Button type="submit" disabled={submitting}>
              {submitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Card>
      </section>
    </main>
  );
}

export default ContactPage;
