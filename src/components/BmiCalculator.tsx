"use client";

import React, { useState } from "react";
import { Activity, ArrowRight, MessageSquare, Scale, Sparkles, TrendingUp } from "lucide-react";
import { cleanPhoneForWhatsApp } from "@/lib/utils";

export default function BmiCalculator() {
  const [height, setHeight] = useState<string>("170");
  const [weight, setWeight] = useState<string>("68");
  const [gender, setGender] = useState<"L" | "P">("L");
  const [calculatedBmi, setCalculatedBmi] = useState<number | null>(null);

  const gymWa = process.env.NEXT_PUBLIC_GYM_WA_NUMBER || "6285393444424";

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (h > 0 && w > 0) {
      const heightInMeters = h / 100;
      const bmi = w / (heightInMeters * heightInMeters);
      setCalculatedBmi(parseFloat(bmi.toFixed(1)));
    }
  };

  const getBmiDetails = (bmi: number) => {
    if (bmi < 18.5) {
      return {
        category: "Underweight (Berat Badan Kurang)",
        badgeColor: "text-sky-700 dark:text-sky-400 bg-sky-500/10 border-sky-500/30",
        barPercent: "15%",
        advice:
          "Fokus pada program latihan beban (Hypertrophy) untuk membangun massa otot padat, diimbangi surplus kalori kaya protein di Gymqoo Petung.",
        targetPlan: "Member 3 Bulan (Program Bulking)",
      };
    } else if (bmi <= 22.9) {
      return {
        category: "Normal / Ideal",
        badgeColor: "text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
        barPercent: "40%",
        advice:
          "Kondisi tubuh Anda sangat seimbang! Jaga kebugaran dengan kombinasi latihan beban progressive overload dan kardio rutin di Gymqoo.",
        targetPlan: "Member 1 Bulan atau 3 Bulan (Maintenance & Toning)",
      };
    } else if (bmi <= 27.4) {
      return {
        category: "Overweight (Kelebihan Berat Badan)",
        badgeColor: "text-amber-700 dark:text-amber-400 bg-amber-500/10 border-amber-500/30",
        barPercent: "68%",
        advice:
          "Disarankan kombinasi latihan beban multi-sendi (compound movements) dan sirkulasi latihan intensitas moderat di ruang ber-AC Gymqoo untuk pembakaran lemak optimal.",
        targetPlan: "Member 3 Bulan (Fat Loss & Body Recomposition)",
      };
    } else {
      return {
        category: "Obesitas / Tingkat Lanjut",
        badgeColor: "text-rose-700 dark:text-rose-400 bg-rose-500/10 border-rose-500/30",
        barPercent: "90%",
        advice:
          "Waktu yang tepat untuk memulai transformasi kesehatan secara bertahap. Mulai dengan latihan beban ringan berpanduan instruktur Gymqoo dan pola hidrasi yang cukup.",
        targetPlan: "Member 6 Bulan (Transformasi Gaya Hidup)",
      };
    }
  };

  const bmiDetails = calculatedBmi ? getBmiDetails(calculatedBmi) : null;

  const handleConsultWhatsApp = () => {
    if (!calculatedBmi || !bmiDetails) return;

    const message =
      `Halo Admin *Gymqoo Fitness Center*! 👋\n\n` +
      `Saya baru saja mencoba *Kalkulator BMI* di website Gymqoo:\n` +
      `• *Tinggi Badan:* ${height} cm\n` +
      `• *Berat Badan:* ${weight} kg\n` +
      `• *Jenis Kelamin:* ${gender === "L" ? "Pria" : "Wanita"}\n` +
      `• *Skor BMI:* ${calculatedBmi} (${bmiDetails.category})\n` +
      `• *Target Rekomendasi:* ${bmiDetails.targetPlan}\n\n` +
      `Saya ingin berkonsultasi mengenai paket keanggotaan dan jadwal latihan di meja resepsionis Gymqoo Petung. Terima kasih! 🏋️‍♂️🔥`;

    const url = `https://wa.me/${cleanPhoneForWhatsApp(gymWa)}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <section id="kalkulator-bmi" className="py-24 relative bg-slate-100/70 dark:bg-surface/20 border-t border-slate-200/80 dark:border-borderDark/60 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-lime-700 dark:text-brand-neon bg-lime-500/10 dark:bg-surface px-3 py-1 rounded-full border border-lime-500/30 dark:border-borderDark font-semibold inline-flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" />
            Fitur Interaktif
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 dark:text-white uppercase tracking-tight">
            Kalkulator BMI & Target Latihan
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base">
            Hitung indeks massa tubuh Anda dalam hitungan detik dan dapatkan rekomendasi latihan yang tepat di Gymqoo Petung.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Kolom Form Input (5 Kolom) */}
          <div className="lg:col-span-5 bg-white dark:bg-[#11131A] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-borderDark shadow-sm space-y-5">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-borderDark/60">
              <Scale className="w-5 h-5 text-lime-600 dark:text-brand-neon" />
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Masukkan Data Fisik Anda
              </h3>
            </div>

            <form onSubmit={handleCalculate} className="space-y-4">
              {/* Gender */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-zinc-300 font-semibold">
                  Jenis Kelamin
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setGender("L")}
                    className={`py-2.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                      gender === "L"
                        ? "bg-slate-900 text-white dark:bg-brand-neon dark:text-black border-transparent shadow-sm"
                        : "bg-slate-50 dark:bg-surface text-slate-600 dark:text-zinc-400 border-slate-200 dark:border-borderDark"
                    }`}
                  >
                    Laki-Laki (Pria)
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender("P")}
                    className={`py-2.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                      gender === "P"
                        ? "bg-slate-900 text-white dark:bg-brand-neon dark:text-black border-transparent shadow-sm"
                        : "bg-slate-50 dark:bg-surface text-slate-600 dark:text-zinc-400 border-slate-200 dark:border-borderDark"
                    }`}
                  >
                    Perempuan (Wanita)
                  </button>
                </div>
              </div>

              {/* Tinggi Badan */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-zinc-300 font-semibold">
                    Tinggi Badan (cm)
                  </label>
                  <span className="text-xs font-mono font-bold text-lime-700 dark:text-brand-neon">
                    {height} cm
                  </span>
                </div>
                <input
                  type="number"
                  required
                  min="100"
                  max="230"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-borderDark text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-slate-900 dark:focus:border-brand-neon"
                />
              </div>

              {/* Berat Badan */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-zinc-300 font-semibold">
                    Berat Badan (kg)
                  </label>
                  <span className="text-xs font-mono font-bold text-lime-700 dark:text-brand-neon">
                    {weight} kg
                  </span>
                </div>
                <input
                  type="number"
                  required
                  min="30"
                  max="200"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-borderDark text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-slate-900 dark:focus:border-brand-neon"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-slate-900 text-white dark:bg-brand-neon dark:text-black font-display font-extrabold text-xs uppercase tracking-wider hover:bg-black dark:hover:bg-brand-neonHover transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95"
              >
                <TrendingUp className="w-4 h-4" />
                <span>Hitung Skor BMI Saya</span>
              </button>
            </form>
          </div>

          {/* Kolom Hasil Analisis (7 Kolom) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#11131A] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-borderDark shadow-sm flex flex-col justify-between min-h-[380px]">
            {calculatedBmi && bmiDetails ? (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400 font-semibold">
                      Hasil Indeks Massa Tubuh
                    </span>
                    <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${bmiDetails.badgeColor}`}>
                      {bmiDetails.category}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-3 mt-3">
                    <span className="font-display font-black text-5xl text-slate-900 dark:text-white tracking-tight">
                      {calculatedBmi}
                    </span>
                    <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">
                      kg/m² (Standar Asia-Pasifik)
                    </span>
                  </div>
                </div>

                {/* Gauge Spectrum Bar */}
                <div className="space-y-2">
                  <div className="h-3 rounded-full bg-gradient-to-r from-sky-400 via-emerald-400 via-amber-400 to-rose-500 relative overflow-hidden">
                    <div
                      className="absolute top-0 bottom-0 w-2.5 bg-black dark:bg-white rounded-full shadow-lg border-2 border-white dark:border-black transition-all duration-500"
                      style={{ left: bmiDetails.barPercent }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 dark:text-zinc-500">
                    <span>Kurang (&lt;18.5)</span>
                    <span>Ideal (18.5-22.9)</span>
                    <span>Kelebihan (23-27.4)</span>
                    <span>Obesitas (&ge;27.5)</span>
                  </div>
                </div>

                {/* Advice Box */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-borderDark/80 space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-lime-600 dark:text-brand-neon" />
                    <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                      Rekomendasi Latihan di Gymqoo:
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                    {bmiDetails.advice}
                  </p>
                  <p className="text-xs font-mono font-bold text-lime-700 dark:text-brand-neon pt-1">
                    Saran Paket: {bmiDetails.targetPlan}
                  </p>
                </div>

                {/* Consultation Button */}
                <button
                  onClick={handleConsultWhatsApp}
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-display font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Konsultasikan Hasil BMI Ini ke WhatsApp Gymqoo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-lime-500/10 dark:bg-surface border border-lime-500/30 text-lime-600 dark:text-brand-neon flex items-center justify-center">
                  <Activity className="w-8 h-8 animate-pulse" />
                </div>
                <div className="max-w-sm space-y-1">
                  <h4 className="font-display font-bold text-base text-slate-900 dark:text-white">
                    Skor BMI Anda Akan Muncul di Sini
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                    Masukkan tinggi dan berat badan Anda pada formulir di sebelah kiri, lalu klik &quot;Hitung Skor BMI Saya&quot;.
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}

