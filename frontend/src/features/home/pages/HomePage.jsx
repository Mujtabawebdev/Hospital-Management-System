import React from "react";
import AppointmentBooking from "../components/AppointmentBooking.jsx";
import CoreServices from "../components/CoreServices.jsx";
import ExpertDoctors from "../components/ExpertDoctors.jsx";
import HeroSection from "../components/HeroSection.jsx";
import HomeCTA from "../components/HomeCTA.jsx";
import HomeStats from "../components/HomeStats.jsx";
import WhyChooseUs from "../components/WhyChooseUs.jsx";

function HomePage() {
  return (
    <main className="bg-white">
      <HeroSection />
      <CoreServices />
      <AppointmentBooking />
      <HomeStats />
      <ExpertDoctors />
      <WhyChooseUs />
      <HomeCTA />
    </main>
  );
}

export default HomePage;
