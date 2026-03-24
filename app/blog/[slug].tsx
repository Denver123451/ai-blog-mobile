import { Text } from "@/components/Themed";
import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
export default function BlogDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  return (
    <ScrollView contentContainerStyle={styles.body}>
      <Stack.Screen options={{ title: "Article" }} />
      <Text style={styles.title}>Slug: {String(slug)}</Text>
      <Text>Replace this with full article (step next).</Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  body: { padding: 20 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
});
