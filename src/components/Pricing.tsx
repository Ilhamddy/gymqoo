"use client";

import React, { useState } from "react";
import { Check, Zap, Sparkles, Clock, ShieldCheck, Ticket } from "lucide-react";
import { initialPlans } from "@/lib/mock-data";
import { formatRupiah } from "@/lib/utils";

interface PricingProps {
  onSelectPlan?: (planName: string) => void;
}

export default function Pricing({ onSelectPlan }: PricingProps) {
  const [billingType, setBillingType] = useState<"MEMBERSHIP" | "ALL">("MEMBERSHIP");

  const handleChoose = (planName: string) => {
    if (onSelectPlan) {
      onSelectPlan(planName);
    }
    const el = document.getElementById("daftar");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Daily Pass (Non-Membership)
  const dailyPlan = initialPlans.find((p) => p.id === "plan-daily") || initialPlans[0];

  // 4 Core Membership Plans (1 Bulan, 3 Bulan, 6 Bulan, 12 Bulan) -> 100% Symmetrical (4 Columns)
  const membershipPlans = initialPlans.filter((p) => p.id !== "plan-daily");

  return (
    <section
      id="paket"
      className="py-24 relative bg-slate-100/70 dark:bg-surface/30 border-y border-slate-200/80 dark:border-borderDark/60 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-lime-700 dark:text-brand-neon bg-lime-500/10 dark:bg-surface px-3 py-1 rounded-full border border-lime-500/30 dark:border-borderDark font-semibold">
            Investasi Kesehatan & Kebugaran
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 dark:text-white uppercase tracking-tight">
            Pilihan Paket Keanggotaan
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base">
            Tanpa biaya registrasi tersembunyi. Akses penuh ke seluruh area beban dan ruang ber-AC Gymqoo Petung.
          </p>
        </div>

        {/* ======================================================== */}
        {/* BANNER TIKET HARIAN (DAILY PASS) — SIMETRIS DI TENGAH    */}
        {/* ======================================================== */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-borderDark shadow-sm hover:border-lime-500/40 transition-all flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-lime-500/15 border border-lime-500/30 text-lime-700 dark:text-brand-neon flex items-center justify-center flex-shrink-0 shadow-inner">
                <Ticket className="w-6 h-6" />
              </div>
              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                    {dailyPlan.name}
                  </h3>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-slate-900 text-white dark:bg-brand-neon dark:text-black font-extrabold">
                    {formatRupiah(dailyPlan.price)} / Hari
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1">
                  Hanya ingin coba latihan tanpa komitmen bulanan? Akses 1 hari bebas ke seluruh mesin, beban, dan ruang full AC.
                </p>
              </div>
            </div>

            <button
              onClick={() => handleChoose(dailyPlan.name)}
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-brand-neon dark:text-black font-display font-bold text-xs uppercase tracking-wider hover:bg-black dark:hover:bg-brand-neonHover transition-all flex items-center gap-1.5 flex-shrink-0 shadow-sm hover:scale-105 active:scale-95"
            >
              <span>Pilih Daily Pass</span>
              <Zap className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* GRID 4 PAKET MEMBERSHIP UTAMA — 100% SIMETRIS SEMPURNA   */}
        {/* Desktop: 4 Kolom Rata (1 Baris)                          */}
        {/* Tablet: 2x2 Kolom Rata (2 Baris x 2 Kartu)               */}
        {/* Mobile: 1 Kolom Rata                                     */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {membershipPlans.map((plan) => {
            const isPopular = plan.popular;

            return (
              <div
                key={plan.id}
                className={`glass-panel rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 relative shadow-md hover:shadow-xl ${
                  isPopular
                    ? "border-lime-500/80 dark:border-brand-neon/80 ring-2 ring-lime-500/20 dark:ring-brand-neon/20 bg-white/95 dark:bg-[#12141F]"
                    : "border-slate-200/90 dark:border-borderDark/90 hover:border-slate-400 dark:hover:border-zinc-700 bg-white/80 dark:bg-[#11131A]/90"
                }`}
              >
                {/* Popular or best value badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5 ${
                        isPopular
                          ? "bg-slate-900 text-white dark:bg-brand-neon dark:text-black"
                          : "bg-slate-800 text-slate-200 dark:bg-surface border border-slate-700 dark:border-borderDark"
                      }`}
                    >
                      <Sparkles className="w-3 h-3 fill-current text-lime-400 dark:text-black" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="flex flex-col flex-1">
                  {/* Card Header (Fixed height to keep price line perfectly horizontal) */}
                  <div className="mb-4 min-h-[58px] flex flex-col justify-start">
                    <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white leading-snug">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 font-mono mt-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-lime-600 dark:text-brand-neon" />
                      <span>Masa Aktif: {plan.duration_days} Hari</span>
                    </p>
                  </div>

                  {/* Price Box (Fixed height & aligned baseline) */}
                  <div className="mb-6 pt-3 pb-4 border-y border-slate-100 dark:border-borderDark/80 min-h-[70px] flex items-center">
                    <span className="font-display font-black text-2xl sm:text-3xl lg:text-3xl text-slate-900 dark:text-white tracking-tight">
                      {plan.price_display ? plan.price_display : formatRupiah(plan.price)}
                    </span>
                  </div>

                  {/* Features List (flex-1 so the button at the bottom always aligns perfectly) */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feat, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-zinc-300 leading-relaxed"
                      >
                        <Check className="w-4 h-4 text-lime-600 dark:text-brand-neon flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Button (Anchored at exact bottom) */}
                <button
                  onClick={() => handleChoose(plan.name)}
                  className={`w-full py-3.5 rounded-2xl font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    isPopular
                      ? "bg-slate-900 text-white hover:bg-black dark:bg-brand-neon dark:text-black dark:hover:bg-brand-neonHover shadow-lg dark:shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:scale-[1.02] active:scale-95"
                      : "bg-slate-100 hover:bg-slate-200 dark:bg-surface border border-slate-200 dark:border-borderDark text-slate-800 dark:text-white hover:border-slate-900 dark:hover:border-brand-neon/60 dark:hover:text-brand-neon hover:scale-[1.01] active:scale-95"
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  {plan.is_coming_soon ? "Tanya Admin WA" : "Pilih Paket Ini"}
                </button>
              </div>
            );
          })}
        </div>

        {/* Section Footer */}
        <div className="mt-12 text-center flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-zinc-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            Tanpa Biaya Admin & Bebas Gimmick
          </span>
          <span>•</span>
          <span>Pembayaran Tunai di Meja Resepsionis Gymqoo atau Transfer Bank Resmi</span>
        </div>

      </div>
    </section>
  );
}
