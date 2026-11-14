"use client";

import React, { useState } from "react";
import { X, UserPlus } from "lucide-react";
import { Member } from "@/types";
import { initialPlans } from "@/lib/mock-data";
import { deriveMemberStatus, formatRupiah } from "@/lib/utils";

interface NewMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMember: (member: Member) => void;
  suggestedNextCode: string;
}

export default function NewMemberModal({
  isOpen,
  onClose,
  onAddMember,
  suggestedNextCode,
}: NewMemberModalProps) {
  const [memberCode, setMemberCode] = useState(suggestedNextCode);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState<"L" | "P">("L");
  const [selectedPlanId, setSelectedPlanId] = useState(initialPlans[1].id);
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);

  React.useEffect(() => {
    if (suggestedNextCode) setMemberCode(suggestedNextCode);
  }, [suggestedNextCode]);

  if (!isOpen) return null;

  const currentPlan = initialPlans.find((p) => p.id === selectedPlanId) || initialPlans[1];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phoneNumber || !memberCode) return;

    const start = new Date(startDate);
    start.setDate(start.getDate() + currentPlan.duration_days);
    const expiryDate = start.toISOString().split("T")[0];

    const newMember: Member = {
      id: "mem-" + Date.now(),
      member_code: memberCode.trim().toUpperCase(),
      full_name: fullName.trim(),
      phone_number: phoneNumber.trim(),
      gender,
      plan_name: currentPlan.name,
      start_date: startDate,
      expiry_date: expiryDate,
      status: deriveMemberStatus(expiryDate),
      last_reminded_at: null,
    };

    onAddMember(newMember);
    onClose();

    setFullName("");
    setPhoneNumber("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-[#11131A] rounded-2xl w-full max-w-lg border border-slate-200 dark:border-borderDark shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-borderDark">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-surface border border-slate-200 dark:border-borderDark flex items-center justify-center text-lime-600 dark:text-brand-neon">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Pendaftaran Member Baru
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Hubungkan dengan kartu fisik Gymqoo & tentukan durasi masa aktif.
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nomor Kartu Fisik */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-zinc-300 font-semibold">
                Nomor Kartu Fisik (ID) *
              </label>
              <input
                type="text"
                required
                value={memberCode}
                onChange={(e) => setMemberCode(e.target.value)}
                placeholder="Contoh: MBR-00107"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-borderDark text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 text-xs font-mono focus:outline-none focus:border-slate-900 dark:focus:border-brand-neon"
              />
            </div>

            {/* Jenis Kelamin */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-zinc-300 font-semibold">
                Gender *
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as "L" | "P")}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-borderDark text-slate-900 dark:text-white text-xs focus:outline-none focus:border-slate-900 dark:focus:border-brand-neon"
              >
                <option value="L">Laki-laki (Pria)</option>
                <option value="P">Perempuan (Wanita)</option>
              </select>
            </div>
          </div>

          {/* Nama Lengkap */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-zinc-300 font-semibold">
              Nama Lengkap Member *
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Contoh: Rendy Wibowo"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-borderDark text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 text-xs focus:outline-none focus:border-slate-900 dark:focus:border-brand-neon"
            />
          </div>

          {/* Nomor WhatsApp */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-zinc-300 font-semibold">
              Nomor WhatsApp (Untuk Reminder Tagihan) *
            </label>
            <input
              type="tel"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Contoh: 081234567890"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-borderDark text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 text-xs font-mono focus:outline-none focus:border-slate-900 dark:focus:border-brand-neon"
            />
          </div>

          {/* Pilihan Paket */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-zinc-300 font-semibold">
                Paket Keanggotaan *
              </label>
              <select
                value={selectedPlanId}
                onChange={(e) => setSelectedPlanId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-borderDark text-slate-900 dark:text-white text-xs focus:outline-none focus:border-slate-900 dark:focus:border-brand-neon"
              >
                {initialPlans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.price_display ? p.price_display : formatRupiah(p.price)})
                  </option>
                ))}
              </select>
            </div>

            {/* Tanggal Mulai */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-zinc-300 font-semibold">
                Tanggal Mulai Aktif *
              </label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-borderDark text-slate-900 dark:text-white text-xs focus:outline-none focus:border-slate-900 dark:focus:border-brand-neon"
              />
            </div>
          </div>

          {/* Footer Submit */}
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
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-black dark:bg-brand-neon dark:text-black font-display font-bold text-xs uppercase tracking-wider dark:hover:bg-brand-neonHover transition-all shadow-md dark:shadow-[0_0_15px_rgba(204,255,0,0.25)]"
            >
              Simpan & Daftarkan Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
