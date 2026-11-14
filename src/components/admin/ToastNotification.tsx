"use client";

import React, { useEffect } from "react";
import { CheckCircle2, Trash2, Edit3, AlertCircle, X, Sparkles, UserPlus } from "lucide-react";

export type ToastType = "add" | "edit" | "delete" | "checkin" | "info";

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  timestamp: number;
}

interface ToastNotificationProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export default function ToastNotification({ toasts, onDismiss }: ToastNotificationProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <ToastCard key={toast.id} toast={toast} onDismiss={() => onDismiss(toast.id)} />
      ))}
    </div>
  );
}

function ToastCard({ toast, onDismiss }: { toast: ToastItem; onDismiss: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const config = {
    add: {
      borderColor: "border-lime-500/40 dark:border-brand-neon/60",
      glowBg: "bg-lime-500/10 dark:bg-brand-neon/10",
      accentBar: "bg-lime-500 dark:bg-brand-neon",
      iconBg: "bg-lime-500/20 text-lime-700 dark:text-brand-neon border-lime-500/40",
      icon: <UserPlus className="w-4 h-4" />,
      badge: "Member Baru",
    },
    edit: {
      borderColor: "border-sky-500/40 dark:border-sky-400/60",
      glowBg: "bg-sky-500/10 dark:bg-sky-400/10",
      accentBar: "bg-sky-500 dark:bg-sky-400",
      iconBg: "bg-sky-500/20 text-sky-700 dark:text-sky-300 border-sky-500/40",
      icon: <Edit3 className="w-4 h-4" />,
      badge: "Perpanjangan & Edit",
    },
    delete: {
      borderColor: "border-rose-500/40 dark:border-rose-500/60",
      glowBg: "bg-rose-500/10 dark:bg-rose-500/10",
      accentBar: "bg-rose-500 dark:bg-rose-500",
      iconBg: "bg-rose-500/20 text-rose-700 dark:text-rose-400 border-rose-500/40",
      icon: <Trash2 className="w-4 h-4" />,
      badge: "Data Dihapus",
    },
    checkin: {
      borderColor: "border-emerald-500/40 dark:border-emerald-400/60",
      glowBg: "bg-emerald-500/10 dark:bg-emerald-400/10",
      accentBar: "bg-emerald-500 dark:bg-emerald-400",
      iconBg: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40",
      icon: <CheckCircle2 className="w-4 h-4" />,
      badge: "Check-In Sukses",
    },
    info: {
      borderColor: "border-amber-500/40 dark:border-amber-400/60",
      glowBg: "bg-amber-500/10 dark:bg-amber-400/10",
      accentBar: "bg-amber-500 dark:bg-amber-400",
      iconBg: "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40",
      icon: <Sparkles className="w-4 h-4" />,
      badge: "Info Sistem",
    },
  }[toast.type];

  return (
    <div
      className={`pointer-events-auto relative overflow-hidden rounded-2xl bg-white/95 dark:bg-[#12141D]/95 backdrop-blur-xl border ${config.borderColor} shadow-2xl transition-all duration-300 hover:scale-[1.02] animate-slide-in-right`}
      style={{
        boxShadow:
          toast.type === "delete"
            ? "0 10px 30px -10px rgba(244, 63, 94, 0.3)"
            : toast.type === "add"
            ? "0 10px 30px -10px rgba(132, 204, 22, 0.3)"
            : "0 10px 30px -10px rgba(56, 189, 248, 0.3)",
      }}
    >
      <div className="p-4 flex items-start gap-3">
        {/* Glowing Icon */}
        <div
          className={`w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0 shadow-sm ${config.iconBg}`}
        >
          {config.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-2 mb-0.5">
            <h4 className="font-display font-extrabold text-xs text-slate-900 dark:text-white tracking-tight truncate">
              {toast.title}
            </h4>
            <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-zinc-300 font-bold">
              {config.badge}
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-zinc-300 leading-snug line-clamp-2">
            {toast.message}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onDismiss}
          className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors flex-shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Countdown Progress Bar */}
      <div className="w-full h-1 bg-slate-100 dark:bg-white/5 overflow-hidden">
        <div
          className={`h-full ${config.accentBar} animate-shrink-width`}
          style={{ animationDuration: "4000ms", animationTimingFunction: "linear" }}
        />
      </div>
    </div>
  );
}

