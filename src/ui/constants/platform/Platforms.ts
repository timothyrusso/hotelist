import { Platform } from "react-native";

export const Platforms = {
	iOS: Platform.OS === "ios",
	Android: Platform.OS === "android",
} as const;
