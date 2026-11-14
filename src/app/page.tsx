"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Facilities from "@/components/Facilities";
import GymGallery from "@/components/GymGallery";
import Pricing from "@/components/Pricing";
import BmiCalculator from "@/components/BmiCalculator";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import LeadForm from "@/components/LeadForm";
import LocationHours from "@/components/LocationHours";
import Footer from "@/components/Footer";

export default function HomePage() {
  const [selectedPlanForForm, setSelectedPlanForForm] = useState<string>("Member 3 Bulan");

  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#090A0F] text-slate-900 dark:text-zinc-100 selection:bg-brand-neon selection:text-black transition-colors pb-16 md:pb-0">
      <Navbar />
      <Hero />
      <Facilities />
      <GymGallery />
      <Pricing onSelectPlan={(plan) => setSelectedPlanForForm(plan)} />
      <BmiCalculator />
      <Testimonials />
      <FAQ />
      <LeadForm selectedPlan={selectedPlanForForm} />
      <LocationHours />
      <Footer />
    </main>
  );
}
