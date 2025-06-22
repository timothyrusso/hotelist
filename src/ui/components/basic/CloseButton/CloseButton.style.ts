import { Opacity } from "@/src/ui/constants/style/Opacity";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
	},
	pressed: {
		opacity: Opacity.default,
	},
});
