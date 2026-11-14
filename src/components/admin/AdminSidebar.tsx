"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Bell,
  QrCode,
  Clock,
  CreditCard,
  Home,
  LogOut,
  Dumbbell,
  PanelLeftClose,
  X,
  UserCheck,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export type AdminView = "DASHBOARD" | "MEMBERS" | "ATTENTION" | "SCANNER" | "CHECKIN_LOGS" | "PLANS" | "LEADS";

interface AdminSidebarProps {
  currentView: AdminView;
  onSelectView: (view: AdminView) => void;
  isOpen: boolean;
  onClose: () => void;
  attentionCount: number;
  totalMembers: number;
  activeMembers: number;
  onLogout: () => void;
  onOpenNewMemberModal: () => void;
  leadsCount?: number;
}

export default function AdminSidebar({
  currentView,
  onSelectView,
  isOpen,
  onClose,
  attentionCount,
  totalMembers,
  activeMembers,
  onLogout,
  onOpenNewMemberModal,
  leadsCount = 0,
}: AdminSidebarProps) {
  const menuItems: { id: AdminView; label: string; icon: React.ElementType; badge?: string | number; badgeColor?: string }[] = [
    {
      id: "DASHBOARD",
      label: "Dashboard Utama",
      icon: LayoutDashboard,
    },
    {
      id: "MEMBERS",
      label: "Semua Member",
      icon: Users,
      badge: totalMembers,
      badgeColor: "bg-slate-200 dark:bg-surface text-slate-700 dark:text-zinc-300",
    },
    {
      id: "ATTENTION",
      label: "Pengingat WA (H-7)",
      icon: Bell,
      badge: attentionCount > 0 ? attentionCount : undefined,
      badgeColor: "bg-amber-500 text-black font-bold animate-pulse",
    },
    {
      id: "SCANNER",
      label: "Check-In Kartu Fisik",
      icon: QrCode,
    },
    {
      id: "CHECKIN_LOGS",
      label: "Log Kedatangan Hari Ini",
      icon: Clock,
    },
    {
      id: "LEADS",
      label: "Pendaftar Baru Website",
      icon: UserCheck,
      badge: leadsCount > 0 ? leadsCount : undefined,
      badgeColor: "bg-emerald-500 text-white font-bold",
    },
    {
      id: "PLANS",
      label: "Paket & Tarif Gym",
      icon: CreditCard,
    },
  ];

  const handleNavClick = (view: AdminView) => {
    onSelectView(view);
    // On mobile, close sidebar after clicking menu
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile/Tablet Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container (Collapsible on both Desktop & Mobile) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white dark:bg-[#11131A] border-r border-slate-200 dark:border-borderDark flex flex-col justify-between transition-transform duration-300 ease-in-out shadow-xl lg:shadow-sm ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top: Logo & Close Button (for both desktop and mobile) */}
        <div>
          <div className="h-20 px-6 flex items-center justify-between border-b border-slate-200 dark:border-borderDark">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-lime-500/10 dark:bg-surface border border-lime-500/30 dark:border-borderDark flex items-center justify-center text-lime-600 dark:text-brand-neon">
                <Dumbbell className="w-5 h-5 -rotate-45" />
              </div>
              <div>
                <span className="font-display font-black text-xl tracking-wider text-slate-900 dark:text-white">
                  GYM<span className="text-lime-600 dark:text-brand-neon">QOO</span>
                </span>
                <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-mono uppercase tracking-wider">
                  Admin & Resepsionis
                </p>
              </div>
            </Link>

            {/* Close / Collapse Sidebar Button */}
            <button
              onClick={onClose}
              title="Tutup Sidebar"
              className="p-2 rounded-xl text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-surface transition-all"
            >
              <PanelLeftClose className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Action: Tambah Member Button */}
          <div className="p-4 border-b border-slate-200/80 dark:border-borderDark/60">
            <button
              onClick={() => {
                onOpenNewMemberModal();
                if (window.innerWidth < 1024) onClose();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-lime-600 hover:bg-lime-700 text-white dark:bg-brand-neon dark:text-black font-display font-bold text-xs uppercase tracking-wider dark:hover:bg-brand-neonHover transition-all flex items-center justify-center gap-2 shadow-sm dark:shadow-[0_0_15px_rgba(204,255,0,0.25)] hover:scale-[1.01]"
            >
              <span>+ Pendaftaran Member</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            <p className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-zinc-500 font-bold">
              Menu Navigasi
            </p>

            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-slate-900 text-white dark:bg-brand-neon dark:text-black shadow-sm"
                      : "text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-surfaceHover hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-lime-400 dark:text-black" : "text-slate-500 dark:text-zinc-400"}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Profile, Theme, Web Link & Logout */}
        <div className="p-4 border-t border-slate-200 dark:border-borderDark space-y-3">
          {/* Staff Info Card */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-borderDark/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-lime-600 text-white flex items-center justify-center font-bold text-xs font-display">
                GQ
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Resepsionis</p>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Petung, Penajam
                </span>
              </div>
            </div>

            <ThemeToggle />
          </div>

          {/* Links: Back to Website & Logout */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-surface dark:hover:bg-surfaceHover border border-slate-200 dark:border-borderDark text-slate-700 dark:text-zinc-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Ke Web</span>
            </Link>

            <button
              onClick={onLogout}
              className="py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              title="Keluar dari Akun Resepsionis"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
