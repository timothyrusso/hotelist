import { Platforms } from "@/src/ui/constants/platform/Platforms";
import { Colors } from "@/src/ui/constants/style/Colors";
import { Components } from "@/src/ui/constants/style/Components";
import { Fonts } from "@/src/ui/constants/style/Fonts";
import { Opacity } from "@/src/ui/constants/style/Opacity";
import { Shadows } from "@/src/ui/constants/style/Shadows";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "row",
		gap: Spacing.Double,
		boxShadow: Shadows.default,
		borderRadius: Spacing.Double,
		padding: Spacing.Double,
	},
	image: {
		width: Components.hotelCard.image.width,
		height: Components.hotelCard.image.width,
		borderRadius: Spacing.Double,
	},
	iconImage: {
		width: Components.hotelCard.image.width,
		height: Components.hotelCard.image.width,
		borderRadius: Spacing.Double,
		backgroundColor: Colors.alpha.default,
		alignItems: "center",
		justifyContent: "center",
	},
	stars: {
		fontSize: Spacing.Double,
		fontFamily: Fonts.interBold,
	},
	price: {
		fontSize: Spacing.Triple - Spacing.Minimal,
		fontFamily: Fonts.interBold,
		bottom: Platforms.Android ? 0.6 : 0,
	},
	starsContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: Spacing.MinimalDouble,
		backgroundColor: Colors.gamma.default,
		paddingHorizontal: Spacing.Single,
		paddingVertical: Spacing.Minimal,
		borderRadius: Spacing.Double,
	},
	priceContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: Spacing.MinimalDouble,
		marginRight: Spacing.SingleAndHalf,
	},
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		columnGap: Spacing.Double,
	},
	contentContainer: {
		flex: 1,
		width: "100%",
		gap: Spacing.Double,
		justifyContent: "space-evenly",
	},
	name: {
		fontSize: Spacing.Triple,
		fontFamily: Fonts.interBold,
		width: "80%",
	},
	cityContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: Spacing.MinimalDouble,
		left: -2,
	},
	city: {
		fontSize: Spacing.Double,
		fontFamily: Fonts.interMedium,
		color: Colors.black.hover,
		width: "100%",
	},
	chevron: {
		position: "absolute",
		right: Spacing.Double,
		alignSelf: "center",
	},
	pressed: {
		opacity: Opacity.default,
	},
});
