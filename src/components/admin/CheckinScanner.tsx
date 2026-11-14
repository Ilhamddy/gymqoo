"use client";

import React, { useState } from "react";
import { QrCode, CheckCircle2, AlertTriangle, XCircle, Search, UserCheck } from "lucide-react";
import { Member, CheckInLog } from "@/types";
import { calculateDaysRemaining, formatDateIndo, generateWhatsAppReminderUrl } from "@/lib/utils";

interface CheckinScannerProps {
  members: Member[];
  onCheckInSuccess: (log: CheckInLog) => void;
  onOpenRenewModal: (member: Member) => void;
}

export default function CheckinScanner({
  members,
  onCheckInSuccess,
  onOpenRenewModal,
}: CheckinScannerProps) {
  const [inputCode, setInputCode] = useState("");
  const [result, setResult] = useState<{
    type: "SUCCESS" | "WARNING" | "EXPIRED" | "NOT_FOUND";
    member?: Member;
    message: string;
  } | null>(null);

  const handleVerify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = inputCode.trim().toUpperCase();
    if (!query) return;

    const found = members.find(
      (m) =>
        m.member_code.toUpperCase() === query ||
        m.phone_number.replace(/\D/g, "") === query.replace(/\D/g, "")
    );

    if (!found) {
      setResult({
        type: "NOT_FOUND",
        message: `Nomor Kartu / ID "${query}" tidak terdaftar dalam sistem.`,
      });
      return;
    }

    const days = calculateDaysRemaining(found.expiry_date);

    if (days < 0) {
      setResult({
        type: "EXPIRED",
        member: found,
        message: `Membership telah kadaluarsa sejak ${formatDateIndo(found.expiry_date)} (${Math.abs(days)} hari lalu).`,
      });
    } else if (days <= 3) {
      setResult({
        type: "WARNING",
        member: found,
        message: `Akses diterima, namun membership akan habis dalam ${days === 0 ? "HARI INI" : days + " hari"} (${formatDateIndo(found.expiry_date)}).`,
      });
      logCheckin(found, "EXPIRING_SOON");
    } else {
      setResult({
        type: "SUCCESS",
        member: found,
        message: `Check-in berhasil! Masa aktif aman hingga ${formatDateIndo(found.expiry_date)} (${days} hari lagi).`,
      });
      logCheckin(found, "ACTIVE");
    }

    setInputCode("");
  };

  const logCheckin = (member: Member, status: "ACTIVE" | "EXPIRING_SOON") => {
    const newLog: CheckInLog = {
      id: "chk-" + Date.now(),
      member_id: member.id,
      member_code: member.member_code,
      member_name: member.full_name,
      check_in_time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      status_at_checkin: status,
    };
    onCheckInSuccess(newLog);
  };

  return (
    <div id="checkin-scanner" className="glass-panel rounded-2xl p-6 border-slate-200/80 dark:border-borderDark space-y-4 shadow-sm scroll-mt-24">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-surface border border-slate-200 dark:border-borderDark flex items-center justify-center text-lime-600 dark:text-brand-neon">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
              Fast Check-In (Kartu Fisik / ID)
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Scan barcode kartu atau ketik ID Member (misal: <span className="font-mono text-slate-700 dark:text-zinc-300 font-semibold">MBR-00101</span>).
            </p>
          </div>
        </div>

        <form onSubmit={handleVerify} className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              placeholder="Scan barcode / ID member..."
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-borderDark text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 text-xs font-mono focus:outline-none focus:border-slate-900 dark:focus:border-brand-neon transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 dark:text-zinc-500 absolute left-3 top-2.5" />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-black dark:bg-surface dark:border dark:border-borderDark dark:hover:border-brand-neon dark:text-white dark:hover:text-brand-neon text-xs font-semibold transition-all flex items-center gap-1.5 flex-shrink-0"
          >
            <UserCheck className="w-3.5 h-3.5" />
            Check-In
          </button>
        </form>
      </div>

      {/* Result Indicator Banner */}
      {result && (
        <div
          className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-200 ${
            result.type === "SUCCESS"
              ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-500/50 text-emerald-900 dark:text-emerald-200"
              : result.type === "WARNING"
              ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-500/50 text-amber-900 dark:text-amber-200"
              : result.type === "EXPIRED"
              ? "bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-500/50 text-rose-900 dark:text-rose-200"
              : "bg-slate-50 dark:bg-surface border-slate-300 dark:border-zinc-700 text-slate-800 dark:text-zinc-300"
          }`}
        >
          <div className="flex items-start gap-3">
            {result.type === "SUCCESS" && <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />}
            {result.type === "WARNING" && <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />}
            {result.type === "EXPIRED" && <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />}
            {result.type === "NOT_FOUND" && <Search className="w-5 h-5 text-slate-500 dark:text-zinc-400 flex-shrink-0 mt-0.5" />}

            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-sm">
                  {result.member ? result.member.full_name : "Pencarian Tidak Ditemukan"}
                </span>
                {result.member && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-black/40 border border-slate-300 dark:border-white/10">
                    {result.member.member_code} • {result.member.plan_name}
                  </span>
                )}
              </div>
              <p className="text-xs mt-0.5 opacity-90">{result.message}</p>
            </div>
          </div>

          {result.member && (
            <div className="flex items-center gap-2 self-end sm:self-auto">
              {result.type === "EXPIRED" && (
                <button
                  onClick={() => {
                    onOpenRenewModal(result.member!);
                    setResult(null);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 text-white dark:bg-brand-neon dark:text-black font-display font-bold text-xs uppercase tracking-wider hover:bg-black dark:hover:bg-brand-neonHover transition-all"
                >
                  Perpanjang Sekarang
                </button>
              )}
              {result.type === "WARNING" && (
                <a
                  href={generateWhatsAppReminderUrl(result.member)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white dark:bg-emerald-500 dark:text-black font-display font-bold text-xs uppercase tracking-wider hover:bg-emerald-700 dark:hover:bg-emerald-400 transition-all"
                >
                  Kirim Pengingat WA
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
