import { Colors } from "@/src/ui/constants/style/Colors";
import { type Animated, StyleSheet } from "react-native";

export const styles = (opacity: Animated.Value) =>
	StyleSheet.create({
		container: {
			backgroundColor: Colors.black.disabled,
			opacity: opacity,
		},
	});
