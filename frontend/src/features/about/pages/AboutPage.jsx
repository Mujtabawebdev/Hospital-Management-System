import React from "react";
import AboutCTA from "../components/AboutCTA.jsx";
import AboutHero from "../components/AboutHero.jsx";
import FeatureCards from "../components/FeatureCards.jsx";
import StatsSection from "../components/StatsSection.jsx";
import WhoWeAre from "../components/WhoWeAre.jsx";

function AboutPage() {
  return (
    <main className="bg-white">
      <AboutHero />
      <WhoWeAre />
      <FeatureCards />
      <StatsSection />
      <AboutCTA />
    </main>
  );
}

export default AboutPage;
