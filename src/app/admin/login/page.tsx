"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Dumbbell, Shield, Lock, User, ArrowLeft, Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { verifyCredentials, setStaffSession, getStaffSession, DEFAULT_STAFF } from "@/lib/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // If already logged in, redirect straight to /admin
  useEffect(() => {
    const existing = getStaffSession();
    if (existing) {
      router.replace("/admin");
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    setTimeout(() => {
      const res = verifyCredentials(username, password);
      if (res.success && res.user) {
        setStaffSession(res.user);
        setSuccess(true);
        setTimeout(() => {
          router.replace("/admin");
        }, 600);
      } else {
        setErrorMsg(res.error || "Gagal masuk. Periksa username dan password.");
        setLoading(false);
      }
    }, 400);
  };

  const handleUseDemo = () => {
    setUsername(DEFAULT_STAFF.username);
    setPassword(DEFAULT_STAFF.password);
    setErrorMsg("");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#090A0F] text-slate-900 dark:text-zinc-100 flex flex-col justify-between selection:bg-brand-neon selection:text-black transition-colors relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-lime-500/10 dark:bg-brand-neon/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Bar with Back and Theme Toggle */}
      <header className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white px-3 py-1.5 rounded-xl bg-white dark:bg-surface border border-slate-200 dark:border-borderDark transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Website</span>
        </Link>
        <ThemeToggle />
      </header>

      {/* Login Card Form */}
      <main className="flex-1 flex items-center justify-center p-4 z-10">
        <div className="w-full max-w-md bg-white dark:bg-[#11131A] rounded-3xl border border-slate-200 dark:border-borderDark p-8 sm:p-10 shadow-2xl relative">
          {/* Logo & Header */}
          <div className="text-center space-y-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-lime-500/10 dark:bg-surface border border-lime-500/30 dark:border-borderDark flex items-center justify-center text-lime-600 dark:text-brand-neon mx-auto shadow-sm">
              <Dumbbell className="w-7 h-7 -rotate-45" />
            </div>

            <div>
              <span className="font-display font-black text-2xl tracking-wider text-slate-900 dark:text-white">
                GYM<span className="text-lime-600 dark:text-brand-neon">QOO</span>
              </span>
              <p className="text-xs text-slate-500 dark:text-zinc-400 font-mono mt-1">
                Portal Masuk Staf Resepsionis & Admin
              </p>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-500/40 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>Login Berhasil! Mengalihkan ke Dashboard...</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-zinc-300 font-semibold">
                Username / Email Staf
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-borderDark text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 text-sm focus:outline-none focus:border-slate-900 dark:focus:border-brand-neon transition-all"
                />
                <User className="w-4 h-4 text-slate-400 dark:text-zinc-500 absolute left-3.5 top-3.5" />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-zinc-300 font-semibold">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-borderDark text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 text-sm focus:outline-none focus:border-slate-900 dark:focus:border-brand-neon transition-all"
                />
                <Lock className="w-4 h-4 text-slate-400 dark:text-zinc-500 absolute left-3.5 top-3.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 dark:text-zinc-500 hover:text-slate-700 dark:hover:text-white"
                  title={showPassword ? "Sembunyikan password" : "Lihat password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full py-3.5 rounded-xl bg-slate-900 text-white hover:bg-black dark:bg-brand-neon dark:text-black font-display font-bold text-xs uppercase tracking-wider dark:hover:bg-brand-neonHover transition-all flex items-center justify-center gap-2 shadow-md dark:shadow-[0_0_20px_rgba(204,255,0,0.25)] hover:scale-[1.01] disabled:opacity-50"
            >
              <Shield className="w-4 h-4" />
              <span>{loading ? "Memverifikasi..." : "Masuk ke Dashboard Resepsionis"}</span>
            </button>
          </form>

          {/* Quick Demo Helper Box */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-borderDark/60 text-center space-y-2">
            <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-mono">
              Akun Default: user: <strong className="text-slate-700 dark:text-zinc-200">admin</strong> | pass: <strong className="text-slate-700 dark:text-zinc-200">admin</strong>
            </p>
            <button
              type="button"
              onClick={handleUseDemo}
              className="text-xs font-semibold text-lime-700 dark:text-brand-neon hover:underline"
            >
              Klik di sini untuk isi otomatis akun default
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-slate-500 dark:text-zinc-500 font-mono z-10">
        &copy; {new Date().getFullYear()} Gymqoo Fitness Center Petung • Area Khusus Staf
      </footer>
    </div>
  );
}
