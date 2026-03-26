import { Text } from "@/components/Themed";
import type { Blog } from "@/src/types/blog";
import { Pressable, StyleSheet } from "react-native";
type Props = {
  blog: Blog;
  onPress: () => void;
};
export default function BlogCard({ blog, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Text style={styles.title}>{blog.name}</Text>
      <Text style={styles.description} numberOfLines={3}>
        {blog.description}
      </Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
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
