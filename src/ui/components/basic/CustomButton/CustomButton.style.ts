import { Colors } from "@/src/ui/constants/style/Colors";
import { Fonts } from "@/src/ui/constants/style/Font";
import { Opacity } from "@/src/ui/constants/style/Opacity";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import { StyleSheet } from "react-native";
import { CustomButtonType } from "./CustomButton.types";

export const styles = (type: CustomButtonType) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor:
				type === CustomButtonType.Primary
					? Colors.alpha.default
					: Colors.white.default,
			borderRadius: Spacing.Fourfold,
			padding: Spacing.Single,
			alignItems: "center",
			justifyContent: "center",
			borderWidth: type === CustomButtonType.Primary ? 0 : 2,
			borderColor: Colors.black.default,
			height: Spacing.Sextuple,
		},
		pressed: {
			opacity: Opacity.default,
		},
		title: {
			textTransform: "uppercase",
			fontSize: Spacing.Triple,
			fontFamily: Fonts.interMedium,
			color:
				type === CustomButtonType.Primary
					? Colors.white.default
					: Colors.black.default,
		},
		disabled: {
			opacity: Opacity.disabled,
		},
	});
