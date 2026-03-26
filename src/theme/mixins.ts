import { Platform, TextStyle, ViewStyle } from "react-native";

export const flexCenter: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
};

export const flexBetween: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
};

export const container: ViewStyle = {
  width: "100%",
  paddingHorizontal: 24,
};

export function cardShadow(mode: "light" | "dark"): ViewStyle {
  if (Platform.OS === "android") {
    return {
      elevation: 4,
    };
  }
  return {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: mode === "light" ? 0.1 : 0.35,
    shadowRadius: 12,
  };
}

export function truncateLines(lines: number): TextStyle {
  return {
    overflow: "hidden",
  };
}
