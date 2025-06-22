import type { FC } from "react";
import {
	type StyleProp,
	Text,
	type TextStyle,
	View,
	type ViewStyle,
} from "react-native";
import { styles } from "./Chip.style";

type ChipProps = {
	label: string;
	style?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
};

export const Chip: FC<ChipProps> = ({ label, style, textStyle }) => {
	return (
		<View style={[styles.container, style]}>
			<Text style={[styles.label, textStyle]}>{label}</Text>
		</View>
	);
};
