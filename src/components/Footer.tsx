import React from "react";
import Link from "next/link";
import { Dumbbell, Shield, Instagram, Phone, MapPin, Clock, ExternalLink } from "lucide-react";

export default function Footer() {
  const gymWa = process.env.NEXT_PUBLIC_GYM_WA_NUMBER || "6285393444424";
  const mapsUrl = "https://maps.app.goo.gl/wrvpUTQfSCWguC5n8";

  return (
    <footer className="border-t border-slate-200 dark:border-borderDark/80 bg-white dark:bg-[#0D0F17] pt-16 pb-24 md:pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-200 dark:border-borderDark/60">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-surface border border-slate-700 dark:border-borderDark flex items-center justify-center text-brand-neon">
                <Dumbbell className="w-5 h-5 -rotate-45" />
              </div>
              <div>
                <span className="font-display font-black text-xl text-slate-900 dark:text-white tracking-wider">
                  GYM<span className="text-lime-600 dark:text-brand-neon">QOO</span>
                </span>
                <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-mono uppercase tracking-widest">
                  Fitness Center Petung
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Pusat kebugaran terlengkap di Petung, Penajam Paser Utara. Dilengkapi area beban, mesin latihan, ruangan full AC & kipas sirkulasi, toilet, serta parkir nyaman.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-mono font-semibold">
                ⭐ 4.5 / 5.0 Ulasan Pengunjung
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-zinc-400 font-medium">
              <li>
                <a href="#fasilitas" className="hover:text-lime-600 dark:hover:text-brand-neon transition-colors">
                  Fasilitas & AC
                </a>
              </li>
              <li>
                <a href="#galeri" className="hover:text-lime-600 dark:hover:text-brand-neon transition-colors">
                  Galeri Area Latihan
                </a>
              </li>
              <li>
                <a href="#paket" className="hover:text-lime-600 dark:hover:text-brand-neon transition-colors">
                  Pilihan Paket (1, 3, 6, 12 Bulan)
                </a>
              </li>
              <li>
                <a href="#kalkulator-bmi" className="hover:text-lime-600 dark:hover:text-brand-neon transition-colors">
                  Kalkulator BMI Interaktif
                </a>
              </li>
              <li>
                <a href="#testimoni" className="hover:text-lime-600 dark:hover:text-brand-neon transition-colors">
                  Ulasan Pengunjung (4.5/5.0)
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-lime-600 dark:hover:text-brand-neon transition-colors">
                  Tanya Jawab (FAQ)
                </a>
              </li>
              <li>
                <a href="#lokasi" className="hover:text-lime-600 dark:hover:text-brand-neon transition-colors">
                  Lokasi & Rute Google Maps
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Location */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
              Kontak & Lokasi
            </h4>
            <div className="space-y-2 text-xs text-slate-600 dark:text-zinc-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-lime-600 dark:text-brand-neon flex-shrink-0 mt-0.5" />
                <span>Jl. Mawar No.10, RT.001, Petung, Penajam, PPU 76143</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <a
                  href={`https://wa.me/${gymWa}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 font-mono font-semibold"
                >
                  0853-9344-4424 (WhatsApp Only)
                </a>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Instagram className="w-4 h-4 text-pink-500 flex-shrink-0" />
                <a
                  href="https://www.instagram.com/gym_qoo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-600 dark:hover:text-pink-400 font-medium"
                >
                  Instagram @gym_qoo
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Hours & Maps CTA */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
              Jam Latihan & Rute
            </h4>
            <div className="space-y-2 text-xs text-slate-600 dark:text-zinc-400">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-lime-600 dark:text-brand-neon flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800 dark:text-zinc-200">Senin – Minggu (Setiap Hari)</p>
                  <p className="font-mono text-lime-700 dark:text-brand-neon font-bold">08.30 – 21.00 WITA</p>
                </div>
              </div>
            </div>
            <div className="pt-2">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-surface dark:hover:bg-surfaceHover border border-slate-200 dark:border-borderDark text-slate-800 dark:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>Petunjuk Arah Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-lime-600 dark:text-brand-neon" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-zinc-500 font-mono">
          <p>&copy; {new Date().getFullYear()} Gymqoo Fitness Center. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-slate-700 dark:text-zinc-300 hover:text-lime-600 dark:hover:text-brand-neon font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-lime-600 dark:text-brand-neon" />
              <span>Portal Resepsionis / Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
