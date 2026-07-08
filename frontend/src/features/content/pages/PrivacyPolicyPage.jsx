import React from "react";
import { Card } from "../../../shared/components/ui";

const sections = [
  {
    title: "Purpose of Information",
    titleClassName: "text-blue-800",
    cardClassName: "bg-blue-100",
    body: "Clearly state the purpose for which the collected information will be used. For instance, scheduling appointments, communicating test results, etc.",
  },
  {
    title: "Cookies and Tracking",
    titleClassName: "text-blue-800",
    cardClassName: "bg-blue-50",
    body: "Explain if your website uses cookies or other tracking technologies, and how they are used to enhance the user experience. Provide users with options to manage cookie preferences.",
  },
  {
    title: "Children's Privacy",
    titleClassName: "text-blue-800",
    cardClassName: "bg-blue-100",
    body: "If your website collects information from children under the age of 13, comply with relevant laws such as the Children's Online Privacy Protection Act (COPPA).",
  },
  {
    title: "Contact Information",
    titleClassName: "text-blue-800",
    cardClassName: "bg-blue-50",
    body: "Provide contact details for users to reach out with questions or concerns about the privacy policy or their personal data.",
  },
  {
    title: "Updates to Privacy Policy",
    titleClassName: "text-red-800",
    cardClassName: "bg-red-100",
    body: "State that the privacy policy may be updated from time to time, and how users will be notified of any changes.",
  },
  {
    title: "User Rights",
    titleClassName: "text-blue-800",
    cardClassName: "bg-blue-100",
    body: "Inform users about their rights regarding their personal data, including the right to access, update, or delete their information.",
  },
];

function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Privacy Policy</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Card key={section.title} className={`p-6 rounded-lg ${section.cardClassName}`}>
            <h2 className={`text-xl font-semibold mb-2 ${section.titleClassName}`}>
              {section.title}
            </h2>
            <p className="text-gray-700">{section.body}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;
