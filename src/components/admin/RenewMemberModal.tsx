"use client";

import React, { useState, useEffect } from "react";
import { X, RefreshCw, Calendar, CheckCircle2, Edit3, Sparkles } from "lucide-react";
import { Member } from "@/types";
import { initialPlans } from "@/lib/mock-data";
import { deriveMemberStatus, formatDateIndo, formatRupiah, calculateDaysRemaining } from "@/lib/utils";

interface RenewMemberModalProps {
  member: Member | null;
  isOpen: boolean;
  onClose: () => void;
  onRenewMember: (updatedMember: Member) => void;
}

export default function RenewMemberModal({
  member,
  isOpen,
  onClose,
  onRenewMember,
}: RenewMemberModalProps) {
  const [selectedPlanId, setSelectedPlanId] = useState(initialPlans[1].id);
  const [customExpiryDate, setCustomExpiryDate] = useState("");
  const [customStartDate, setCustomStartDate] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isManualEdit, setIsManualEdit] = useState(false);

  // Sync state when member is selected
  useEffect(() => {
    if (member) {
      setFullName(member.full_name);
      setPhoneNumber(member.phone_number);
      setCustomStartDate(member.start_date);

      // Default calculation based on current plan
      const today = new Date();
      const currentExpiry = new Date(member.expiry_date);
      const baseDate = currentExpiry > today ? currentExpiry : today;

      const calc = new Date(baseDate);
      calc.setDate(calc.getDate() + 30); // Default 1 month
      setCustomExpiryDate(calc.toISOString().split("T")[0]);
      setIsManualEdit(false);
    }
  }, [member]);

  if (!isOpen || !member) return null;

  const currentPlan = initialPlans.find((p) => p.id === selectedPlanId) || initialPlans[1];

  // Auto-calculate expiry when plan changes
  const handlePlanChange = (planId: string) => {
    setSelectedPlanId(planId);
    const chosenPlan = initialPlans.find((p) => p.id === planId) || initialPlans[1];

    const today = new Date();
    const currentExpiry = new Date(member.expiry_date);
    const baseDate = currentExpiry > today ? currentExpiry : today;

    const calc = new Date(baseDate);
    calc.setDate(calc.getDate() + chosenPlan.duration_days);
    setCustomExpiryDate(calc.toISOString().split("T")[0]);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customExpiryDate) return;

    const updated: Member = {
      ...member,
      full_name: fullName.trim() || member.full_name,
      phone_number: phoneNumber.trim() || member.phone_number,
      plan_name: currentPlan.name,
      start_date: customStartDate || member.start_date,
      expiry_date: customExpiryDate,
      status: deriveMemberStatus(customExpiryDate),
      last_reminded_at: null,
    };

    onRenewMember(updated);
    onClose();
  };

  const daysDiff = customExpiryDate ? calculateDaysRemaining(customExpiryDate) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-[#11131A] rounded-2xl w-full max-w-lg border border-slate-200 dark:border-borderDark shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-borderDark">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-lime-500/10 dark:bg-surface border border-lime-500/30 dark:border-borderDark flex items-center justify-center text-lime-600 dark:text-brand-neon">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Perpanjang & Edit Masa Aktif Member
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Pilih paket otomatis atau ubah tanggal masa aktif secara manual dan fleksibel.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-surface"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Member Preview Card */}
        <form onSubmit={handleSave} className="p-6 space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-borderDark/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-display font-bold text-sm text-slate-900 dark:text-white">
                {member.full_name}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-black/40 border border-slate-300 dark:border-white/10 text-lime-700 dark:text-brand-neon font-bold">
                {member.member_code}
              </span>
            </div>
            <div className="text-xs text-slate-500 dark:text-zinc-400 flex items-center justify-between">
              <span>Masa Aktif Sebelumnya:</span>
              <strong className="text-slate-700 dark:text-zinc-200 font-mono">
                {formatDateIndo(member.expiry_date)}
              </strong>
            </div>
          </div>

          {/* Preset Plan Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-zinc-300 font-semibold flex items-center justify-between">
              <span>Paket Durasi Otomatis</span>
              <span className="text-[11px] text-lime-700 dark:text-brand-neon font-normal">
                {currentPlan.price_display ? currentPlan.price_display : formatRupiah(currentPlan.price)}
              </span>
            </label>
            <select
              value={selectedPlanId}
              onChange={(e) => handlePlanChange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-borderDark text-slate-900 dark:text-white text-xs focus:outline-none focus:border-slate-900 dark:focus:border-brand-neon"
            >
              {initialPlans.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (+{p.duration_days} Hari) — {p.price_display ? p.price_display : formatRupiah(p.price)}
                </option>
              ))}
            </select>
          </div>

          {/* MANUAL DATE EDIT SECTION (FITUR FLEKSIBEL SESUAI PERMINTAAN USER) */}
          <div className="p-4 rounded-xl bg-lime-500/5 dark:bg-brand-neon/5 border border-lime-500/20 dark:border-brand-neon/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-lime-800 dark:text-brand-neon font-bold flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5" />
                Ubah Tanggal Bebas / Kustom (Admin)
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400">
                Bisa atur tanggal berapa saja
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Tanggal Mulai */}
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-600 dark:text-zinc-400">
                  Tanggal Mulai
                </label>
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => {
                    setCustomStartDate(e.target.value);
                    setIsManualEdit(true);
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-surface border border-slate-300 dark:border-borderDark text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:border-lime-600 dark:focus:border-brand-neon"
                />
              </div>

              {/* Tanggal Kadaluarsa (EXPIRY DATE) */}
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-700 dark:text-zinc-300 font-bold">
                  Tanggal Kadaluarsa Baru *
                </label>
                <input
                  type="date"
                  required
                  value={customExpiryDate}
                  onChange={(e) => {
                    setCustomExpiryDate(e.target.value);
                    setIsManualEdit(true);
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-surface border-2 border-lime-500 dark:border-brand-neon text-slate-900 dark:text-white text-xs font-mono font-bold focus:outline-none shadow-sm"
                />
              </div>
            </div>

            {/* Live Calculation Preview Banner */}
            <div className="pt-2 text-xs text-slate-700 dark:text-zinc-300 flex items-center justify-between border-t border-lime-500/20 dark:border-brand-neon/20">
              <span>Hasil Jatuh Tempo:</span>
              <span className="font-display font-bold text-lime-700 dark:text-brand-neon text-sm">
                {customExpiryDate ? formatDateIndo(customExpiryDate) : "-"} ({daysDiff} hari lagi)
              </span>
            </div>
          </div>

          {/* Optional: Edit Nama Member / Phone if needed */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-600 dark:text-zinc-400">
                Nama Member
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-surface border border-slate-200 dark:border-borderDark text-slate-900 dark:text-white text-xs focus:outline-none focus:border-slate-900 dark:focus:border-brand-neon"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-600 dark:text-zinc-400">
                Nomor WhatsApp
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-surface border border-slate-200 dark:border-borderDark text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:border-slate-900 dark:focus:border-brand-neon"
              />
            </div>
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="pt-4 border-t border-slate-200 dark:border-borderDark flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-surface border border-slate-200 dark:border-borderDark text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white text-xs font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-lime-600 hover:bg-lime-700 text-white dark:bg-brand-neon dark:text-black font-display font-bold text-xs uppercase tracking-wider dark:hover:bg-brand-neonHover transition-all shadow-md dark:shadow-[0_0_15px_rgba(204,255,0,0.25)] flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Simpan Pembaruan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
