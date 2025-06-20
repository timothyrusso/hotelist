import { Colors } from "@/src/ui/constants/style/Colors";
import { fonts } from "@/src/ui/constants/style/fonts";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	logo: {
		width: Spacing.Quintuple,
		height: Spacing.Quintuple,
		borderRadius: Spacing.Quintuple,
		backgroundColor: Colors.alpha.default,
	},
	logoText: {
		fontSize: Spacing.Double,
		fontFamily: fonts.interMedium,
		paddingRight: Spacing.Single,
	},
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		alignSelf: "flex-start",
		backgroundColor: Colors.black.disabled,
		borderRadius: Spacing.Quintuple,
		columnGap: Spacing.Single,
	},
});
