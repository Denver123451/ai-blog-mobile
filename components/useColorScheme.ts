import { useThemePreference } from "@/src/theme/ThemePreferenceContext";

export const useColorScheme = () => useThemePreference().resolvedScheme;
