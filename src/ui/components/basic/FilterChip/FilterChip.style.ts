import { Colors } from "@/src/ui/constants/style/Colors";
import { Fonts } from "@/src/ui/constants/style/Fonts";
import { Opacity } from "@/src/ui/constants/style/Opacity";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import { StyleSheet } from "react-native";

export const styles = (isSelected: boolean) =>
	StyleSheet.create({
		container: {
			alignItems: "center",
			gap: Spacing.Double,
			paddingHorizontal: Spacing.Double,
			paddingVertical: Spacing.Double,
			borderRadius: Spacing.Fourfold,
			borderWidth: 1,
			borderColor: Colors.black.disabled,
			height: Spacing.Sextuple,
			justifyContent: "center",
		},
		text: {
			fontSize: Spacing.Double,
			fontFamily: Fonts.interBold,
			color: isSelected ? Colors.white.default : Colors.black.default,
		},
		selected: {
			backgroundColor: Colors.alpha.default,
			borderColor: Colors.alpha.default,
		},
		pressed: {
			opacity: Opacity.default,
		},
	});
