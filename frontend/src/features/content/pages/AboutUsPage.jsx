import React from "react";
import { Card } from "../../../shared/components/ui";

const sections = [
  {
    title: "Welcome to Our Platform",
    titleClassName: "text-blue-800",
    cardClassName: "bg-blue-100",
    body: "A web-based platform facilitating seamless management of healthcare services, including appointments, patient records, and doctor interactions.",
  },
  {
    title: "Secure User Authentication",
    titleClassName: "text-green-800",
    cardClassName: "bg-green-100",
    body: "Implemented robust user authentication and authorization functionalities to ensure secure access to patient and doctor and admin portals.",
  },
  {
    title: "File Upload Management with Cloud Services",
    titleClassName: "text-yellow-800",
    cardClassName: "bg-yellow-100",
    body: "Utilized Multer and integrated Cloudinary to efficiently handle file uploads, particularly images, ensuring optimal storage, retrieval, and user experience.",
  },
  {
    title: "Version Control with Git",
    titleClassName: "text-purple-800",
    cardClassName: "bg-purple-100",
    body: "Utilized Git for version control, enabling efficient project tracking and management of code changes throughout the development lifecycle.",
  },
  {
    title: "Admin Dashboard Development",
    titleClassName: "text-red-800",
    cardClassName: "bg-red-100",
    body: "Developed an intuitive admin dashboard facilitating user management, appointment scheduling, and data analytics, empowering administrators with comprehensive control and insights.",
  },
];

function AboutUsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">About Us</h1>
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

export default AboutUsPage;
