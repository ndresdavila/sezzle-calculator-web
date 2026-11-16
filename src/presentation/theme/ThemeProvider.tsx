import { useCallback, useLayoutEffect, useState, type ReactNode } from "react";
import { applyTheme, readInitialTheme, themeStorageKey } from "./applyTheme";
import { ThemeContext, type ThemeMode } from "./themeContext";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(readInitialTheme);

  useLayoutEffect(() => {
    applyTheme(mode);
    window.localStorage.setItem(themeStorageKey, mode);
  }, [mode]);

  const toggle = useCallback(() => {
    setMode((current) => (current === "light" ? "dark" : "light"));
  }, []);

  return <ThemeContext.Provider value={{ mode, toggle }}>{children}</ThemeContext.Provider>;
}
