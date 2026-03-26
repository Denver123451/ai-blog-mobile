export const accent = {
  primary: "#6366f1",
  hover: "#4f46e5",
} as const;
export const light = {
  bgPrimary: "#ffffff",
  bgSecondary: "#f4f4f5",
  bgCard: "#ffffff",
  accentSubtle: "#eef2ff",
  border: "#e4e4e7",
  textPrimary: "#0a0a0a",
  textSecondary: "#71717a",
  textMuted: "#a1a1aa",
} as const;
export const dark = {
  bgPrimary: "#0f1117",
  bgSecondary: "#1a1d27",
  bgCard: "#1e2130",
  accentSubtle: "#1e1b4b",
  border: "#2e3147",
  textPrimary: "#f0f0f0",
  textSecondary: "#a1a1aa",
  textMuted: "#52525b",
} as const;
export type ThemeMode = "light" | "dark";
