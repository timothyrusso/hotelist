import { Platforms } from "@/src/ui/constants/platform/Platforms";
import { Colors } from "@/src/ui/constants/style/Colors";
import { Fonts } from "@/src/ui/constants/style/Fonts";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import { StyleSheet } from "react-native";

export const styles = (bottom: number) =>
	StyleSheet.create({
		container: {
			flex: 1,
			width: "100%",
		},
		header: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			paddingHorizontal: Spacing.Fourfold,
			paddingVertical: Spacing.Triple,
			width: "100%",
			borderBottomWidth: 1,
			borderBottomColor: Colors.black.disabled,
		},
		filterContainer: {
			flexDirection: "row",
			alignItems: "center",
			gap: Spacing.Double,
		},
		closeButton: {
			flex: 0,
			width: "auto",
		},
		title: {
			fontSize: Spacing.Fourfold,
			fontFamily: Fonts.interMedium,
		},
		footer: {
			position: "absolute",
			bottom: 0,
			left: 0,
			right: 0,
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			paddingHorizontal: Spacing.Fourfold,
			paddingTop: Spacing.Triple,
			paddingBottom: Platforms.Android
				? bottom + Spacing.Triple
				: Spacing.Triple,
			backgroundColor: Colors.white.default,
			borderTopWidth: 1,
			borderTopColor: Colors.black.disabled,
			columnGap: Spacing.Triple,
		},
		content: {
			flex: 1,
			width: "100%",
			paddingBottom: Spacing.separator80,
		},
	});
