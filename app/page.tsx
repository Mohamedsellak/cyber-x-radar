import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import About from "../components/About";
import AsSeenOn from "../components/AsSeenOn";
// import Services from "../components/Services";
// import Partnership from "../components/Partnership";
// import FreeTools from "../components/FreeTools";
// import GetStarted from "../components/GetStarted";
// import WhyChooseUs from "../components/WhyChooseUs";
// import FAQ from "../components/FAQ";
// import Statistics from "../components/Statistics";
// import Integrations from "../components/Integrations";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A1F] text-white">
      <Navbar />
      <Hero />
      <AsSeenOn />
      <About />
      {/* <Services />
      <Partnership />
      <Statistics />
      <FreeTools />
      <Integrations />
      <GetStarted />
      <WhyChooseUs />
      <FAQ /> */}
      <Footer />
    </div>
  );
}
