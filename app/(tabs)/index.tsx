import BlogHero from "@/components/BlogHero";
import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { fetchBlogs } from "@/src/api/blogs";
import type { Blog } from "@/src/types/blog";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
export default function BlogListScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBlogs();
      setBlogs(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    void load();
  }, [load]);

  const listHeader = useMemo(() => <BlogHero />, []);

  if (loading && blogs.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors[colorScheme].tint} />
        <Text style={styles.hint}>Loading…</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
        <Pressable
          onPress={() => void load()}
          style={({ pressed }) => [
            styles.retry,
            pressed && styles.retryPressed,
          ]}
        >
          <Text style={styles.retryLabel}>Retry</Text>
        </Pressable>
      </View>
    );
  }
  if (blogs.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.hint}>No posts yet.</Text>
      </View>
    );
  }
  return (
    <FlatList
      ListHeaderComponent={listHeader}
      data={blogs}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.listContent}
      refreshing={loading}
      onRefresh={() => void load()}
      renderItem={({ item }) => (
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/blog/[slug]",
              params: { slug: item.slug },
            })
          }
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        >
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.description} numberOfLines={3}>
            {item.description}
          </Text>
        </Pressable>
      )}
    />
  );
}
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 12,
  },
  hint: {
    marginTop: 8,
    opacity: 0.7,
  },
  error: {
    textAlign: "center",
    marginBottom: 8,
  },
  retry: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#2f95dc",
  },
  retryPressed: {
    opacity: 0.85,
  },
  retryLabel: {
    color: "#fff",
    fontWeight: "600",
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(128,128,128,0.35)",
  },
  cardPressed: {
    opacity: 0.9,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    opacity: 0.85,
    lineHeight: 22,
  },
});
