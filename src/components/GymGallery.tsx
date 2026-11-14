"use client";

import React, { useState } from "react";
import { Dumbbell, Wind, Layers, ShieldCheck, Sparkles, Car } from "lucide-react";

interface GalleryZone {
  id: string;
  category: "WEIGHTS" | "MACHINES" | "COMFORT" | "PARKING";
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  gradient: string;
}

const zones: GalleryZone[] = [
  {
    id: "zone-1",
    category: "WEIGHTS",
    title: "Area Free Weights & Dumbbell",
    subtitle: "Dumbbell Set 2.5 KG – 30 KG & Olympic Barbells",
    description:
      "Dilengkapi rak dumbbell karet hexagonal berstandar kebugaran komersial, barbel olimpiade, serta deretan flat bench dan adjustable incline bench untuk variasi latihan otot bebas.",
    icon: <Dumbbell className="w-5 h-5" />,
    tags: ["Hex Dumbbells", "Olympic Barbells", "Adjustable Bench"],
    gradient: "from-zinc-900 to-zinc-950 dark:from-[#11131A] dark:to-[#0A0B10]",
  },
  {
    id: "zone-2",
    category: "MACHINES",
    title: "Area Mesin Beban & Cable Station",
    subtitle: "Smith Machine, Lat Pulldown, & Multi-Cable Pulley",
    description:
      "Stasiun mesin beban lengkap untuk melatih dada, punggung, bahu, dan kaki secara terarah dengan pengamanan maksimal bagi pemula maupun binaraga berpengalaman.",
    icon: <Layers className="w-5 h-5" />,
    tags: ["Smith Machine", "Cable Crossover", "Leg Press"],
    gradient: "from-zinc-900 to-zinc-950 dark:from-[#11131A] dark:to-[#0A0B10]",
  },
  {
    id: "zone-3",
    category: "COMFORT",
    title: "Ruang Full AC & Kipas Sirkulasi Udara",
    subtitle: "Suhu Terjaga Sejuk & Udara Selalu Segar Bebas Pengap",
    description:
      "Dilengkapi unit pendingin ruangan (AC) yang dingin dan kipas blower sirkulasi udara besar, memastikan oksigen mengalir lancar sehingga Anda tetap segar saat latihan repetisi tinggi.",
    icon: <Wind className="w-5 h-5" />,
    tags: ["Multi-Unit AC", "Kipas Blower Kencang", "Bebas Pengap"],
    gradient: "from-zinc-900 to-zinc-950 dark:from-[#11131A] dark:to-[#0A0B10]",
  },
  {
    id: "zone-4",
    category: "PARKING",
    title: "Akses Parkir Luas & Restroom Bersih",
    subtitle: "Parkir Langsung di Depan Gedung Gymqoo",
    description:
      "Lokasi Jl. Mawar No. 10 Petung menyediakan area parkir motor dan mobil luas tepat di depan pintu masuk meja resepsionis, serta toilet (restroom) yang bersih dan terawat.",
    icon: <Car className="w-5 h-5" />,
    tags: ["Parkir Depan Gedung", "Toilet Bersih", "Aman & Nyaman"],
    gradient: "from-zinc-900 to-zinc-950 dark:from-[#11131A] dark:to-[#0A0B10]",
  },
];

export default function GymGallery() {
  const [activeTab, setActiveTab] = useState<"ALL" | "WEIGHTS" | "MACHINES" | "COMFORT" | "PARKING">("ALL");

  const filteredZones = zones.filter((z) => {
    if (activeTab === "ALL") return true;
    return z.category === activeTab;
  });

  return (
    <section id="galeri" className="py-24 relative bg-slate-100/60 dark:bg-surface/30 border-t border-slate-200/80 dark:border-borderDark/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-lime-700 dark:text-brand-neon bg-lime-500/10 dark:bg-surface px-3 py-1 rounded-full border border-lime-500/30 dark:border-borderDark font-semibold inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Eksplorasi Fasilitas
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 dark:text-white uppercase tracking-tight">
            Suasana Area Latihan Gymqoo
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base">
            Dirancang untuk kenyamanan, higienitas, dan hasil latihan optimal di Petung, Penajam Paser Utara.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {(
            [
              { id: "ALL", label: "Semua Fasilitas" },
              { id: "WEIGHTS", label: "Free Weights" },
              { id: "MACHINES", label: "Mesin Beban" },
              { id: "COMFORT", label: "AC & Sirkulasi" },
              { id: "PARKING", label: "Parkir & Restroom" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-slate-900 text-white dark:bg-brand-neon dark:text-black shadow-md font-bold"
                  : "bg-white dark:bg-[#11131A] text-slate-700 dark:text-zinc-400 border border-slate-200 dark:border-borderDark hover:border-slate-400 dark:hover:border-zinc-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {filteredZones.map((zone) => (
            <div
              key={zone.id}
              className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#11131A] border border-slate-200 dark:border-borderDark/90 shadow-sm hover:shadow-xl hover:border-lime-500/50 dark:hover:border-brand-neon/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-lime-500/10 dark:bg-surface border border-lime-500/30 dark:border-borderDark flex items-center justify-center text-lime-600 dark:text-brand-neon shadow-inner">
                    {zone.icon}
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-slate-100 dark:bg-surface border border-slate-200 dark:border-borderDark text-slate-600 dark:text-zinc-400 font-semibold">
                    Gymqoo Area
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white">
                    {zone.title}
                  </h3>
                  <p className="text-xs font-mono text-lime-700 dark:text-brand-neon font-semibold mt-1">
                    {zone.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 mt-3 leading-relaxed">
                    {zone.description}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-borderDark/60 flex flex-wrap gap-2">
                {zone.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-mono px-3 py-1 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-borderDark text-slate-700 dark:text-zinc-300 font-medium"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

