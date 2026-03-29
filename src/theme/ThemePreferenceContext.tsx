import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";
const STORAGE_KEY = "@ai_blog_theme_preference";
export type ThemePreference = "light" | "dark" | "system";
type Value = {
  preference: ThemePreference;
  setPreference: (next: ThemePreference) => void;
  resolvedScheme: "light" | "dark";
};
const ThemePreferenceContext = createContext<Value | null>(null);
function systemToResolved(raw: string | null | undefined): "light" | "dark" {
  if (raw === "dark") return "dark";
  return "light";
}
export function ThemePreferenceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const systemScheme = useSystemColorScheme();
  const systemResolved = systemToResolved(systemScheme);
  const [preference, setPreferenceState] = useState<ThemePreference>("system");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let alive = true;
    void (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (!alive) return;
        if (stored === "light" || stored === "dark" || stored === "system") {
          setPreferenceState(stored);
        }
      } finally {
        if (alive) setReady(true);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);
  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next);
    void AsyncStorage.setItem(STORAGE_KEY, next);
  }, []);
  const resolvedScheme: "light" | "dark" =
    preference === "system" ? systemResolved : preference;
  const value = useMemo(
    () => ({
      preference,
      setPreference,
      resolvedScheme,
    }),
    [preference, setPreference, resolvedScheme],
  );
  if (!ready) {
    return null;
  }
  return (
    <ThemePreferenceContext.Provider value={value}>
      {children}
    </ThemePreferenceContext.Provider>
  );
}
export function useThemePreference(): Value {
  const ctx = useContext(ThemePreferenceContext);
  if (!ctx) {
    throw new Error("ThemePreferenceProvider is missing");
  }
  return ctx;
}
