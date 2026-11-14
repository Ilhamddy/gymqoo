"use client";

import React from "react";
import { AlertTriangle, Trash2, X, ShieldAlert } from "lucide-react";
import { Member } from "@/types";
import { formatDateIndo } from "@/lib/utils";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  member: Member | null;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
}

export default function ConfirmDeleteModal({
  isOpen,
  member,
  onClose,
  onConfirm,
  isDeleting = false,
}: ConfirmDeleteModalProps) {
  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-[#12141D] rounded-3xl w-full max-w-md border border-rose-500/30 dark:border-rose-500/40 shadow-[0_20px_50px_rgba(244,63,94,0.25)] overflow-hidden transition-all transform scale-100">
        
        {/* Modal Top Banner with Glowing Red Hazard Icon */}
        <div className="relative p-6 pb-5 border-b border-rose-100 dark:border-rose-950/40 bg-gradient-to-b from-rose-500/10 to-transparent">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/40 flex items-center justify-center text-rose-600 dark:text-rose-400 flex-shrink-0 shadow-inner">
              <Trash2 className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-rose-600 dark:text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                Konfirmasi Penghapusan
              </span>
              <h3 className="font-display font-black text-lg text-slate-900 dark:text-white tracking-tight mt-1">
                Hapus Data Member?
              </h3>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
            Data keanggotaan member berikut akan dihapus secara permanen dari sistem dan cloud database Gymqoo.
          </p>

          {/* Member Card Preview */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#161824] border border-slate-200 dark:border-borderDark/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-display font-extrabold text-sm text-slate-900 dark:text-white">
                  {member.full_name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-mono mt-0.5">
                  WA: {member.phone_number}
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-xl bg-slate-200/80 dark:bg-black/50 text-slate-800 dark:text-zinc-200 border border-slate-300 dark:border-white/10">
                {member.member_code}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-200/70 dark:border-borderDark/60 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500 dark:text-zinc-400">Paket: {member.plan_name}</span>
              <span className="text-rose-600 dark:text-rose-400 font-bold">
                Masa Aktif: {formatDateIndo(member.expiry_date)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300 text-xs">
            <ShieldAlert className="w-4 h-4 flex-shrink-0" />
            <span>Tindakan ini tidak dapat dibatalkan. Log kedatangan juga akan terhapus.</span>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 bg-slate-50 dark:bg-[#0E1017] border-t border-slate-200 dark:border-borderDark flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-borderDark text-xs font-mono font-semibold text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-surface transition-colors"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-display font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-rose-600/30 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Menghapus...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus Member</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}

