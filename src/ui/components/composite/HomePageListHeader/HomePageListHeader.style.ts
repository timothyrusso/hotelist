import { Colors } from "@/src/ui/constants/style/Colors";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		paddingBottom: Spacing.Fourfold,
		paddingTop: Spacing.separator80,
		rowGap: Spacing.Fourfold,
		backgroundColor: Colors.white.default,
		width: "100%",
		paddingHorizontal: Spacing.TripleAndHalf,
	},
	searchBarContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		columnGap: Spacing.SingleAndHalf,
	},
	chipsContainer: {
		flexDirection: "row",
		alignItems: "center",
		columnGap: Spacing.SingleAndHalf,
		width: "100%",
		flexWrap: "wrap",
		rowGap: Spacing.SingleAndHalf,
	},
	chip: {
		height: Spacing.Sextuple,
	},
});
