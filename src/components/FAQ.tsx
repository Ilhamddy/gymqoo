"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, MessageSquare, Sparkles } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: "PEMULA" | "FASILITAS" | "PEMBAYARAN";
}

const faqData: FAQItem[] = [
  {
    category: "PEMULA",
    question: "Saya benar-benar pemula dan belum pernah gym, apakah boleh bergabung?",
    answer:
      "Tentu saja sangat boleh! Sebagian besar member kami di Gymqoo Petung berawal dari pemula. Staf dan instruktur di meja resepsionis siap menunjukkan cara penggunaan mesin beban, mengatur posisi alat yang benar, dan memberikan rekomendasi gerakan dasar agar latihan Anda aman, nyaman, dan bebas cedera.",
  },
  {
    category: "PEMULA",
    question: "Perlengkapan apa saja yang wajib saya bawa saat latihan?",
    answer:
      "Anda cukup mengenakan pakaian olahraga yang nyaman menyerap keringat dan sepatu olahraga (sneakers / running shoes bertali) yang bersih. Disarankan juga membawa handuk kecil pribadi untuk menyeka keringat serta botol air minum.",
  },
  {
    category: "FASILITAS",
    question: "Apakah suasana di Gymqoo nyaman untuk member wanita?",
    answer:
      "Sangat nyaman dan ramah. Komunitas Gymqoo menjunjung tinggi etika saling menghargai. Ruangan latihan full AC dan dilengkapi kipas angin sirkulasi udara besar sehingga suasana tetap sejuk, segar, dan tidak pengap saat berolahraga.",
  },
  {
    category: "PEMBAYARAN",
    question: "Apakah saya bisa mencoba latihan harian terlebih dahulu sebelum langganan bulanan?",
    answer:
      "Bisa! Kami menyediakan tiket Daily Pass (Harian) seharga Rp 35.000 per kunjungan. Anda bebas memakai seluruh mesin latihan dan area beban sepuasnya pada hari tersebut tanpa perlu komitmen bulanan.",
  },
  {
    category: "PEMBAYARAN",
    question: "Apakah ada biaya registrasi tersembunyi selain harga paket?",
    answer:
      "Tidak ada sama sekali. Biaya keanggotaan murni sesuai tarif yang tertera (misal Rp 295.000 untuk 1 bulan atau Rp 800.000 untuk 3 bulan). Tanpa biaya pendaftaran tambahan, tanpa biaya admin loker, dan tanpa sistem potong otomatis yang membingungkan.",
  },
  {
    category: "FASILITAS",
    question: "Bagaimana jika saya berhalangan hadir atau dinas luar kota beberapa minggu?",
    answer:
      "Kami memahami jadwal dinas dan kesibukan Anda. Anda dapat mengonfirmasikan kepada admin resepsionis kami melalui WhatsApp untuk permohonan penyesuaian atau pencatatan masa aktif (freeze/cuti membership) sesuai ketentuan yang berlaku di meja admin.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<"ALL" | "PEMULA" | "FASILITAS" | "PEMBAYARAN">("ALL");

  const gymWa = process.env.NEXT_PUBLIC_GYM_WA_NUMBER || "6285393444424";

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = faqData.filter((item) => {
    if (activeCategory === "ALL") return true;
    return item.category === activeCategory;
  });

  return (
    <section id="faq" className="py-24 relative bg-slate-100/50 dark:bg-surface/20 border-t border-slate-200/80 dark:border-borderDark/60 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-lime-700 dark:text-brand-neon bg-lime-500/10 dark:bg-surface px-3 py-1 rounded-full border border-lime-500/30 dark:border-borderDark font-semibold inline-flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            Tanya Jawab Populer
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 dark:text-white uppercase tracking-tight">
            Pertanyaan Yang Sering Diajukan
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
            Segala hal yang perlu Anda ketahui sebelum memulai langkah kebugaran Anda bersama Gymqoo Petung.
          </p>
        </div>

        {/* Category Pills Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {(
            [
              { id: "ALL", label: "Semua Pertanyaan" },
              { id: "PEMULA", label: "Bagi Pemula" },
              { id: "FASILITAS", label: "Fasilitas & Suasana" },
              { id: "PEMBAYARAN", label: "Paket & Pembayaran" },
            ] as const
          ).map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setOpenIndex(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                activeCategory === cat.id
                  ? "bg-slate-900 text-white dark:bg-brand-neon dark:text-black shadow-md font-bold"
                  : "bg-white dark:bg-[#11131A] text-slate-700 dark:text-zinc-400 border border-slate-200 dark:border-borderDark hover:border-slate-400 dark:hover:border-zinc-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion Container */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl transition-all duration-200 border overflow-hidden ${
                  isOpen
                    ? "bg-white dark:bg-[#11131A] border-lime-500/50 dark:border-brand-neon/50 shadow-md"
                    : "bg-white/80 dark:bg-[#11131A]/70 border-slate-200/90 dark:border-borderDark/80 hover:border-slate-300 dark:hover:border-zinc-700"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 transition-colors"
                >
                  <span className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-lime-500/15 text-lime-700 dark:text-brand-neon rotate-180"
                        : "bg-slate-100 dark:bg-surface text-slate-500 dark:text-zinc-400"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed border-t border-slate-100 dark:border-borderDark/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA for Unanswered Questions */}
        <div className="mt-12 p-6 rounded-3xl glass-panel border border-slate-200 dark:border-borderDark flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-lime-500/15 text-lime-700 dark:text-brand-neon flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                Punya Pertanyaan Lain yang Belum Terjawab?
              </h4>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                Staf resepsionis Gymqoo siap membantu Anda via chat WhatsApp.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${gymWa}?text=${encodeURIComponent("Halo Admin Gymqoo! Saya ingin bertanya mengenai informasi latihan dan keanggotaan.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-brand-neon dark:text-black font-display font-bold text-xs uppercase tracking-wider hover:bg-black dark:hover:bg-brand-neonHover transition-all flex items-center gap-1.5 flex-shrink-0 shadow-sm"
          >
            <span>Tanya Admin WA</span>
            <Sparkles className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}

