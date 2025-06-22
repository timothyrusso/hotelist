import { Dimensions, Platform } from "react-native";

export const Platforms = {
	iOS: Platform.OS === "ios",
	Android: Platform.OS === "android",
} as const;

export const SCREEN_WIDTH = Dimensions.get("window").width;
