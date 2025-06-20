import { Colors } from "@/src/ui/constants/style/Colors";
import { Opacity } from "@/src/ui/constants/style/Opacity";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Colors.alpha.default,
		borderRadius: Spacing.Quintuple,
		padding: Spacing.Single,
		alignSelf: "flex-end",
		height: Spacing.separator40,
		width: Spacing.separator40,
	},
	pressed: {
		opacity: Opacity.default,
	},
});
