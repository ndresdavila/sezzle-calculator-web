import { themes, type ThemeMode, type ThemeTokens } from "./tokens";

export const themeStorageKey = "calculator-theme";

export function cssVariableName(token: string): string {
  return `--${token.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`;
}

export function readInitialTheme(): ThemeMode {
  const stored = window.localStorage.getItem(themeStorageKey);
  if (stored === "light" || stored === "dark") {
    return stored;
  }
  const query = window.matchMedia?.("(prefers-color-scheme: dark)");
  return query?.matches ? "dark" : "light";
}

export function applyTheme(mode: ThemeMode): void {
  const tokens = themes[mode];
  const root = document.documentElement;
  root.dataset.theme = mode;
  root.style.colorScheme = mode;
  (Object.keys(tokens) as Array<keyof ThemeTokens>).forEach((key) => {
    root.style.setProperty(cssVariableName(key), tokens[key]);
  });
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", tokens.appBackground);
}
