import { Colors } from "@/src/ui/constants/style/Colors";
import { Fonts } from "@/src/ui/constants/style/Fonts";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		padding: Spacing.SingleAndHalf,
		borderRadius: Spacing.Triple,
		backgroundColor: Colors.black.disabled,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	contentContainer: {
		alignItems: "center",
		flex: 1,
		rowGap: Spacing.MinimalDouble,
	},
	title: {
		fontSize: Spacing.Double,
		fontFamily: Fonts.interMedium,
		color: Colors.black.hover,
	},
	date: {
		fontSize: Spacing.Double + Spacing.Minimal,
		fontFamily: Fonts.interMedium,
	},
	separator: {
		width: Spacing.HalfMinimal,
		backgroundColor: Colors.black.hover,
		borderRadius: Spacing.SingleAndHalf,
	},
});
