"use client";

import React, { useState } from "react";
import { MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { initialPlans } from "@/lib/mock-data";
import { cleanPhoneForWhatsApp } from "@/lib/utils";
import { saveLeadInquiry } from "@/lib/db";

interface LeadFormProps {
  selectedPlan?: string;
}

export default function LeadForm({ selectedPlan = "Monthly Membership (1 Bulan)" }: LeadFormProps) {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [planChoice, setPlanChoice] = useState(selectedPlan);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    if (selectedPlan) {
      setPlanChoice(selectedPlan);
    }
  }, [selectedPlan]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phoneNumber) return;

    const gymWa = process.env.NEXT_PUBLIC_GYM_WA_NUMBER || "6285393444424";
    const gymName = process.env.NEXT_PUBLIC_GYM_NAME || "Gymqoo";

    const text =
      `Halo Admin *${gymName}*! 👋\n\n` +
      `Saya tertarik untuk mendaftar membership gym:\n` +
      `• *Nama:* ${fullName}\n` +
      `• *No. WhatsApp:* ${phoneNumber}\n` +
      `• *Pilihan Paket:* ${planChoice}\n` +
      (notes ? `• *Pertanyaan/Catatan:* ${notes}\n\n` : `\n`) +
      `Mohon info langkah pendaftaran berikutnya di meja resepsionis ya. Terima kasih! 🔥🏋️‍♂️`;

    const waUrl = `https://wa.me/${cleanPhoneForWhatsApp(gymWa)}?text=${encodeURIComponent(text)}`;

    // Save lead inquiry to Supabase & localStorage
    saveLeadInquiry({
      full_name: fullName,
      phone_number: phoneNumber,
      plan_interest: planChoice,
      notes,
    });

    try {
      const existing = JSON.parse(localStorage.getItem("gym_leads") || "[]");
      existing.unshift({
        id: "lead-" + Date.now(),
        full_name: fullName,
        phone_number: phoneNumber,
        plan_interest: planChoice,
        notes,
        created_at: new Date().toISOString(),
      });
      localStorage.setItem("gym_leads", JSON.stringify(existing));
    } catch {
      // LocalStorage fallback
    }

    setSubmitted(true);
    window.open(waUrl, "_blank");

    setTimeout(() => {
      setSubmitted(false);
      setFullName("");
      setPhoneNumber("");
      setNotes("");
    }, 4000);
  };

  return (
    <section id="daftar" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border-slate-200/80 dark:border-borderDark relative overflow-hidden shadow-xl">
          {/* Subtle accent glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-lime-500/10 dark:bg-brand-neon/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-xl mx-auto mb-10 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-lime-700 dark:text-brand-neon bg-lime-500/10 dark:bg-surface px-3 py-1 rounded-full border border-lime-500/30 dark:border-borderDark inline-flex items-center gap-1.5 font-semibold">
              <MessageSquare className="w-3.5 h-3.5" />
              Pendaftaran Minat Instan
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white uppercase tracking-tight">
              Konsultasikan Minat Membership Anda
            </h2>
            <p className="text-slate-600 dark:text-zinc-400 text-sm">
              Isi data di bawah ini, sistem akan otomatis menghubungkan Anda dengan WhatsApp Resepsionis Gymqoo (0853-9344-4424) untuk konfirmasi jadwal kunjungan dan kartu member.
            </p>
          </div>

          {submitted ? (
            <div className="bg-lime-500/10 border border-lime-500/40 dark:border-brand-neon/40 rounded-2xl p-8 text-center space-y-3 animate-fade-in">
              <CheckCircle2 className="w-12 h-12 text-lime-600 dark:text-brand-neon mx-auto" />
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                Membuka Percakapan WhatsApp...
              </h3>
              <p className="text-slate-600 dark:text-zinc-300 text-sm max-w-md mx-auto">
                Silakan lanjutkan percakapan di aplikasi WhatsApp Anda untuk konfirmasi aktivasi kartu member di meja resepsionis Gymqoo.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Nama */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-zinc-300 font-semibold">
                    Nama Lengkap <span className="text-lime-600 dark:text-brand-neon">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Prasetyo"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-borderDark text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-900 dark:focus:border-brand-neon text-sm transition-all"
                  />
                </div>

                {/* No WhatsApp */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-zinc-300 font-semibold">
                    Nomor WhatsApp Aktif <span className="text-lime-600 dark:text-brand-neon">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 081234567890"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-borderDark text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-900 dark:focus:border-brand-neon text-sm transition-all font-mono"
                  />
                </div>
              </div>

              {/* Pilihan Paket */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-zinc-300 font-semibold">
                  Paket Membership Yang Diminati
                </label>
                <select
                  value={planChoice}
                  onChange={(e) => setPlanChoice(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-borderDark text-slate-900 dark:text-white focus:outline-none focus:border-slate-900 dark:focus:border-brand-neon text-sm transition-all"
                >
                  {initialPlans.map((p) => (
                    <option key={p.id} value={p.name} className="bg-white dark:bg-surface text-slate-900 dark:text-white">
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Catatan / Pertanyaan */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-zinc-300 font-semibold">
                  Catatan Tambahan (Opsional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Misal: Apakah ada program pendampingan untuk pemula atau jadwal jam ramai?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-borderDark text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-900 dark:focus:border-brand-neon text-sm transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl font-display font-bold text-sm uppercase tracking-wider bg-slate-900 text-white hover:bg-black dark:bg-brand-neon dark:text-black dark:hover:bg-brand-neonHover transition-all flex items-center justify-center gap-2 shadow-md dark:shadow-[0_0_25px_rgba(204,255,0,0.25)] hover:scale-[1.01]"
              >
                <Send className="w-4 h-4" />
                Kirim & Buka Chat WhatsApp Resepsionis
              </button>

              <p className="text-center text-[11px] text-slate-500 dark:text-zinc-500 font-mono">
                Data Anda aman dan hanya digunakan untuk verifikasi pendaftaran di meja resepsionis Gymqoo Petung.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
