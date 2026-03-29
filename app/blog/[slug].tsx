import { Text } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import { fetchBlogBySlug } from "@/src/api/blogs";
import type { Blog } from "@/src/types/blog";
import { accent, dark, light } from "@/src/theme/tokens";
import { formatContentForText } from "@/src/utils/formatContent";
import { getImageUrl } from "@/src/utils/media";
import { Stack, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

function slugFromParams(
  raw: string | string[] | undefined,
): string | null {
  if (raw == null) return null;
  const s = Array.isArray(raw) ? raw[0] : raw;
  return typeof s === "string" && s.length > 0 ? s : null;
}

export default function BlogDetailScreen() {
  const params = useLocalSearchParams<{ slug: string }>();
  const slug = slugFromParams(params.slug as string | string[] | undefined);
  const colorScheme = useColorScheme();
  const palette = colorScheme === "dark" ? dark : light;

  const [post, setPost] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!slug) {
      setError("Invalid link.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBlogBySlug(slug);
      setPost(data);
      if (!data) setError("Article not found.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    void load();
  }, [load]);

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: palette.bgPrimary }]}>
        <Stack.Screen options={{ title: "Article" }} />
        <ActivityIndicator size="large" color={accent.primary} />
        <Text style={[styles.muted, { color: palette.textSecondary }]}>
          Loading…
        </Text>
      </View>
    );
  }

  if (error || !post) {
    return (
      <View style={[styles.centered, { backgroundColor: palette.bgPrimary }]}>
        <Stack.Screen options={{ title: "Article" }} />
        <Text style={[styles.errorText, { color: palette.textPrimary }]}>
          {error ?? "Article not found."}
        </Text>
        <Pressable
          onPress={() => void load()}
          style={({ pressed }) => [
            styles.retry,
            { backgroundColor: accent.primary },
            pressed && styles.retryPressed,
          ]}
        >
          <Text style={styles.retryLabel}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  const imageUri = getImageUrl(post.image?.url);
  const bodyText = formatContentForText(post.content);

  return (
    <ScrollView
      style={{ backgroundColor: palette.bgPrimary }}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Stack.Screen options={{ title: post.name }} />

      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={[
            styles.cover,
            { backgroundColor: palette.bgSecondary },
          ]}
          resizeMode="cover"
          accessibilityLabel={
            post.image?.alternativeText ?? post.name
          }
        />
      ) : null}

      <View
        style={[
          styles.articleCard,
          {
            backgroundColor: palette.bgCard,
            borderColor: palette.border,
          },
        ]}
      >
        <Text style={[styles.title, { color: palette.textPrimary }]}>
          {post.name}
        </Text>
        {post.publishedAt ? (
          <Text style={[styles.meta, { color: palette.textMuted }]}>
            {new Date(post.publishedAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </Text>
        ) : null}
        <Text style={[styles.lead, { color: palette.textSecondary }]}>
          {post.description}
        </Text>
        <Text style={[styles.body, { color: palette.textPrimary }]}>
          {bodyText}
        </Text>
      </View>
    </ScrollView>
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
  muted: {
    marginTop: 8,
    fontSize: 15,
  },
  errorText: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 8,
  },
  retry: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  retryPressed: {
    opacity: 0.9,
  },
  retryLabel: {
    color: "#fff",
    fontWeight: "600",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  cover: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 12,
    marginBottom: 16,
  },
  articleCard: {
    padding: 12,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 28,
    marginBottom: 6,
  },
  meta: {
    fontSize: 13,
    marginBottom: 10,
  },
  lead: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  body: {
    fontSize: 15,
    lineHeight: 24,
  },
});
