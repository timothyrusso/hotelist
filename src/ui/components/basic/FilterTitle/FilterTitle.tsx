import { Colors } from "@/src/ui/constants/style/Colors";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import Fontisto from "@expo/vector-icons/Fontisto";
import type { FC } from "react";
import { Text, View } from "react-native";
import { styles } from "./FilterTitle.style";

export type FontistoName = keyof typeof Fontisto.glyphMap;

type FilterTitleProps = {
	icon: FontistoName;
	title: string;
	iconSize?: number;
};

export const FilterTitle: FC<FilterTitleProps> = ({
	icon,
	title,
	iconSize = Spacing.Triple,
}) => {
	return (
		<View style={styles.container}>
			<Fontisto name={icon} size={iconSize} color={Colors.alpha.default} />
			<Text style={styles.title}>{title}</Text>
		</View>
	);
};
