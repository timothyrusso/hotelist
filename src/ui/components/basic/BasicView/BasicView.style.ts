import { Colors } from "@/src/ui/constants/style/Colors";
import { StyleSheet } from "react-native";

export const styles = (paddingTop: number) =>
	StyleSheet.create({
		containerViewStyle: {
			width: "100%",
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: Colors.white.default,
			paddingTop,
		},
	});
