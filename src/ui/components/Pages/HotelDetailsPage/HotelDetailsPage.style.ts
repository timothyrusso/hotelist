import { SCREEN_WIDTH } from "@/src/ui/constants/platform/Platforms";
import { Colors } from "@/src/ui/constants/style/Colors";
import { Components } from "@/src/ui/constants/style/Components";
import { Fonts } from "@/src/ui/constants/style/Font";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import { StyleSheet } from "react-native";

export const styles = (bottom: number, top: number) =>
	StyleSheet.create({
		container: {
			flex: 1,
		},
		imageContainer: {
			width: "100%",
			height: Components.hotelDetailsPage.image.height,
		},
		image: {
			width: SCREEN_WIDTH,
			height: Components.hotelDetailsPage.image.height,
		},
		iconImage: {
			width: SCREEN_WIDTH,
			height: Components.hotelDetailsPage.image.height,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: Colors.alpha.default,
		},
		iconButton: {
			position: "absolute",
			top: top + Spacing.Single,
			left: Spacing.Fourfold,
			zIndex: 1,
		},
		infoContainer: {
			padding: Spacing.Fourfold,
			borderTopLeftRadius: Spacing.Fourfold,
			borderTopRightRadius: Spacing.Fourfold,
			marginTop: -Spacing.Fourfold,
			backgroundColor: Colors.white.default,
		},
		name: {
			fontSize: Spacing.TripleAndHalf,
			fontFamily: Fonts.interBold,
		},
		chip: {
			position: "absolute",
			bottom: Spacing.Sextuple,
			left: Spacing.Fourfold,
			zIndex: 1,
			borderWidth: 2,
			borderColor: Colors.alpha.default,
		},
		ratingContainer: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			paddingTop: Spacing.Triple,
			paddingBottom: Spacing.separator40,
		},
		userRatingChip: {
			backgroundColor: Colors.alpha.default,
		},
		userRatingChipText: {
			fontSize: Spacing.Double,
			color: Colors.white.default,
			fontFamily: Fonts.interBold,
			textTransform: "uppercase",
		},
		locationInfo: {
			fontSize: Spacing.Double,
			fontFamily: Fonts.interMedium,
			paddingVertical: Spacing.Double,
		},
		locationCity: {
			fontSize: Spacing.Double,
			fontFamily: Fonts.interMedium,
			color: Colors.black.hover,
			marginBottom: Spacing.Fourfold,
		},
		priceChipText: {
			color: Colors.black.default,
		},
		dateContainer: {
			rowGap: Spacing.Triple,
			marginBottom: Spacing.Fourfold,
		},
		contactText: {
			color: Colors.black.hover,
			fontSize: Spacing.Double,
		},
		contactContainer: {
			rowGap: Spacing.Single,
			paddingTop: Spacing.Double,
			marginBottom: Spacing.Fourfold,
		},
		gallery: {
			paddingTop: Spacing.Triple,
		},
		footer: {
			position: "absolute",
			bottom: 0,
			left: 0,
			right: 0,
			paddingHorizontal: Spacing.Fourfold,
			paddingTop: Spacing.Triple,
			paddingBottom: bottom + Spacing.Triple,
			borderTopWidth: 1,
			borderTopColor: Colors.black.disabled,
			backgroundColor: Colors.white.default,
		},
		main: {
			flex: 1,
			paddingBottom: Spacing.separator80 + Spacing.Fourfold,
		},
	});
