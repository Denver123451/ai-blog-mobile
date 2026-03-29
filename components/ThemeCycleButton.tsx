import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { useThemePreference } from "@/src/theme/ThemePreferenceContext";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
const ORDER = ["light", "dark", "system"] as const;
export default function ThemeCycleButton() {
  const { preference, setPreference } = useThemePreference();
  const resolved = useColorScheme();
  const onPress = () => {
    const i = ORDER.indexOf(preference);
    const next = ORDER[(i + 1) % ORDER.length];
    setPreference(next);
  };
  const icon =
    preference === "dark"
      ? "moon"
      : preference === "light"
        ? "sunny"
        : "phone-portrait-outline";
  return (
    <Pressable
      onPress={onPress}
      style={{ marginRight: 8, padding: 6 }}
      accessibilityLabel="Theme: cycle light, dark, follow system"
    >
      <Ionicons name={icon} size={22} color={Colors[resolved].text} />
    </Pressable>
  );
}
