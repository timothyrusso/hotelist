import { Colors } from "@/src/ui/constants/style/Colors";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import Fontisto from "@expo/vector-icons/Fontisto";
import type Ionicons from "@expo/vector-icons/Ionicons";
import type { FC } from "react";
import { type StyleProp, Text, type TextStyle, View } from "react-native";
import { styles } from "./FilterTitle.style";

export type FontistoName = keyof typeof Fontisto.glyphMap;
export type IoniconsName = keyof typeof Ionicons.glyphMap;

type FilterTitleProps = {
	icon: FontistoName;
	title: string;
	iconSize?: number;
	iconColor?: string;
	textStyle?: StyleProp<TextStyle>;
	detectorType?: "phoneNumber" | "link" | "email" | "none";
};

export const FilterTitle: FC<FilterTitleProps> = ({
	icon,
	title,
	iconSize = Spacing.Triple,
	iconColor = Colors.alpha.default,
	textStyle,
	detectorType = "none",
}) => {
	return (
		<View style={styles.container}>
			<Fontisto name={icon} size={iconSize} color={iconColor} />
			<Text style={[styles.title, textStyle]} dataDetectorType={detectorType}>{title}</Text>
		</View>
	);
};
