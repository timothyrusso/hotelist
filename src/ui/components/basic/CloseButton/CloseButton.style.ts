import { Opacity } from "@/src/ui/constants/style/Opacity";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		position: "absolute",
		right: Spacing.Double + Spacing.Minimal,
		top: Spacing.Triple + Spacing.Minimal,
	},
	pressed: {
		opacity: Opacity.default,
	},
});
