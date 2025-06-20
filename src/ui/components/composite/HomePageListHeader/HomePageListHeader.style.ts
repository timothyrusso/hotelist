import { Spacing } from "@/src/ui/constants/style/Spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		paddingBottom: Spacing.Fourfold,
		paddingTop: Spacing.separator80,
		rowGap: Spacing.Fourfold,
	},
	searchBarContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		columnGap: Spacing.SingleAndHalf,
	},
});
