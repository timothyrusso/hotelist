import { Colors } from "@/src/ui/constants/style/Colors";
import { Fonts } from "@/src/ui/constants/style/Fonts";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		padding: Spacing.SingleAndHalf,
		borderRadius: Spacing.Fourfold,
		backgroundColor: Colors.white.default,
	},
	label: {
		fontSize: Spacing.Triple,
		fontFamily: Fonts.interBold,
		color: Colors.black.default,
	},
});
