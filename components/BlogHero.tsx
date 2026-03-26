import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import { accent, dark, light } from "@/src/theme/tokens";
import { Text as RNText, View as RNView, StyleSheet } from "react-native";
export default function BlogHero() {
  const colorScheme = useColorScheme();
  const palette = colorScheme === "dark" ? dark : light;
  return (
    <View style={styles.hero}>
      <RNView style={[styles.badge, { backgroundColor: palette.accentSubtle }]}>
        <RNText style={[styles.badgeText, { color: accent.primary }]}>
          AI-Powered Blog Platform
        </RNText>
      </RNView>
      <Text style={styles.title}>Insights on AI,{"\n"}Tech & Innovation</Text>
      <Text
        lightColor={light.textSecondary}
        darkColor={dark.textSecondary}
        style={styles.subtitle}
      >
        Explore the latest articles on artificial intelligence, software
        development, and the technologies shaping our future.
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  hero: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 12,
    paddingTop: 24,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 340,
  },
});
