"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, Zap, Star, CheckCircle2 } from "lucide-react";
import ThreeDumbbell from "./ThreeDumbbell";

export default function Hero() {
  const gymWa = process.env.NEXT_PUBLIC_GYM_WA_NUMBER || "6285393444424";
  const defaultWaUrl = `https://wa.me/${gymWa}?text=${encodeURIComponent(
    "Halo Admin Gymqoo! Saya ingin tanya info pendaftaran member dan jadwal latihan di Petung."
  )}`;

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background radial glow & grid */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-lime-500/10 dark:bg-brand-neon/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#11131a_1px,transparent_1px),linear-gradient(to_bottom,#11131a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 dark:opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & Actions */}
          <motion.div
            className="lg:col-span-7 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Badges: Gym category + Rating */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-500/10 dark:bg-surface border border-lime-500/30 dark:border-brand-neon/30 text-lime-700 dark:text-brand-neon text-xs font-mono font-semibold tracking-wide">
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>GYMQOO FITNESS CENTER</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 dark:bg-surface border border-amber-500/30 dark:border-borderDark text-amber-700 dark:text-amber-300 text-xs font-mono font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>4.5 / 5.0 Rating Ulasan</span>
              </div>
            </div>

            <h1 className="font-display  font-black text-4xl sm:text-5xl lg:text-5xl tracking-tight text-slate-900 dark:text-white uppercase leading-[1.05]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-600 to-emerald-600 dark:from-brand-neon dark:via-lime-200 dark:to-white">

                GYMQOO
              </span>{" "}

              Pusat Kebugaran{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-600 to-emerald-600 dark:from-brand-neon dark:via-lime-200 dark:to-white">
                Terlengkap
              </span>{" "}
              di Petung, Penajam.
            </h1>

            <p className="text-slate-600 dark:text-zinc-400 text-base sm:text-lg max-w-xl leading-relaxed text-align" >
              Selamat datang di <strong className="text-slate-900 dark:text-white">Gymqoo</strong>. Ruang latihan ber-AC dengan pencahayaan terang,
              peralatan strength training lengkap (dumbbell, barbell, bench press & mesin beban tertata rapi), serta area parkir nyaman di depan gedung.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#paket"
                className="px-8 py-4 rounded-xl font-display font-bold text-sm uppercase tracking-wider bg-slate-900 text-white hover:bg-black dark:bg-brand-neon dark:text-black dark:hover:bg-brand-neonHover transition-all flex items-center justify-center gap-2 shadow-md dark:shadow-[0_0_25px_rgba(204,255,0,0.3)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Pilihan Paket Membership
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={defaultWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-4 rounded-xl font-display font-semibold text-sm uppercase tracking-wider bg-white dark:bg-surface border border-slate-200 dark:border-borderDark text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-surfaceHover dark:hover:border-brand-neon/50 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-lime-600 dark:text-brand-neon" />
                WhatsApp Admin (0853-9344-4424)
              </a>
            </div>

            {/* Micro Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-borderDark/60">
              <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-zinc-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-lime-600 dark:text-brand-neon flex-shrink-0" />
                <span>Full AC & Kipas Sirkulasi</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-zinc-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-lime-600 dark:text-brand-neon flex-shrink-0" />
                <span>Alat Beban Rapi & Terawat</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-zinc-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-lime-600 dark:text-brand-neon flex-shrink-0" />
                <span>Parkir Depan Luas</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Interactive Three.js Dumbbell */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <div className="relative glass-panel rounded-3xl p-4 border-slate-200 dark:border-borderDark/80 shadow-xl dark:shadow-2xl overflow-hidden">
              <ThreeDumbbell />
            </div>
          </motion.div>
        </div>

        {/* Big Numbers Stat Strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 p-6 sm:p-8 rounded-2xl glass-panel border border-slate-200/80 dark:border-borderDark shadow-sm">
          <div className="space-y-1">
            <span className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">4.5 / 5</span>
            <p className="text-xs uppercase tracking-wider font-mono text-lime-600 dark:text-brand-neon font-semibold">Rating Ulasan Pengunjung</p>
          </div>
          <div className="space-y-1">
            <span className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">08.30-21.00</span>
            <p className="text-xs uppercase tracking-wider font-mono text-lime-600 dark:text-brand-neon font-semibold">WITA (Senin - Minggu)</p>
          </div>
          <div className="space-y-1">
            <span className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">Full AC</span>
            <p className="text-xs uppercase tracking-wider font-mono text-lime-600 dark:text-brand-neon font-semibold">Pencahayaan Terang & Nyaman</p>
          </div>
          <div className="space-y-1">
            <span className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">Petung, PPU</span>
            <p className="text-xs uppercase tracking-wider font-mono text-lime-600 dark:text-brand-neon font-semibold">Penajam Paser Utara, Kaltim</p>
          </div>
        </div>
      </div>
    </section>
  );
}
