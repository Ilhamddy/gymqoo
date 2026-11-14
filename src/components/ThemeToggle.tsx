"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
  variant?: "dock" | "standard";
}

export default function ThemeToggle({ className = "", variant = "standard" }: ThemeToggleProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("gymqoo_theme") as "light" | "dark" | null;
    const initialTheme = saved || "light";
    setTheme(initialTheme);

    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<"light" | "dark">;
      if (customEvent.detail) {
        setTheme(customEvent.detail);
      }
    };

    window.addEventListener("gymqoo-theme-change", handleThemeChange);
    return () => window.removeEventListener("gymqoo-theme-change", handleThemeChange);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("gymqoo_theme", nextTheme);

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    window.dispatchEvent(
      new CustomEvent("gymqoo-theme-change", { detail: nextTheme })
    );
  };

  // Base styling for standard buttons vs dock buttons
  const isDock = variant === "dock";

  const buttonClasses = isDock
    ? `relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 bg-white/10 hover:bg-white/20 border border-white/20 text-white ${className}`
    : `relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 bg-slate-100 hover:bg-slate-200 dark:bg-surface dark:hover:bg-surfaceHover border border-slate-200 dark:border-borderDark ${className}`;

  if (!mounted) {
    return (
      <div className={`w-8 h-8 rounded-full bg-white/10 ${className}`} />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label="Toggle Light/Dark Theme"
      title={theme === "light" ? "Mode saat ini: Light. Klik untuk Dark Mode" : "Mode saat ini: Dark. Klik untuk Light Mode"}
      className={buttonClasses}
    >
      {theme === "light" ? (
        // When in LIGHT mode, show the Moon icon so user can switch to dark
        // In dock (dark bg), make it glowing amber/white so it is 100% visible!
        <Moon className={`w-4 h-4 transition-transform duration-200 hover:rotate-12 ${
          isDock ? "text-amber-200 fill-amber-200/20" : "text-slate-800 dark:text-zinc-200"
        }`} />
      ) : (
        // When in DARK mode, show the Sun icon so user can switch to light
        <Sun className="w-4 h-4 text-amber-400 fill-amber-400/20 transition-transform duration-200 hover:rotate-45" />
      )}
    </button>
  );
}
