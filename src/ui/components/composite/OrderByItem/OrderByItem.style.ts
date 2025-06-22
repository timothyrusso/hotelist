import { Colors } from "@/src/ui/constants/style/Colors";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		marginHorizontal: Spacing.TripleAndHalf,
		paddingVertical: Spacing.Fourfold,
		rowGap: Spacing.Triple,
		borderBottomWidth: 1,
		borderBottomColor: Colors.black.disabled,
	},
	dataContainer: {
		alignItems: "flex-start",
		gap: Spacing.Double,
	},
});
