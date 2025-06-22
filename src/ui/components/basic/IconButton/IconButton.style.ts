import { Opacity } from "@/src/ui/constants/style/Opacity";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		padding: Spacing.SingleAndHalf,
		borderRadius: Spacing.Fourfold,
	},
	pressed: {
		opacity: Opacity.default,
	},
	icon: {
		right: Spacing.HalfMinimal,
	},
});
