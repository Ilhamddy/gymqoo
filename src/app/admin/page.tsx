"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar, { AdminView } from "@/components/admin/AdminSidebar";
import CheckinScanner from "@/components/admin/CheckinScanner";
import NewMemberModal from "@/components/admin/NewMemberModal";
import RenewMemberModal from "@/components/admin/RenewMemberModal";
import ToastNotification, { ToastItem, ToastType } from "@/components/admin/ToastNotification";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";
import ConfirmLogoutModal from "@/components/admin/ConfirmLogoutModal";
import MemberCardModal from "@/components/admin/MemberCardModal";
import { Member, CheckInLog, LeadInquiry } from "@/types";
import { initialMembers, initialPlans } from "@/lib/mock-data";
import { getStaffSession, clearStaffSession } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase";
import {
  getMembers,
  createMember,
  updateMember as dbUpdateMember,
  deleteMember as dbDeleteMember,
  getCheckIns,
  createCheckIn as dbCreateCheckIn,
  getLeadInquiries,
} from "@/lib/db";
import {
  calculateDaysRemaining,
  formatDateIndo,
  generateWhatsAppReminderUrl,
  deriveMemberStatus,
  formatRupiah,
  exportMembersToCsv,
  cleanPhoneForWhatsApp,
} from "@/lib/utils";
import {
  Users,
  Clock,
  AlertTriangle,
  XCircle,
  MessageSquare,
  Search,
  RefreshCw,
  Trash2,
  CheckCircle,
  Download,
  Printer,
  FileSpreadsheet,
  CreditCard,
  ExternalLink,
} from "lucide-react";

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // View state and Collapsible Sidebar state
  const [currentView, setCurrentView] = useState<AdminView>("DASHBOARD");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [members, setMembers] = useState<Member[]>([]);
  const [checkIns, setCheckIns] = useState<CheckInLog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"ALL" | "ATTENTION" | "ACTIVE" | "EXPIRING_SOON" | "EXPIRED">("ALL");

  const [isNewMemberModalOpen, setIsNewMemberModalOpen] = useState(false);
  const [renewTargetMember, setRenewTargetMember] = useState<Member | null>(null);
  const [selectedMemberForCard, setSelectedMemberForCard] = useState<Member | null>(null);

  // Modern Toast Notifications, Leads, & Confirmation Modals State
  const [leads, setLeads] = useState<LeadInquiry[]>([]);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [deleteTargetMember, setDeleteTargetMember] = useState<Member | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const addToast = (type: ToastType, title: string, message: string) => {
    const newToast: ToastItem = {
      id: "toast-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
      type,
      title,
      message,
      timestamp: Date.now(),
    };
    setToasts((prev) => [newToast, ...prev.slice(0, 4)]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Authentication check & data hydration
  useEffect(() => {
    const session = getStaffSession();
    if (!session) {
      router.replace("/admin/login");
      return;
    }
    setIsAuthenticated(true);

    // Initial sidebar responsive state
    const savedSidebar = localStorage.getItem("gymqoo_sidebar_open");
    if (savedSidebar !== null) {
      setIsSidebarOpen(savedSidebar === "true");
    } else {
      setIsSidebarOpen(window.innerWidth >= 1024);
    }

    const savedTheme = localStorage.getItem("gymqoo_theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Load members from Supabase (or LocalStorage fallback)
    getMembers().then((loaded) => {
      setMembers(loaded);
    });

    // Load check-in logs
    getCheckIns().then((loaded) => {
      setCheckIns(loaded);
    });

    // Load website lead inquiries
    getLeadInquiries().then((loadedLeads) => {
      setLeads(loadedLeads);
    });
  }, [router]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => {
      const next = !prev;
      localStorage.setItem("gymqoo_sidebar_open", String(next));
      return next;
    });
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const handleAddMember = async (newMember: Member) => {
    // Simpan ke database Supabase
    const result = await createMember(newMember);
    const savedMember = result.member;
    
    // Update local state dengan ID yang sudah sinkron (UUID dari Supabase)
    setMembers((prev) => [savedMember, ...prev.filter((m) => m.id !== newMember.id)]);
    
    addToast(
      "add",
      "Member Berhasil Ditambahkan!",
      `${savedMember.full_name} (${savedMember.member_code}) berhasil didaftarkan ke paket ${savedMember.plan_name}.`
    );
  };

  const handleRenewMember = async (updatedMember: Member) => {
    const updated = members.map((m) => (m.id === updatedMember.id ? updatedMember : m));
    setMembers(updated);
    await dbUpdateMember(updatedMember);
    addToast(
      "edit",
      "Masa Aktif Berhasil Diperbarui!",
      `Membership ${updatedMember.full_name} aktif hingga ${formatDateIndo(updatedMember.expiry_date)}.`
    );
  };

  const handleConfirmDelete = async () => {
    if (!deleteTargetMember) return;
    setIsDeleting(true);
    try {
      const target = deleteTargetMember;
      const updated = members.filter((m) => m.id !== target.id);
      setMembers(updated);
      await dbDeleteMember(target.id);
      addToast(
        "delete",
        "Member Berhasil Dihapus!",
        `Data ${target.full_name} (${target.member_code}) telah dihapus dari sistem.`
      );
    } finally {
      setIsDeleting(false);
      setDeleteTargetMember(null);
    }
  };

  const handleCheckInSuccess = async (log: CheckInLog) => {
    const updatedLogs = [log, ...checkIns];
    setCheckIns(updatedLogs);
    await dbCreateCheckIn(log);
    addToast(
      "checkin",
      "Check-In Berhasil!",
      `${log.member_name} (${log.member_code}) - Jam ${log.check_in_time}`
    );
  };

  const handleMarkReminded = async (member: Member) => {
    const now = new Date().toISOString();
    const updatedMember = { ...member, last_reminded_at: now };
    const updated = members.map((m) =>
      m.id === member.id ? updatedMember : m
    );
    setMembers(updated);
    await dbUpdateMember(updatedMember);
    addToast(
      "info",
      "Pengingat Tagihan Ditandai",
      `Pesan WhatsApp untuk ${member.full_name} telah dikirim dan dicatat.`
    );
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#090A0F] flex items-center justify-center">
        <div className="w-7 h-7 border-2 border-lime-600 dark:border-brand-neon border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const totalCount = members.length;
  const activeCount = members.filter((m) => m.status === "ACTIVE").length;
  const expiringSoonCount = members.filter((m) => m.status === "EXPIRING_SOON").length;
  const expiredCount = members.filter((m) => m.status === "EXPIRED").length;
  const attentionCount = expiringSoonCount + expiredCount;

  // Filtered members list
  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.member_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.phone_number.includes(searchQuery);

    if (!matchesSearch) return false;

    if (currentView === "ATTENTION") return m.status === "EXPIRING_SOON" || m.status === "EXPIRED";
    if (activeTab === "ALL") return true;
    if (activeTab === "ATTENTION") return m.status === "EXPIRING_SOON" || m.status === "EXPIRED";
    return m.status === activeTab;
  });

  const suggestedNextCode = `MBR-00${100 + members.length + 1}`;

  const viewTitles: Record<AdminView, string> = {
    DASHBOARD: "Ringkasan Operasional",
    MEMBERS: "Direktori Member Gymqoo",
    ATTENTION: "Tagihan & Reminder WhatsApp",
    SCANNER: "Terminal Fast Check-In",
    CHECKIN_LOGS: "Log Kehadiran Member",
    LEADS: "Calon Member Website (Leads)",
    PLANS: "Katalog Paket & Tarif",
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#090A0F] text-slate-900 dark:text-zinc-100 selection:bg-brand-neon selection:text-black transition-colors">
      {/* 1. LEFT COLLAPSIBLE SIDEBAR */}
      <AdminSidebar
        currentView={currentView}
        onSelectView={(v) => {
          setCurrentView(v);
          if (v === "ATTENTION") setActiveTab("ATTENTION");
        }}
        isOpen={isSidebarOpen}
        onClose={() => {
          setIsSidebarOpen(false);
          localStorage.setItem("gymqoo_sidebar_open", "false");
        }}
        attentionCount={attentionCount}
        totalMembers={totalCount}
        activeMembers={activeCount}
        leadsCount={leads.length}
        onLogout={handleLogout}
        onOpenNewMemberModal={() => setIsNewMemberModalOpen(true)}
      />

      {/* 2. MAIN CONTENT AREA (Smoothly expands when sidebar is closed) */}
      <div
        className={`flex flex-col min-h-screen pb-16 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "lg:pl-72" : "lg:pl-0"
        }`}
      >
        {/* Sticky Top Header with Sidebar Toggle Button */}
        <AdminHeader
          onOpenNewMemberModal={() => setIsNewMemberModalOpen(true)}
          attentionCount={attentionCount}
          onRefresh={async () => {
            const refreshed = await getMembers();
            setMembers(refreshed);
            const logs = await getCheckIns();
            setCheckIns(logs);
            const loadedLeads = await getLeadInquiries();
            setLeads(loadedLeads);
          }}
          onLogout={handleLogout}
          onToggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          currentViewTitle={viewTitles[currentView]}
          isSupabase={isSupabaseConfigured}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-8 flex-1">
          {/* ======================================================== */}
          {/* VIEW: DASHBOARD OVERVIEW                                 */}
          {/* ======================================================== */}
          {currentView === "DASHBOARD" && (
            <>
              {/* Metric Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div
                  onClick={() => setCurrentView("MEMBERS")}
                  className="p-5 rounded-2xl bg-white dark:bg-[#11131A] border border-slate-200 dark:border-borderDark space-y-2 shadow-sm cursor-pointer hover:border-slate-400 transition-all"
                >
                  <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400">
                    <span className="text-xs font-mono uppercase font-semibold">Semua Member</span>
                    <Users className="w-4 h-4 text-slate-400" />
                  </div>
                  <p className="font-display font-extrabold text-3xl text-slate-900 dark:text-white">{totalCount}</p>
                  <span className="text-[11px] text-slate-500 dark:text-zinc-500 font-mono">Kelola database →</span>
                </div>

                <div
                  onClick={() => setCurrentView("MEMBERS")}
                  className="p-5 rounded-2xl bg-white dark:bg-[#11131A] border border-slate-200 dark:border-borderDark space-y-2 shadow-sm cursor-pointer hover:border-emerald-500 transition-all"
                >
                  <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                    <span className="text-xs font-mono uppercase font-semibold">Member Aktif</span>
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  </div>
                  <p className="font-display font-extrabold text-3xl text-emerald-600 dark:text-emerald-400">{activeCount}</p>
                  <span className="text-[11px] text-slate-500 dark:text-zinc-500 font-mono">Status aktif normal</span>
                </div>

                <div
                  onClick={() => setCurrentView("ATTENTION")}
                  className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-brand-amber/30 space-y-2 shadow-sm cursor-pointer hover:border-amber-500 transition-all"
                >
                  <div className="flex items-center justify-between text-amber-700 dark:text-brand-amber">
                    <span className="text-xs font-mono uppercase font-semibold">Tagihan (H-7)</span>
                    <AlertTriangle className="w-4 h-4 text-amber-500 animate-pulse" />
                  </div>
                  <p className="font-display font-extrabold text-3xl text-amber-700 dark:text-brand-amber">{expiringSoonCount}</p>
                  <span className="text-[11px] text-amber-800/80 dark:text-zinc-400 font-mono">Kirim reminder WA →</span>
                </div>

                <div
                  onClick={() => setCurrentView("ATTENTION")}
                  className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-300 dark:border-rose-500/30 space-y-2 shadow-sm cursor-pointer hover:border-rose-500 transition-all"
                >
                  <div className="flex items-center justify-between text-rose-700 dark:text-rose-400">
                    <span className="text-xs font-mono uppercase font-semibold">Pass Expired</span>
                    <XCircle className="w-4 h-4 text-rose-500" />
                  </div>
                  <p className="font-display font-extrabold text-3xl text-rose-700 dark:text-rose-400">{expiredCount}</p>
                  <span className="text-[11px] text-rose-800/80 dark:text-zinc-400 font-mono">Follow-up perpanjangan →</span>
                </div>
              </div>

              {/* Front-Desk Check-in Bar */}
              <CheckinScanner
                members={members}
                onCheckInSuccess={handleCheckInSuccess}
                onOpenRenewModal={(m) => setRenewTargetMember(m)}
              />
            </>
          )}

          {/* ======================================================== */}
          {/* VIEW: SCANNER ONLY                                       */}
          {/* ======================================================== */}
          {currentView === "SCANNER" && (
            <div className="space-y-6">
              <CheckinScanner
                members={members}
                onCheckInSuccess={handleCheckInSuccess}
                onOpenRenewModal={(m) => setRenewTargetMember(m)}
              />
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW: CHECKIN LOGS                                       */}
          {/* ======================================================== */}
          {(currentView === "DASHBOARD" || currentView === "CHECKIN_LOGS" || currentView === "SCANNER") && checkIns.length > 0 && (
            <div className="bg-white dark:bg-[#11131A] rounded-2xl p-6 border border-slate-200 dark:border-borderDark space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-lime-600 dark:text-brand-neon" />
                  Riwayat Kedatangan Hari Ini
                </h3>
                <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">
                  Total: {checkIns.length} Check-in
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {checkIns.slice(0, 8).map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-borderDark/80 flex items-center justify-between text-xs shadow-sm"
                  >
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{log.member_name}</p>
                      <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400">{log.member_code}</span>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-black/40 text-slate-800 dark:text-brand-neon font-bold">
                      {log.check_in_time} WITA
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW: MEMBER DIRECTORY OR ATTENTION VIEW                 */}
          {/* ======================================================== */}
          {(currentView === "DASHBOARD" || currentView === "MEMBERS" || currentView === "ATTENTION") && (
            <div className="bg-white dark:bg-[#11131A] rounded-2xl border border-slate-200 dark:border-borderDark overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-200 dark:border-borderDark flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                    {currentView === "ATTENTION"
                      ? "⚡ Tagihan Jatuh Tempo (Action Required)"
                      : "Direktori Member & Billing"}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">
                    Kelola data keanggotaan, perpanjangan, dan notifikasi jatuh tempo WhatsApp secara real-time.
                  </p>
                </div>

                {currentView !== "ATTENTION" && (
                  <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-surface border border-slate-200 dark:border-borderDark text-xs font-semibold">
                    <button
                      onClick={() => setActiveTab("ALL")}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        activeTab === "ALL"
                          ? "bg-slate-900 text-white dark:bg-brand-neon dark:text-black font-bold shadow-sm"
                          : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      Semua ({totalCount})
                    </button>
                    <button
                      onClick={() => setActiveTab("ATTENTION")}
                      className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                        activeTab === "ATTENTION"
                          ? "bg-amber-500 text-black font-bold shadow-sm"
                          : "text-amber-700 dark:text-brand-amber hover:text-amber-900 dark:hover:text-white"
                      }`}
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Perlu Diingatkan ({attentionCount})
                    </button>
                    <button
                      onClick={() => setActiveTab("ACTIVE")}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        activeTab === "ACTIVE"
                          ? "bg-emerald-600 text-white dark:bg-emerald-500 dark:text-black font-bold shadow-sm"
                          : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      Aktif ({activeCount})
                    </button>
                    <button
                      onClick={() => setActiveTab("EXPIRED")}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        activeTab === "EXPIRED"
                          ? "bg-rose-600 text-white font-bold shadow-sm"
                          : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      Expired ({expiredCount})
                    </button>
                  </div>
                )}
              </div>

              {/* Action Toolbar: Export Excel & Print Report */}
              <div className="px-6 py-3 bg-slate-50/80 dark:bg-surface/40 border-b border-slate-200 dark:border-borderDark/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      exportMembersToCsv(filteredMembers);
                      addToast(
                        "info",
                        "Data Berhasil Diekspor!",
                        `${filteredMembers.length} data member telah diekspor ke file Excel (.csv).`
                      );
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 dark:bg-[#161824] hover:dark:bg-surface border border-slate-200 dark:border-borderDark text-xs font-mono font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-2 transition-all shadow-sm hover:scale-[1.02] active:scale-95"
                    title="Unduh seluruh data member yang tampil ke format CSV Excel"
                  >
                    <Download className="w-3.5 h-3.5 text-lime-600 dark:text-brand-neon" />
                    <span>Export Excel ({filteredMembers.length})</span>
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 dark:bg-[#161824] hover:dark:bg-surface border border-slate-200 dark:border-borderDark text-xs font-mono font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-2 transition-all shadow-sm hover:scale-[1.02] active:scale-95"
                    title="Cetak rekapitulasi data member"
                  >
                    <Printer className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
                    <span>Cetak Rekap</span>
                  </button>
                </div>

                <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">
                  Menampilkan <strong className="text-slate-900 dark:text-white font-bold">{filteredMembers.length}</strong> dari {totalCount} member
                </span>
              </div>

              {/* Search Input Filter */}
              <div className="px-6 py-3 border-b border-slate-200 dark:border-borderDark/60 bg-slate-50 dark:bg-surface/50 flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-400 dark:text-zinc-500" />
                <input
                  type="text"
                  placeholder="Cari berdasarkan nama member, nomor kartu fisik, atau no WhatsApp..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-[11px] text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-white font-mono"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Table Container */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-surface/80 text-slate-700 dark:text-zinc-400 font-mono uppercase tracking-wider border-b border-slate-200 dark:border-borderDark">
                    <tr>
                      <th className="py-3.5 px-6">No. Kartu</th>
                      <th className="py-3.5 px-6">Nama Member</th>
                      <th className="py-3.5 px-6">WhatsApp</th>
                      <th className="py-3.5 px-6">Paket</th>
                      <th className="py-3.5 px-6">Jatuh Tempo</th>
                      <th className="py-3.5 px-6">Status Masa Aktif</th>
                      <th className="py-3.5 px-6 text-center">Aksi / WA Reminder</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-borderDark/60">
                    {filteredMembers.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400 dark:text-zinc-500">
                          Tidak ada data member yang sesuai filter.
                        </td>
                      </tr>
                    ) : (
                      filteredMembers.map((member) => {
                        const daysRemaining = calculateDaysRemaining(member.expiry_date);
                        const waUrl = generateWhatsAppReminderUrl(member);

                        return (
                          <tr key={member.id} className="hover:bg-slate-50 dark:hover:bg-surfaceHover/50 transition-colors">
                            <td className="py-4 px-6 font-mono font-bold text-slate-900 dark:text-white">
                              <span className="px-2 py-1 rounded bg-slate-100 dark:bg-surface border border-slate-200 dark:border-borderDark text-slate-800 dark:text-zinc-200 font-semibold">
                                {member.member_code}
                              </span>
                            </td>

                            <td className="py-4 px-6">
                              <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                <span>{member.full_name}</span>
                                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-surface border border-slate-200 dark:border-borderDark text-slate-600 dark:text-zinc-400">
                                  {member.gender === "L" ? "Pria" : "Wanita"}
                                </span>
                              </div>
                            </td>

                            <td className="py-4 px-6 font-mono text-slate-700 dark:text-zinc-300">
                              {member.phone_number}
                            </td>

                            <td className="py-4 px-6 text-slate-700 dark:text-zinc-300">
                              {member.plan_name}
                            </td>

                            <td className="py-4 px-6">
                              <div className="text-slate-900 dark:text-zinc-200 font-semibold">
                                {formatDateIndo(member.expiry_date)}
                              </div>
                              <div className="text-[11px] font-mono text-slate-500 dark:text-zinc-500">
                                {daysRemaining > 0
                                  ? `${daysRemaining} hari tersisa`
                                  : daysRemaining === 0
                                  ? "Jatuh tempo HARI INI"
                                  : `Kadaluarsa ${Math.abs(daysRemaining)} hari lalu`}
                              </div>
                            </td>

                            <td className="py-4 px-6">
                              {member.status === "ACTIVE" && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                  Aktif
                                </span>
                              )}
                              {member.status === "EXPIRING_SOON" && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-amber-50 dark:bg-brand-amber/10 border border-amber-300 dark:border-brand-amber/30 text-amber-700 dark:text-brand-amber">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                  Segera Habis
                                </span>
                              )}
                              {member.status === "EXPIRED" && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-rose-50 dark:bg-rose-500/10 border border-rose-300 dark:border-rose-500/30 text-rose-700 dark:text-rose-400">
                                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                  Expired
                                </span>
                              )}
                            </td>

                            <td className="py-4 px-6">
                              <div className="flex items-center justify-center gap-2">
                                <a
                                  href={waUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() => handleMarkReminded(member)}
                                  className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 dark:bg-emerald-600/20 dark:border-emerald-500/40 dark:hover:bg-emerald-600 dark:hover:text-black text-emerald-700 dark:text-emerald-400 font-semibold transition-all flex items-center gap-1.5 text-[11px] shadow-sm"
                                  title="Buka WhatsApp dengan pesan tagihan otomatis"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                  Chat WA
                                </a>

                                <button
                                  onClick={() => setRenewTargetMember(member)}
                                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-surface border border-slate-200 dark:border-borderDark hover:border-lime-600 dark:hover:border-brand-neon hover:text-lime-700 dark:hover:text-brand-neon text-slate-700 dark:text-zinc-300 transition-all text-[11px] flex items-center gap-1 font-semibold shadow-sm"
                                  title="Ubah Tanggal / Perpanjang Membership"
                                >
                                  <RefreshCw className="w-3.5 h-3.5" />
                                  <span>Perpanjang</span>
                                </button>

                                <button
                                  onClick={() => setSelectedMemberForCard(member)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-lime-600 hover:bg-slate-100 dark:text-zinc-500 dark:hover:text-brand-neon dark:hover:bg-surface transition-all"
                                  title="Lihat & Cetak Kartu Member"
                                >
                                  <CreditCard className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  onClick={() => setDeleteTargetMember(member)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:text-zinc-500 dark:hover:text-rose-400 dark:hover:bg-rose-500/10 transition-all"
                                  title="Hapus Member Dari Sistem"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              {member.last_reminded_at && (
                                <div className="text-[10px] text-slate-500 dark:text-zinc-500 text-center font-mono mt-1">
                                  WA Terkirim: {new Date(member.last_reminded_at).toLocaleDateString("id-ID")}
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW: LEADS / PENDAFTAR WEBSITE                          */}
          {/* ======================================================== */}
          {currentView === "LEADS" && (
            <div className="bg-white dark:bg-[#11131A] rounded-2xl border border-slate-200 dark:border-borderDark overflow-hidden shadow-sm space-y-4">
              <div className="p-6 border-b border-slate-200 dark:border-borderDark flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                    Pendaftar Baru & Calon Member dari Website
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">
                    Daftar calon member yang mengisi formulir minat atau konsultasi BMI di landing page Gymqoo.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                  Total: {leads.length} Calon Member
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-surface/50 border-b border-slate-200 dark:border-borderDark text-slate-600 dark:text-zinc-400 font-mono uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-6">Nama Calon Member</th>
                      <th className="py-3.5 px-6">WhatsApp</th>
                      <th className="py-3.5 px-6">Paket Pilihan</th>
                      <th className="py-3.5 px-6">Catatan / Kebutuhan</th>
                      <th className="py-3.5 px-6">Tanggal Masuk</th>
                      <th className="py-3.5 px-6 text-center">Aksi Follow-Up</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-borderDark/60">
                    {leads.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-400 dark:text-zinc-500">
                          Belum ada data pendaftar baru dari website. Data akan otomatis masuk saat ada pengunjung mengisi formulir di landing page.
                        </td>
                      </tr>
                    ) : (
                      leads.map((lead, idx) => {
                        const waText = `Halo Kak ${lead.full_name}! 👋\n\nTerima kasih telah mengisi formulir minat di website *Gymqoo Fitness Center Petung*. Anda tertarik dengan paket *${lead.plan_interest}*.\n\nApakah ada jadwal latihan atau informasi fasilitas yang ingin dikonsultasikan Kak? Kami siap membantu di meja resepsionis! 🏋️‍♂️`;
                        const waPhone = cleanPhoneForWhatsApp(lead?.phone_number || "");
                        const waLink = `https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`;

                        return (
                          <tr key={lead.id || idx} className="hover:bg-slate-50/60 dark:hover:bg-surface/40">
                            <td className="py-4 px-6 font-display font-bold text-slate-900 dark:text-white">
                              {lead.full_name}
                            </td>
                            <td className="py-4 px-6 font-mono text-slate-700 dark:text-zinc-300">
                              {lead.phone_number}
                            </td>
                            <td className="py-4 px-6">
                              <span className="font-semibold text-lime-700 dark:text-brand-neon">
                                {lead.plan_interest}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-slate-600 dark:text-zinc-400 max-w-xs truncate">
                              {lead.notes || "-"}
                            </td>
                            <td className="py-4 px-6 font-mono text-slate-500 dark:text-zinc-400">
                              {lead.created_at ? new Date(lead.created_at).toLocaleDateString("id-ID") : "Baru saja"}
                            </td>
                            <td className="py-4 px-6 text-center">
                              <a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-semibold shadow-sm transition-all"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>Follow-Up WA</span>
                              </a>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW: PLANS & TARIFFS                                    */}
          {/* ======================================================== */}
          {currentView === "PLANS" && (
            <div className="space-y-6">
              {/* Daily Pass Highlight */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#11131A] border border-slate-200 dark:border-borderDark shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-lime-500/10 text-lime-700 dark:text-brand-neon border border-lime-500/30 flex items-center justify-center font-mono font-bold text-xs">
                    1 HARI
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                        Daily Pass (Harian)
                      </h3>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-white dark:bg-brand-neon dark:text-black">
                        Rp 35.000
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                      Akses latihan 1 hari penuh untuk pengunjung non-member.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsNewMemberModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-surface border border-slate-200 dark:border-borderDark text-xs font-mono font-semibold text-slate-800 dark:text-white transition-all flex items-center justify-center gap-1.5"
                >
                  Daftarkan Pass Harian
                </button>
              </div>

              {/* 4 Membership Plans (1, 3, 6, 12 Bulan) - 100% Symmetrical */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {initialPlans.filter((p) => p.id !== "plan-daily").map((plan) => (
                  <div
                    key={plan.id}
                    className="p-6 rounded-2xl bg-white dark:bg-[#11131A] border border-slate-200 dark:border-borderDark shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-lime-700 dark:text-brand-neon">
                          {plan.duration_days} HARI
                        </span>
                        {plan.badge && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-lime-500/10 text-lime-700 dark:text-brand-neon font-bold">
                            {plan.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                        {plan.name}
                      </h3>
                      <p className="font-display font-black text-2xl text-slate-900 dark:text-white mt-2">
                        {plan.price_display ? plan.price_display : formatRupiah(plan.price)}
                      </p>
                      <ul className="mt-4 space-y-2 text-xs text-slate-600 dark:text-zinc-400">
                        {plan.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => setIsNewMemberModalOpen(true)}
                      className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 text-white dark:bg-brand-neon dark:text-black font-display font-bold text-xs uppercase tracking-wider hover:bg-black dark:hover:bg-brand-neonHover transition-all text-center"
                    >
                      Daftarkan Member Paket Ini
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modals & Popups */}
      <NewMemberModal
        isOpen={isNewMemberModalOpen}
        onClose={() => setIsNewMemberModalOpen(false)}
        onAddMember={handleAddMember}
        suggestedNextCode={suggestedNextCode}
      />

      <RenewMemberModal
        member={renewTargetMember}
        isOpen={Boolean(renewTargetMember)}
        onClose={() => setRenewTargetMember(null)}
        onRenewMember={handleRenewMember}
      />

      <ConfirmDeleteModal
        isOpen={Boolean(deleteTargetMember)}
        member={deleteTargetMember}
        onClose={() => setDeleteTargetMember(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />

      <ConfirmLogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={() => {
          clearStaffSession();
          router.replace("/admin/login");
        }}
      />

      <MemberCardModal
        member={selectedMemberForCard}
        isOpen={Boolean(selectedMemberForCard)}
        onClose={() => setSelectedMemberForCard(null)}
      />

      {/* Floating Modern Toast Stack */}
      <ToastNotification toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
