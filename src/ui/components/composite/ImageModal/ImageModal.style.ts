import { Spacing } from "@/src/ui/constants/style/Spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.8)",
		justifyContent: "center",
		alignItems: "center",
	},
	closeButton: {
		position: "absolute",
		top: Spacing.separator120,
		right: Spacing.Double,
		zIndex: 1,
		width: Spacing.separator40,
		height: Spacing.separator40,
		justifyContent: "center",
		alignItems: "center",
	},
	modalImage: {
		width: "100%",
		height: "100%",
		borderRadius: Spacing.Fourfold,
	},
});
