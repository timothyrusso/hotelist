import { Components } from "@/src/ui/constants/style/Components";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	listContainer: {
		flex: 1,
		width: "100%",
	},
	listContentContainer: {
		paddingBottom: Spacing.separator40,
	},
	separator: {
		height: Spacing.TripleAndHalf,
	},
	skeleton: {
		width: "100%",
		height: Components.hotelCardSkeleton.image.height,
		borderRadius: Spacing.Double,
	},
	hotelCard: {
		paddingHorizontal: Spacing.TripleAndHalf,
	},
});
