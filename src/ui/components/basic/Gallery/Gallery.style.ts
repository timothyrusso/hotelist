import { Components } from "@/src/ui/constants/style/Components";
import { Opacity } from "@/src/ui/constants/style/Opacity";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		height: "100%",
	},
	image: {
		width: Components.hotelDetailsPage.gallery.image.width,
		height: Components.hotelDetailsPage.gallery.image.width,
		borderRadius: Spacing.Fourfold,
	},
	separator: {
		width: Spacing.Double,
	},
	imagePressed: {
		opacity: Opacity.default,
	},
});
