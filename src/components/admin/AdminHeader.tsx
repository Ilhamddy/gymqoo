"use client";

import React from "react";
import Link from "next/link";
import { Dumbbell, Plus, RefreshCw, Bell, PanelLeftOpen, PanelLeftClose } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

interface AdminHeaderProps {
  onOpenNewMemberModal: () => void;
  attentionCount: number;
  onRefresh: () => void;
  onLogout?: () => void;
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
  currentViewTitle?: string;
  isSupabase?: boolean;
}

export default function AdminHeader({
  onOpenNewMemberModal,
  attentionCount,
  onRefresh,
  onLogout,
  onToggleSidebar,
  isSidebarOpen = true,
  currentViewTitle = "Dashboard Utama",
  isSupabase = false,
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#11131A]/95 backdrop-blur-xl border-b border-slate-200 dark:border-borderDark transition-colors shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left: Sidebar Toggle Button (Desktop & Mobile) + Title */}
          <div className="flex items-center gap-3">
            {onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                className="p-2 sm:p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-surface border border-slate-200 dark:border-borderDark text-slate-700 dark:text-zinc-300 transition-all hover:scale-105 active:scale-95 shadow-sm"
                title={isSidebarOpen ? "Tutup Sidebar" : "Buka Sidebar"}
                aria-label="Toggle Sidebar"
              >
                {isSidebarOpen ? (
                  <PanelLeftClose className="w-5 h-5" />
                ) : (
                  <PanelLeftOpen className="w-5 h-5 text-lime-600 dark:text-brand-neon" />
                )}
              </button>
            )}

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-extrabold text-base sm:text-xl text-slate-900 dark:text-white tracking-tight">
                  {currentViewTitle}
                </h1>
                <span className="hidden sm:inline-block text-[10px] font-mono uppercase bg-lime-500/15 text-lime-700 dark:text-brand-neon px-2 py-0.5 rounded border border-lime-500/30 font-bold">
                  Resepsionis Gymqoo
                </span>
                <span
                  title={isSupabase ? "Terkoneksi langsung ke Supabase Cloud Database" : "Berjalan dalam mode Offline LocalStorage (Masukkan URL & Key Supabase di .env.local untuk menghubungkan)"}
                  className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border inline-flex items-center gap-1.5 cursor-help ${
                    isSupabase
                      ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30"
                      : "bg-amber-500/10 text-amber-800 dark:text-amber-400 border-amber-500/30"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isSupabase ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
                  {isSupabase ? "Supabase Cloud" : "LocalStorage Mode"}
                </span>
              </div>
              <p className="hidden md:block text-xs text-slate-500 dark:text-zinc-400 font-mono">
                Sistem Operasional & Pengingat Tagihan WhatsApp • Petung, Penajam
              </p>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Alert badge if any */}
            {attentionCount > 0 && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-brand-amber text-xs font-mono font-semibold">
                <Bell className="w-3.5 h-3.5 animate-bounce text-amber-600" />
                <span>{attentionCount} Perlu Diingatkan</span>
              </div>
            )}

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Refresh Button */}
            <button
              onClick={onRefresh}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-surface border border-slate-200 dark:border-borderDark text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-all text-xs font-semibold shadow-sm"
              title="Perbarui Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Add Member Button */}
            <button
              onClick={onOpenNewMemberModal}
              className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-lime-600 hover:bg-lime-700 text-white dark:bg-brand-neon dark:text-black font-display font-bold text-xs uppercase tracking-wider dark:hover:bg-brand-neonHover transition-all flex items-center gap-1.5 shadow-sm dark:shadow-[0_0_20px_rgba(204,255,0,0.25)] hover:scale-[1.02]"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span className="hidden sm:inline">Tambah Member</span>
              <span className="sm:hidden font-bold">Tambah</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
