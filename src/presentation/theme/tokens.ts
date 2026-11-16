export const themeModes = ["light", "dark"] as const;

export type ThemeMode = (typeof themeModes)[number];

/**
 * Every color used by the interface lives here.
 * Components and CSS reference these values only through the variables
 * created in applyTheme, so a palette change is a one-line edit.
 */
export interface ThemeTokens {
  appBackground: string;
  appGlow: string;
  deviceBackground: string;
  deviceShadow: string;
  deviceBorder: string;
  statusBar: string;
  displayPrimary: string;
  displayMuted: string;
  displayError: string;
  keyBackground: string;
  keyText: string;
  keyAccent: string;
  keyShadow: string;
  keyShadowActive: string;
  toggleBackground: string;
  toggleText: string;
  focusRing: string;
}

export const themes: Record<ThemeMode, ThemeTokens> = {
  light: {
    appBackground: "#E7F1FB",
    appGlow: "#F8FBFF",
    deviceBackground: "#F4F8FD",
    deviceShadow: "0 30px 80px rgba(160, 190, 230, 0.45)",
    deviceBorder: "rgba(255, 255, 255, 0.75)",
    statusBar: "#8EA0B5",
    displayPrimary: "#2F80ED",
    displayMuted: "#98A6B8",
    displayError: "#E15B64",
    keyBackground: "#FFFFFF",
    keyText: "#243044",
    keyAccent: "#2F80ED",
    keyShadow: "0 10px 22px rgba(170, 196, 230, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.95)",
    keyShadowActive: "inset 0 3px 8px rgba(160, 184, 214, 0.55)",
    toggleBackground: "rgba(47, 128, 237, 0.10)",
    toggleText: "#2F80ED",
    focusRing: "#2F80ED",
  },
  dark: {
    appBackground: "#151C27",
    appGlow: "#2A3A50",
    deviceBackground: "#2A3546",
    deviceShadow: "0 30px 80px rgba(0, 0, 0, 0.38)",
    deviceBorder: "rgba(255, 255, 255, 0.05)",
    statusBar: "#93A4B8",
    displayPrimary: "#F7FAFC",
    displayMuted: "#8B9BB0",
    displayError: "#FF8B95",
    keyBackground: "#334155",
    keyText: "#E6EDF5",
    keyAccent: "#F7FAFC",
    keyShadow: "0 8px 16px rgba(15, 22, 33, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
    keyShadowActive: "inset 0 3px 8px rgba(0, 0, 0, 0.38)",
    toggleBackground: "rgba(255, 255, 255, 0.08)",
    toggleText: "#E7EEF6",
    focusRing: "#8FB9FF",
  },
};
