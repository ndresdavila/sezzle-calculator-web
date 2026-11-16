import { createContext, useContext } from "react";
import type { ThemeMode } from "./tokens";

export type { ThemeMode };

interface ThemeController {
  mode: ThemeMode;
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeController | null>(null);

export function useTheme(): ThemeController {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return theme;
}
