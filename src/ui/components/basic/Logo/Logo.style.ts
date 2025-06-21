import { Colors } from "@/src/ui/constants/style/Colors";
import { Fonts } from "@/src/ui/constants/style/Fonts";
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
		fontSize: Spacing.Double,
		fontFamily: Fonts.interBold,
		paddingRight: Spacing.SingleAndHalf,
	},
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		alignSelf: "flex-start",
		backgroundColor: Colors.black.disabled,
		borderRadius: Spacing.Quintuple,
		columnGap: Spacing.SingleAndHalf,
	},
});
