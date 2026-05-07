"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const THEMES = {
  dark: { emoji: "⛰️", label: "Switch to light theme", next: "light" },
  light: { emoji: "🌳", label: "Switch to dark theme", next: "dark" },
} as const;

const noop = () => () => {};
const useIsMounted = () =>
  useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useIsMounted();

  if (!mounted) {
    return <span className="h-9 w-9" aria-hidden />;
  }

  const current = theme === "light" ? THEMES.light : THEMES.dark;

  return (
    <button
      onClick={() => setTheme(current.next)}
      aria-label={current.label}
      title={current.label}
      className="flex h-9 w-9 items-center justify-center rounded-md text-lg transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {current.emoji}
    </button>
  );
}
