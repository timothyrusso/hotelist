import { Colors } from "@/src/ui/constants/style/Colors";
import { Fonts } from "@/src/ui/constants/style/Font";
import { Opacity } from "@/src/ui/constants/style/Opacity";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		gap: Spacing.Double,
		paddingHorizontal: Spacing.Double,
		paddingVertical: Spacing.Double,
		borderRadius: Spacing.Fourfold,
		borderWidth: 1,
		borderColor: Colors.black.disabled,
		backgroundColor: Colors.alpha.default,
		alignSelf: "flex-start",
		flexDirection: "row",
	},
	text: {
		fontSize: Spacing.Double,
		fontFamily: Fonts.interBold,
		color: Colors.white.default,
	},
	pressed: {
		opacity: Opacity.default,
	},
});
