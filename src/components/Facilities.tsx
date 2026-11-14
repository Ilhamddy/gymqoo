"use client";

import React from "react";
import { Dumbbell, Wind, SunMedium, Car, Sparkles, ShieldCheck } from "lucide-react";

const facilities = [
  {
    icon: Dumbbell,
    title: "Rak Dumbbell & Free Weights",
    desc: "Koleksi dumbbell berbagai bobot berat berjejer rapi di rak khusus, siap untuk isolasi otot bisep, bahu, dada, dan punggung.",
    tag: "STRENGTH",
  },
  {
    icon: ShieldCheck,
    title: "Barbell & Bench Press Station",
    desc: "Peralatan bench press (flat/incline) dan barbel kokoh untuk latihan compound seperti bench press, squats, dan deadlifts.",
    tag: "COMPOUND",
  },
  {
    icon: Sparkles,
    title: "Mesin Beban Tertata Rapi",
    desc: "Mesin latihan beban mekanis (lat pulldown, seated rows, leg extension, cable machine) tersusun rapi dan terawat untuk kenyamanan gerak.",
    tag: "MACHINES",
  },
  {
    icon: Wind,
    title: "Full AC & Kipas Sirkulasi Udara",
    desc: "Dilengkapi pendingin ruangan (AC) bertenaga serta kipas sirkulasi udara aktif agar ruangan tetap sejuk, segar, dan tidak pengap saat intensitas tinggi.",
    tag: "AIR FLOW",
  },
  {
    icon: SunMedium,
    title: "Pencahayaan Terang & Bersih",
    desc: "Lampu terang dan tata letak interior yang bersih, menciptakan suasana latihan yang fokus, aman, dan bersemangat.",
    tag: "AMBIENCE",
  },
  {
    icon: Car,
    title: "Toilet (Restroom) & Parkir Depan",
    desc: "Tersedia fasilitas toilet bersih untuk pengguna serta area parkir motor dan mobil langsung di depan gedung Gymqoo.",
    tag: "FACILITIES",
  },
];

export default function Facilities() {
  return (
    <section id="fasilitas" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-lime-700 dark:text-brand-neon bg-lime-500/10 dark:bg-surface px-3 py-1 rounded-full border border-lime-500/30 dark:border-borderDark font-semibold">
            Fasilitas & Peralatan Gymqoo
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 dark:text-white uppercase tracking-tight">
            Peralatan Lengkap, Rapi & Sejuk
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base">
            Latihan lebih nyaman dengan pendingin AC, kipas sirkulasi udara aktif, dan peralatan strength training yang tertata rapi.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="group p-8 rounded-2xl glass-panel glass-panel-hover transition-all duration-200 relative overflow-hidden flex flex-col justify-between shadow-sm"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-surface border border-slate-200 dark:border-borderDark flex items-center justify-center text-lime-600 dark:text-brand-neon group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono tracking-widest uppercase text-slate-600 dark:text-zinc-500 bg-slate-100 dark:bg-surface px-2.5 py-1 rounded-md border border-slate-200 dark:border-borderDark/40 font-semibold">
                    {f.tag}
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white group-hover:text-lime-600 dark:group-hover:text-brand-neon transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-borderDark/50 flex items-center justify-between text-xs text-slate-500 dark:text-zinc-500">
                  <span>Gymqoo Petung</span>
                  <span className="text-lime-600 dark:text-brand-neon font-mono font-bold">0{i + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
