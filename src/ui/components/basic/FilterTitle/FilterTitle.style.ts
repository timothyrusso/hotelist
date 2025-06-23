import { Fonts } from "@/src/ui/constants/style/Fonts";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		gap: Spacing.Double,
	},
	title: {
		fontSize: Spacing.Triple,
		fontFamily: Fonts.interMedium,
	},
});
