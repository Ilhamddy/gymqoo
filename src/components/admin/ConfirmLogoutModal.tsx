"use client";

import React from "react";
import { LogOut, X } from "lucide-react";

interface ConfirmLogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmLogoutModal({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmLogoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-[#12141D] rounded-3xl w-full max-w-sm border border-slate-200 dark:border-borderDark shadow-2xl overflow-hidden">
        <div className="p-6 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center shadow-inner">
            <LogOut className="w-7 h-7" />
          </div>

          <div>
            <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white">
              Keluar dari Sesi Resepsionis?
            </h3>
            <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1">
              Anda harus memasukkan username dan password kembali untuk mengakses dashboard operasional.
            </p>
          </div>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-[#0E1017] border-t border-slate-200 dark:border-borderDark flex items-center justify-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-borderDark text-xs font-mono font-semibold text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-surface transition-colors"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-brand-neon dark:text-black hover:bg-black text-xs font-display font-extrabold uppercase tracking-wider transition-all shadow-md hover:scale-[1.02]"
          >
            Ya, Keluar
          </button>
        </div>
      </div>
    </div>
  );
}

