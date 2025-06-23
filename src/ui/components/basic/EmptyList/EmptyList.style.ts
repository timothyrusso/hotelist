import { Fonts } from "@/src/ui/constants/style/Font";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		rowGap: Spacing.Double,
		marginTop: Spacing.separator40,
	},
	text: {
		fontSize: Spacing.Triple,
		fontFamily: Fonts.interMedium,
		textAlign: "center",
	},
});
