import { Colors } from "@/src/ui/constants/style/Colors";
import { Fonts } from "@/src/ui/constants/style/Font";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	logo: {
		width: Spacing.Sextuple,
		height: Spacing.Sextuple,
		borderRadius: Spacing.Sextuple,
		backgroundColor: Colors.alpha.default,
	},
	logoText: {
		fontSize: Spacing.Triple,
		fontFamily: Fonts.interBold,
		paddingRight: Spacing.SingleAndHalf,
		width: "100%",
	},
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		alignSelf: "flex-start",
		columnGap: Spacing.SingleAndHalf,
	},
});
