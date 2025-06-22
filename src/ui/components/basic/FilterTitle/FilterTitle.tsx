import { Colors } from "@/src/ui/constants/style/Colors";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import Fontisto from "@expo/vector-icons/Fontisto";
import type { FC } from "react";
import { type StyleProp, Text, type TextStyle, View } from "react-native";
import { styles } from "./FilterTitle.style";

export type FontistoName = keyof typeof Fontisto.glyphMap;

type FilterTitleProps = {
	icon: FontistoName;
	title: string;
	iconSize?: number;
	iconColor?: string;
	textStyle?: StyleProp<TextStyle>;
};

export const FilterTitle: FC<FilterTitleProps> = ({
	icon,
	title,
	iconSize = Spacing.Triple,
	iconColor = Colors.alpha.default,
	textStyle,
}) => {
	return (
		<View style={styles.container}>
			<Fontisto name={icon} size={iconSize} color={iconColor} />
			<Text style={[styles.title, textStyle]}>{title}</Text>
		</View>
	);
};
