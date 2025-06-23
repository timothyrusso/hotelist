import { Colors } from "@/src/ui/constants/style/Colors";
import { Components } from "@/src/ui/constants/style/Components";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: Components.hotelCardSkeleton.image.height,
		borderRadius: Spacing.Double,
		flexDirection: "row",
		alignItems: "center",
		paddingLeft: Spacing.Double,
		columnGap: Spacing.Double,
	},
	image: {
		width: Components.hotelCard.image.width,
		height: Components.hotelCard.image.width,
		borderRadius: Spacing.Double,
		backgroundColor: Colors.black.hover,
	},
	content: {
		flex: 1,
		rowGap: Spacing.Double,
		width: "100%",
	},
	name: {
		width: Spacing.Sextuple,
		height: Spacing.TripleAndHalf,
		backgroundColor: Colors.black.hover,
		borderRadius: Spacing.Double,
	},
	city: {
		width: Spacing.separator160,
		height: Spacing.TripleAndHalf,
		backgroundColor: Colors.black.hover,
		borderRadius: Spacing.Double,
	},
});
