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
  displayPrimary: string;
  displayMuted: string;
  displayError: string;
  keyBackground: string;
  keyText: string;
  keyFunction: string;
  keyFunctionText: string;
  keyOperator: string;
  keyOperatorText: string;
  keyShadow: string;
  keyShadowActive: string;
  keyFunctionShadow: string;
  keyFunctionShadowActive: string;
  keyOperatorShadow: string;
  keyOperatorShadowActive: string;
  toggleBackground: string;
  toggleText: string;
  focusRing: string;
}

export const themes: Record<ThemeMode, ThemeTokens> = {
  light: {
    appBackground: "#B7CDE6",
    appGlow: "#D5E4F5",
    deviceBackground: "#F4F8FD",
    deviceShadow:
      "0 8px 0 #E4EDF6, 0 16px 24px rgba(150, 175, 205, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.95)",
    deviceBorder: "rgba(255, 255, 255, 0.75)",
    displayPrimary: "#2F80ED",
    displayMuted: "#98A6B8",
    displayError: "#E15B64",
    keyBackground: "#FFFFFF",
    keyText: "#243044",
    keyFunction: "#D7E6F6",
    keyFunctionText: "#3C5270",
    keyOperator: "#2F80ED",
    keyOperatorText: "#FFFFFF",
    keyShadow:
      "0 4px 0 rgba(186, 206, 226, 0.95), 0 8px 12px rgba(160, 186, 214, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.98), inset 0 -4px 6px rgba(190, 208, 226, 0.45)",
    keyShadowActive: "0 1px 0 rgba(186, 206, 226, 0.95), inset 0 3px 6px rgba(170, 190, 214, 0.48)",
    keyFunctionShadow:
      "0 4px 0 rgba(168, 192, 220, 0.95), 0 8px 12px rgba(150, 176, 210, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -4px 6px rgba(150, 178, 210, 0.4)",
    keyFunctionShadowActive: "0 1px 0 rgba(168, 192, 220, 0.95), inset 0 3px 6px rgba(140, 168, 200, 0.42)",
    keyOperatorShadow:
      "0 4px 0 rgba(31, 92, 184, 0.58), 0 8px 12px rgba(47, 128, 237, 0.26), inset 0 1px 0 rgba(255, 255, 255, 0.48), inset 0 -4px 6px rgba(18, 70, 150, 0.3)",
    keyOperatorShadowActive: "0 1px 0 rgba(31, 92, 184, 0.58), inset 0 3px 6px rgba(18, 64, 140, 0.38)",
    toggleBackground: "rgba(47, 128, 237, 0.10)",
    toggleText: "#2F80ED",
    focusRing: "#2F80ED",
  },
  dark: {
    appBackground: "#070B10",
    appGlow: "#121A26",
    deviceBackground: "#2A3546",
    deviceShadow:
      "0 8px 0 #243140, 0 16px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
    deviceBorder: "rgba(255, 255, 255, 0.05)",
    displayPrimary: "#F7FAFC",
    displayMuted: "#8B9BB0",
    displayError: "#FF8B95",
    keyBackground: "#334155",
    keyText: "#E6EDF5",
    keyFunction: "#46566F",
    keyFunctionText: "#F2F6FB",
    keyOperator: "#4C8DFF",
    keyOperatorText: "#FFFFFF",
    keyShadow:
      "0 4px 0 rgba(16, 24, 36, 0.9), 0 8px 12px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.16), inset 0 -4px 6px rgba(0, 0, 0, 0.3)",
    keyShadowActive: "0 1px 0 rgba(16, 24, 36, 0.9), inset 0 3px 6px rgba(0, 0, 0, 0.4)",
    keyFunctionShadow:
      "0 4px 0 rgba(18, 26, 38, 0.9), 0 8px 12px rgba(0, 0, 0, 0.26), inset 0 1px 0 rgba(255, 255, 255, 0.16), inset 0 -4px 6px rgba(0, 0, 0, 0.28)",
    keyFunctionShadowActive: "0 1px 0 rgba(18, 26, 38, 0.9), inset 0 3px 6px rgba(0, 0, 0, 0.38)",
    keyOperatorShadow:
      "0 4px 0 rgba(24, 70, 160, 0.85), 0 8px 12px rgba(20, 60, 140, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -4px 6px rgba(16, 52, 130, 0.32)",
    keyOperatorShadowActive: "0 1px 0 rgba(24, 70, 160, 0.85), inset 0 3px 6px rgba(16, 52, 130, 0.4)",
    toggleBackground: "rgba(255, 255, 255, 0.08)",
    toggleText: "#E7EEF6",
    focusRing: "#8FB9FF",
  },
};
