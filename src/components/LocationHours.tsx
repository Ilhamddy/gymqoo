"use client";

import React, { useState } from "react";
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  Instagram,
  Star,
  ExternalLink,
  Copy,
  Check,
  Compass,
  Car,
} from "lucide-react";

export default function LocationHours() {
  const gymWa = process.env.NEXT_PUBLIC_GYM_WA_NUMBER || "6285393444424";
  const mapsUrl = "https://maps.app.goo.gl/wrvpUTQfSCWguC5n8";
  const addressText =
    "Jl. Mawar No.10, RT.001, Kelurahan Petung, Kecamatan Penajam, Kabupaten Penajam Paser Utara, Kalimantan Timur 76143";

  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"MAP" | "GUIDE">("MAP");

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(addressText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Real official Google Maps Embed for Gymqoo (CID: 0x2df13d00306248c5:0x5b35f997e63e9b5d)
  const officialEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.5833957975883!2d116.6728973!3d-1.34975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df13d00306248c5%3A0x5b35f997e63e9b5d!2sGymqoo!5e0!3m2!1sid!2sid!4v1710000000000!5m2!1sid!2sid";

  return (
    <section
      id="lokasi"
      className="py-24 relative bg-slate-100/70 dark:bg-surface/30 border-t border-slate-200/80 dark:border-borderDark/60 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* ======================================================== */}
          {/* KOLOM KIRI: Informasi Alamat, Jam Operasional, & Kontak */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 space-y-7">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-lime-700 dark:text-brand-neon bg-lime-500/10 dark:bg-surface px-3 py-1 rounded-full border border-lime-500/30 dark:border-borderDark font-semibold">
                  Lokasi Resmi & Akses
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-700 dark:text-amber-300 bg-amber-500/10 dark:bg-surface px-2.5 py-1 rounded-full border border-amber-500/30 dark:border-borderDark font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  4.5 / 5.0 (Google Maps)
                </span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white uppercase tracking-tight">
                Gymqoo Fitness Center Petung
              </h2>
              <p className="text-slate-600 dark:text-zinc-400 text-sm mt-3 leading-relaxed">
                Pusat kebugaran pilihan di Petung, Penajam Paser Utara. Suasana ramah, bersih, sejuk dengan pendingin ruangan (AC) dan kipas sirkulasi udara, nyaman untuk latihan mandiri maupun bersama kawan.
              </p>
            </div>

            <div className="space-y-5">
              {/* Alamat Lengkap & Tombol Salin */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#11131A] border border-slate-200 dark:border-borderDark shadow-sm space-y-2.5">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-lime-500/10 dark:bg-surface border border-lime-500/30 dark:border-borderDark flex items-center justify-center text-lime-600 dark:text-brand-neon flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-display font-bold text-slate-900 dark:text-white text-sm">
                      Alamat Lengkap
                    </h4>
                    <p className="text-slate-700 dark:text-zinc-300 text-xs sm:text-sm mt-1 leading-relaxed">
                      {addressText}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-borderDark/60 flex items-center gap-2">
                  <button
                    onClick={handleCopyAddress}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-surface hover:bg-slate-200 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Alamat Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Alamat</span>
                      </>
                    )}
                  </button>

                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-lime-700 dark:text-brand-neon hover:underline font-bold px-2.5 py-1.5"
                  >
                    <span>Buka Aplikasi Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Jam Operasional */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#11131A] border border-slate-200 dark:border-borderDark shadow-sm flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-lime-500/10 dark:bg-surface border border-lime-500/30 dark:border-borderDark flex items-center justify-center text-lime-600 dark:text-brand-neon flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-slate-900 dark:text-white text-sm">
                    Jam Operasional Gym
                  </h4>
                  <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm mt-1">
                    Senin – Minggu (Buka Setiap Hari):{" "}
                    <strong className="text-slate-900 dark:text-white font-mono font-bold text-sm block sm:inline">
                      08.30 – 21.00 WITA
                    </strong>
                  </p>
                </div>
              </div>

              {/* Kontak WhatsApp & Instagram */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#11131A] border border-slate-200 dark:border-borderDark shadow-sm flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-lime-500/10 dark:bg-surface border border-lime-500/30 dark:border-borderDark flex items-center justify-center text-lime-600 dark:text-brand-neon flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex-1 space-y-1.5 text-xs sm:text-sm">
                  <h4 className="font-display font-bold text-slate-900 dark:text-white text-sm">
                    Layanan Kontak & Sosial Media
                  </h4>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-700 dark:text-zinc-300">
                    <p>
                      WhatsApp:{" "}
                      <a
                        href={`https://wa.me/${gymWa}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lime-700 dark:text-brand-neon font-mono font-bold hover:underline"
                      >
                        0853-9344-4424
                      </a>
                    </p>
                    <p className="flex items-center gap-1">
                      <Instagram className="w-3.5 h-3.5 text-pink-500" />
                      <a
                        href="https://www.instagram.com/gym_qoo/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 dark:text-pink-400 hover:underline font-semibold"
                      >
                        @gym_qoo
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* KOLOM KANAN: High-Definition Google Maps & Rute Visual   */}
          {/* ======================================================== */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-[#11131A] rounded-3xl border border-slate-200 dark:border-borderDark overflow-hidden shadow-xl dark:shadow-2xl flex flex-col">
              
              {/* Header Bar Peta Interaktif */}
              <div className="p-4 sm:px-6 bg-slate-50/90 dark:bg-[#161822] border-b border-slate-200 dark:border-borderDark flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex bg-slate-200 dark:bg-surface p-1 rounded-xl">
                    <button
                      onClick={() => setActiveTab("MAP")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                        activeTab === "MAP"
                          ? "bg-white dark:bg-brand-neon text-slate-900 dark:text-black shadow-sm"
                          : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      Peta Langsung
                    </button>
                    <button
                      onClick={() => setActiveTab("GUIDE")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                        activeTab === "GUIDE"
                          ? "bg-white dark:bg-brand-neon text-slate-900 dark:text-black shadow-sm"
                          : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <Compass className="w-3.5 h-3.5" />
                      Petunjuk Rute
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Titik Terverifikasi
                  </span>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-brand-neon dark:text-black hover:bg-black text-xs font-display font-bold uppercase tracking-wider transition-all shadow-sm"
                  >
                    <span>Navigasi GPS</span>
                    <Navigation className="w-3 h-3 fill-current" />
                  </a>
                </div>
              </div>

              {/* Map Canvas / Route Guide View */}
              <div className="relative min-h-[380px] sm:min-h-[460px] lg:h-[480px] w-full bg-slate-100 dark:bg-[#0b0c10]">
                {activeTab === "MAP" ? (
                  <>
                    <iframe
                      title="Peta Lokasi Resmi Gymqoo Petung Penajam"
                      src={officialEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0, minHeight: "380px" }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full min-h-[380px] sm:min-h-[460px] lg:h-[480px]"
                    />

                    {/* Floating Info Pill on Bottom */}
                    <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 p-3.5 sm:p-4 rounded-2xl bg-white/95 dark:bg-[#11131A]/95 backdrop-blur-md border border-slate-200/90 dark:border-borderDark/90 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-display font-extrabold text-slate-900 dark:text-white">
                            GYMQOO FITNESS CENTER
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-lime-500/15 text-lime-700 dark:text-brand-neon font-bold">
                            Petung
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-slate-600 dark:text-zinc-400 mt-0.5">
                          Jl. Mawar No.10, RT.001, Petung (±3 Menit Masuk dari Jalan Poros Utama)
                        </p>
                      </div>

                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-surface hover:dark:bg-surfaceHover text-slate-800 dark:text-white border border-slate-300 dark:border-borderDark text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-all text-center flex-shrink-0"
                      >
                        <span>Buka Rute Lengkap</span>
                        <ExternalLink className="w-3.5 h-3.5 text-lime-600 dark:text-brand-neon" />
                      </a>
                    </div>
                  </>
                ) : (
                  /* Route Guide Tab */
                  <div className="p-6 sm:p-8 space-y-6 h-full overflow-y-auto">
                    <div className="space-y-1">
                      <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                        Panduan Menuju Lokasi Gymqoo
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400">
                        Lokasi sangat mudah dijangkau dari kawasan pusat pertokoan & jalan utama Petung.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-borderDark flex items-start gap-3.5">
                        <div className="w-7 h-7 rounded-full bg-lime-500/20 text-lime-700 dark:text-brand-neon font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          1
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                            Dari Jalan Utama Kawasan Petung
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1 leading-relaxed">
                            Arahkan kendaraan Anda menuju persimpangan ke arah Jalan Mawar (kawasan pemukiman Petung).
                          </p>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-borderDark flex items-start gap-3.5">
                        <div className="w-7 h-7 rounded-full bg-lime-500/20 text-lime-700 dark:text-brand-neon font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          2
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                            Masuk ke Jalan Mawar ±3 Menit Berkendara
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1 leading-relaxed">
                            Ikuti Jalan Mawar lurus ke No. 10 (RT. 001). Gedung Gymqoo terlihat jelas di sisi jalan dengan papan nama pusat kebugaran.
                          </p>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-borderDark flex items-start gap-3.5">
                        <div className="w-7 h-7 rounded-full bg-lime-500/20 text-lime-700 dark:text-brand-neon font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Car className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                            Parkir Langsung di Depan Gedung
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1 leading-relaxed">
                            Tersedia area parkir yang memadai untuk sepeda motor maupun mobil, tepat di depan pintu masuk meja resepsionis Gymqoo.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-900 text-white dark:bg-brand-neon dark:text-black font-display font-bold text-xs uppercase tracking-wider hover:bg-black transition-all shadow-md"
                      >
                        <Navigation className="w-4 h-4 fill-current" />
                        <span>Mulai Panduan Suara di Google Maps</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
