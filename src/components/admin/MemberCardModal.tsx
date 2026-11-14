"use client";

import React, { useRef } from "react";
import { Dumbbell, Printer, X, Sparkles, ShieldCheck, QrCode } from "lucide-react";
import { Member } from "@/types";
import { formatDateIndo } from "@/lib/utils";

interface MemberCardModalProps {
  member: Member | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MemberCardModal({ member, isOpen, onClose }: MemberCardModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !member) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-[#11131A] rounded-3xl w-full max-w-lg border border-slate-200 dark:border-borderDark shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-borderDark">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-lime-500/10 text-lime-600 dark:text-brand-neon border border-lime-500/30 flex items-center justify-center">
              <Dumbbell className="w-4 h-4 -rotate-45" />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                Kartu Fisik Member Gymqoo
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-mono">
                Desain siap cetak untuk kartu fisik / ID Card resepsionis
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-surface"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Physical Card Preview */}
        <div className="p-6 sm:p-8 flex flex-col items-center justify-center space-y-6">
          
          {/* THE CARD */}
          <div
            ref={cardRef}
            className="w-full max-w-sm aspect-[1.586/1] rounded-2xl p-6 bg-gradient-to-br from-zinc-900 via-[#181A24] to-black text-white border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col justify-between"
          >
            {/* Top Gloss Highlights */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-lime-500/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-neon to-transparent opacity-80" />

            {/* Card Header */}
            <div className="flex items-start justify-between relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-brand-neon">
                  <Dumbbell className="w-4 h-4 -rotate-45" />
                </div>
                <div>
                  <span className="font-display font-black text-sm tracking-wider block leading-tight">
                    GYM<span className="text-brand-neon">QOO</span>
                  </span>
                  <span className="text-[8px] font-mono tracking-widest uppercase text-zinc-400 block">
                    FITNESS CENTER • PETUNG
                  </span>
                </div>
              </div>

              {/* Gold Chip / Member Badge */}
              <div className="flex flex-col items-end">
                <div className="w-8 h-6 rounded bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-amber-300 shadow-inner flex items-center justify-center">
                  <div className="w-5 h-4 border border-amber-700/40 rounded-sm" />
                </div>
                <span className="text-[7px] font-mono text-zinc-400 mt-0.5">OFFICIAL ID</span>
              </div>
            </div>

            {/* Card Center: Member Code */}
            <div className="my-2 relative z-10">
              <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 block">
                ID KARTU ANGGOTA
              </span>
              <p className="font-mono font-black text-xl sm:text-2xl text-brand-neon tracking-widest mt-0.5 shadow-sm">
                {member.member_code}
              </p>
            </div>

            {/* Card Footer: Name & Expiry */}
            <div className="flex items-end justify-between relative z-10 pt-2 border-t border-white/10">
              <div className="min-w-0 pr-3">
                <span className="text-[8px] font-mono uppercase tracking-wider text-zinc-400 block">
                  NAMA MEMBER
                </span>
                <p className="font-display font-extrabold text-xs sm:text-sm text-white uppercase tracking-wide truncate">
                  {member.full_name}
                </p>
                <span className="text-[9px] font-mono text-lime-400/90 block">
                  {member.plan_name}
                </span>
              </div>

              <div className="text-right flex-shrink-0">
                <span className="text-[8px] font-mono uppercase tracking-wider text-zinc-400 block">
                  BERLAKU S/D
                </span>
                <span className="font-mono font-bold text-xs text-zinc-200">
                  {formatDateIndo(member.expiry_date)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400 font-mono">
            <ShieldCheck className="w-4 h-4 text-lime-600 dark:text-brand-neon" />
            <span>Kartu ini dapat dicetak langsung ke kertas cardstock / printer kartu PVC</span>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 bg-slate-50 dark:bg-[#0E1017] border-t border-slate-200 dark:border-borderDark flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-borderDark text-xs font-mono font-semibold text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-surface transition-colors"
          >
            Tutup
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-brand-neon dark:text-black font-display font-bold text-xs uppercase tracking-wider hover:bg-black dark:hover:bg-brand-neonHover transition-all flex items-center gap-2 shadow-md hover:scale-[1.02] active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Kartu Member</span>
          </button>
        </div>

      </div>
    </div>
  );
}

