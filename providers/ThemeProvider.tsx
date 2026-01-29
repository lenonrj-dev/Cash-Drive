/* frontend/providers/ThemeProvider.tsx */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { setThemeMode } from "../lib/storage";
import type { ThemeMode } from "../lib/constants";

type ThemeContextValue = {
  mode: ThemeMode;
  resolved: "light" | "dark";
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("light");
  const [resolved, setResolved] = useState<"light" | "dark">("light");

  const apply = useCallback(() => {
    setResolved("light");
    document.documentElement.classList.remove("dark");
  }, []);

  useEffect(() => {
    setModeState("light");
    setThemeMode("light");
    apply();
  }, [apply]);

  const setMode = useCallback(
    (next: ThemeMode) => {
      const nextMode: ThemeMode = next === "light" ? "light" : "light";
      setModeState(nextMode);
      setThemeMode(nextMode);
      apply();
    },
    [apply]
  );

  const toggle = useCallback(() => {
    setMode("light");
  }, [setMode]);

  const value = useMemo(() => ({ mode, resolved, setMode, toggle }), [mode, resolved, setMode, toggle]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
