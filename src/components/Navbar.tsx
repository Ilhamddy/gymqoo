"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Dumbbell, Home, Layers, CreditCard, MapPin, Shield } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const fasilitas = document.getElementById("fasilitas");
      const paket = document.getElementById("paket");
      const lokasi = document.getElementById("lokasi");

      if (lokasi && scrollPos >= lokasi.offsetTop) {
        setActiveSection("lokasi");
      } else if (paket && scrollPos >= paket.offsetTop) {
        setActiveSection("paket");
      } else if (fasilitas && scrollPos >= fasilitas.offsetTop) {
        setActiveSection("fasilitas");
      } else {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ======================================================== */}
      {/* 1. DESKTOP FLOATING PILL DOCK NAVBAR (Sesuai Referensi) */}
      {/* ======================================================== */}
      <header className="fixed top-5 left-0 right-0 z-50 hidden md:flex justify-center pointer-events-none px-4">
        <nav className="pointer-events-auto inline-flex items-center gap-1.5 p-1.5 pl-2 pr-2.5 rounded-full bg-[#18181B]/95 dark:bg-[#11131A]/95 text-white border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-200">
          {/* Circular Logo Avatar Badge */}
          <Link
            href="/"
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-transform flex-shrink-0 shadow-sm"
            title="Gymqoo Home"
          >
            <Dumbbell className="w-4 h-4 -rotate-45" />
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1 sm:gap-2 px-3 text-xs font-medium text-zinc-300">
            <a
              href="#fasilitas"
              className={`px-3 py-1.5 rounded-full transition-colors hover:text-white ${
                activeSection === "fasilitas" ? "text-lime-400 font-semibold" : ""
              }`}
            >
              Fasilitas
            </a>
            <a
              href="#paket"
              className={`px-3 py-1.5 rounded-full transition-colors hover:text-white ${
                activeSection === "paket" ? "text-lime-400 font-semibold" : ""
              }`}
            >
              Paket
            </a>
            <a
              href="#kalkulator-bmi"
              className="px-3 py-1.5 rounded-full transition-colors hover:text-white hidden lg:inline-block"
            >
              BMI
            </a>
            <a
              href="#faq"
              className="px-3 py-1.5 rounded-full transition-colors hover:text-white hidden xl:inline-block"
            >
              FAQ
            </a>
            <a
              href="#lokasi"
              className={`px-3 py-1.5 rounded-full transition-colors hover:text-white ${
                activeSection === "lokasi" ? "text-lime-400 font-semibold" : ""
              }`}
            >
              Lokasi & Jam
            </a>
            <Link
              href="/admin"
              className="px-3 py-1.5 rounded-full transition-colors text-zinc-400 hover:text-white flex items-center gap-1"
            >
              <Shield className="w-3 h-3 text-lime-400" />
              <span>Resepsionis</span>
            </Link>
          </div>

          {/* Right Action Pill Button (White Capsule) */}
          <a
            href="#daftar"
            className="px-4 py-2 rounded-full bg-white text-black font-semibold text-xs tracking-wide hover:bg-zinc-200 active:scale-95 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>Daftar / WA</span>
          </a>

          {/* Theme Toggle Button inside Dock */}
          <div className="pl-1">
            <ThemeToggle variant="dock" />
          </div>
        </nav>
      </header>

      {/* ======================================================== */}
      {/* 2. MOBILE TOP MINIMAL BRAND BAR                          */}
      {/* ======================================================== */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 px-4 py-3 bg-white/90 dark:bg-[#090A0F]/90 backdrop-blur-md border-b border-slate-200 dark:border-borderDark flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-surface flex items-center justify-center text-brand-neon">
            <Dumbbell className="w-4 h-4 -rotate-45" />
          </div>
          <span className="font-display font-extrabold text-base tracking-wider text-slate-900 dark:text-white">
            GYM<span className="text-lime-600 dark:text-brand-neon">QOO</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#daftar"
            className="px-3 py-1.5 rounded-full bg-slate-900 text-white dark:bg-brand-neon dark:text-black text-xs font-bold font-display"
          >
            Daftar
          </a>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. MOBILE BOTTOM FIXED NAVIGATION DOCK (Sesuai Referensi) */}
      {/* ======================================================== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#11131A]/95 backdrop-blur-xl border-t border-slate-200 dark:border-borderDark px-3 py-2 shadow-[0_-8px_30px_rgba(0,0,0,0.12)]">
        <div className="grid grid-cols-5 items-center justify-items-center">
          {/* 1. Home */}
          <a
            href="#"
            className={`flex flex-col items-center gap-1 py-1 text-[11px] font-medium transition-colors ${
              activeSection === "home"
                ? "text-lime-600 dark:text-brand-neon font-bold"
                : "text-slate-500 dark:text-zinc-400"
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </a>

          {/* 2. Fasilitas */}
          <a
            href="#fasilitas"
            className={`flex flex-col items-center gap-1 py-1 text-[11px] font-medium transition-colors ${
              activeSection === "fasilitas"
                ? "text-lime-600 dark:text-brand-neon font-bold"
                : "text-slate-500 dark:text-zinc-400"
            }`}
          >
            <Layers className="w-5 h-5" />
            <span>Fasilitas</span>
          </a>

          {/* 3. Paket (Highlight Icon Center) */}
          <a
            href="#paket"
            className={`flex flex-col items-center gap-1 py-1 text-[11px] font-medium transition-colors ${
              activeSection === "paket"
                ? "text-lime-600 dark:text-brand-neon font-bold"
                : "text-slate-500 dark:text-zinc-400"
            }`}
          >
            <CreditCard className="w-5 h-5" />
            <span>Paket</span>
          </a>

          {/* 4. Lokasi */}
          <a
            href="#lokasi"
            className={`flex flex-col items-center gap-1 py-1 text-[11px] font-medium transition-colors ${
              activeSection === "lokasi"
                ? "text-lime-600 dark:text-brand-neon font-bold"
                : "text-slate-500 dark:text-zinc-400"
            }`}
          >
            <MapPin className="w-5 h-5" />
            <span>Lokasi</span>
          </a>

          {/* 5. Resepsionis Admin */}
          <Link
            href="/admin"
            className="flex flex-col items-center gap-1 py-1 text-[11px] font-medium text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <Shield className="w-5 h-5 text-lime-600 dark:text-brand-neon" />
            <span>Staff</span>
          </Link>
        </div>
      </div>
    </>
  );
}
