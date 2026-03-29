import { Text } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import { dark, light } from "@/src/theme/tokens";
import type { Blog } from "@/src/types/blog";
import { getImageUrl } from "@/src/utils/media";
import { Image, Pressable, StyleSheet, View } from "react-native";

const THUMB_SIZE = 72;
type Props = {
  blog: Blog;
  onPress: () => void;
};
export default function BlogCard({ blog, onPress }: Props) {
  // console.log("first image raw?", JSON.stringify(blog.image));
  const colorScheme = useColorScheme();
  const palette = colorScheme === "dark" ? dark : light;
  const imageUri = getImageUrl(blog.image?.url);
  const a11yLabel = blog.image?.alternativeText ?? blog.name;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          borderColor: palette.border,
          backgroundColor: palette.bgCard,
        },
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.row}>
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={[styles.thumb, { backgroundColor: palette.bgSecondary }]}
            resizeMode="cover"
            accessibilityLabel={a11yLabel}
          />
        ) : (
          <View
            style={[styles.thumb, { backgroundColor: palette.bgSecondary }]}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          />
        )}
        <View style={styles.textBlock}>
          <Text
            style={[styles.title, { color: palette.textPrimary }]}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {blog.name}
          </Text>
          <Text
            style={[styles.description, { color: palette.textSecondary }]}
            ellipsizeMode="tail"
            numberOfLines={2}
          >
            {blog.description}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  cardPressed: {
    opacity: 0.92,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  textBlock: {
    flex: 1,
    minWidth: 0,
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
  },
});
