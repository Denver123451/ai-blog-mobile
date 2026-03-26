import { accent, dark, light } from "@/src/theme/tokens";

export default {
  light: {
    text: light.textPrimary,
    background: light.bgPrimary,
    tint: accent.primary,
    tabIconDefault: light.textMuted,
    tabIconSelected: accent.primary,
  },
  dark: {
    text: dark.textPrimary,
    background: dark.bgPrimary,
    tint: accent.primary,
    tabIconSelected: accent.primary,
    tabIconDefault: dark.textMuted,
  },
};
