import { Spacing } from "@/src/ui/constants/style/Spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	listContainer: {
		flex: 1,
		width: "100%",
	},
	listContentContainer: {
		paddingHorizontal: Spacing.TripleAndHalf,
		paddingBottom: Spacing.separator40,
	},
	separator: {
		height: Spacing.TripleAndHalf,
	},
});
