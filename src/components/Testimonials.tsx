"use client";

import React from "react";
import { Star, Quote, CheckCircle2, ExternalLink } from "lucide-react";

interface Review {
  id: string;
  name: string;
  role: string;
  avatarText: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

const reviews: Review[] = [
  {
    id: "rev-1",
    name: "Bagas Prasetyo",
    role: "Member Rutin (6 Bulan)",
    avatarText: "BP",
    rating: 5,
    date: "1 bulan lalu",
    comment:
      "Tempat gym paling nyaman di Petung. Ruangannya full AC dan sirkulasi udaranya kencang pakai kipas blower jadi nggak ada rasa pengap sama sekali walaupun lagi rame sore hari. Beban dan mesin kabelnya juga terawat sangat baik.",
    verified: true,
  },
  {
    id: "rev-2",
    name: "Nurul Aulia",
    role: "Member 3 Bulan",
    avatarText: "NA",
    rating: 5,
    date: "2 minggu lalu",
    comment:
      "Awalnya sempat ragu karena saya perempuan dan pemula banget soal alat beban. Tapi ternyata komunitasnya sangat respectful dan staf di meja resepsionis ramah sekali ngasih petunjuk awal. Bikin betah olahraga rutin tiap pulang kerja.",
    verified: true,
  },
  {
    id: "rev-3",
    name: "Dian Pratama",
    role: "Member Setia (1 Tahun)",
    avatarText: "DP",
    rating: 5,
    date: "3 minggu lalu",
    comment:
      "Fasilitas lengkap, parkir motor dan mobil luas langsung di depan gedung, toiletnya bersih, dan harga keanggotaannya sangat sepadan tanpa biaya tersembunyi. Tempat gym nomor satu di kawasan Penajam Paser Utara.",
    verified: true,
  },
  {
    id: "rev-4",
    name: "Fajar Ramadhan",
    role: "Pengunjung Daily Pass",
    avatarText: "FR",
    rating: 5,
    date: "1 bulan lalu",
    comment:
      "Lagi ada urusan kerjaan ke Petung dan butuh latihan harian. Ambil tiket Daily Pass 35rb, aksesnya langsung bebas pakai semua alat. Tempatnya dingin dan bersih. Sangat direkomendasikan!",
    verified: true,
  },
];

export default function Testimonials() {
  const mapsUrl = "https://maps.app.goo.gl/wrvpUTQfSCWguC5n8";

  return (
    <section id="testimoni" className="py-24 relative bg-slate-100/60 dark:bg-surface/30 border-t border-slate-200/80 dark:border-borderDark/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-lime-700 dark:text-brand-neon bg-lime-500/10 dark:bg-surface px-3 py-1 rounded-full border border-lime-500/30 dark:border-borderDark font-semibold inline-flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
              Bukti Sosial & Kepuasan Pengunjung
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 dark:text-white uppercase tracking-tight">
              Dipercaya Member & Warga Penajam
            </h2>
            <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base">
              Pengalaman nyata dari pengunjung dan member yang telah menjadikan Gymqoo sebagai partner gaya hidup sehat harian mereka.
            </p>
          </div>

          {/* Google Maps Score Badge */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#11131A] border border-slate-200 dark:border-borderDark shadow-sm flex items-center gap-4 flex-shrink-0">
            <div className="text-center pr-4 border-r border-slate-200 dark:border-borderDark/70">
              <span className="font-display font-black text-3xl sm:text-4xl text-slate-900 dark:text-white block">
                4.5
              </span>
              <div className="flex items-center justify-center gap-0.5 text-amber-500 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                Google Maps Review
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
                Gymqoo Fitness Center Petung
              </p>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-mono text-lime-700 dark:text-brand-neon font-bold hover:underline mt-1"
              >
                <span>Lihat Ulasan di Google</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-panel rounded-3xl p-6 flex flex-col justify-between border-slate-200/90 dark:border-borderDark/80 shadow-sm hover:border-lime-500/50 dark:hover:border-brand-neon/40 transition-all duration-200 hover:-translate-y-1"
            >
              <div>
                {/* Rating stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-slate-300 dark:text-zinc-700" />
                </div>

                {/* Comment text */}
                <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed mb-6 italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-4 border-t border-slate-100 dark:border-borderDark/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white dark:bg-brand-neon dark:text-black font-display font-black text-xs flex items-center justify-center flex-shrink-0 shadow-sm">
                  {rev.avatarText}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-display font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                      {rev.name}
                    </h4>
                    {rev.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-lime-600 dark:text-brand-neon flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 truncate">
                    {rev.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

