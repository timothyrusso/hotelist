import { Colors } from "@/src/ui/constants/style/Colors";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
	},
	input: {
		height: Spacing.Sextuple,
		borderWidth: 2,
		borderColor: Colors.alpha.default,
		borderRadius: Spacing.Sextuple,
		paddingRight: Spacing.Triple,
		paddingLeft: Spacing.Quintuple + Spacing.Single,
	},
	icon: {
		position: "absolute",
		left: Spacing.Triple,
		top: Spacing.Triple,
	},
	closeButton: {
		position: "absolute",
		left: Spacing.Triple,
		top: Spacing.Triple + Spacing.Minimal,
		width: Spacing.Double,
	},
});
