import { Colors } from "@/src/ui/constants/style/Colors";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
	},
	input: {
		height: Spacing.separator40,
		borderWidth: 2,
		borderColor: Colors.alpha.default,
		borderRadius: Spacing.Double,
		paddingHorizontal: Spacing.Double,
		paddingRight: Spacing.Quintuple,
	},
	icon: {
		position: "absolute",
		right: Spacing.Double,
		top: Spacing.Double,
	},
});
