import React, { useRef } from "react";
import ContactCTA from "../components/ContactCTA.jsx";
import ContactFAQ from "../components/ContactFAQ.jsx";
import ContactFormSection from "../components/ContactFormSection.jsx";
import ContactHero from "../components/ContactHero.jsx";
import ContactInfoCards from "../components/ContactInfoCards.jsx";
import ContactMap from "../components/ContactMap.jsx";

function ContactPage() {
  const formRef = useRef(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="bg-white">
      <ContactHero onSendClick={scrollToForm} />
      <ContactInfoCards />
      <ContactFormSection formRef={formRef} />
      <ContactMap />
      <ContactFAQ />
      <ContactCTA />
    </main>
  );
}

export default ContactPage;
