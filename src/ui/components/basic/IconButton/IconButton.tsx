import { Colors } from "@/src/ui/constants/style/Colors";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import Fontisto from "@expo/vector-icons/Fontisto";
import { FC } from "react";
import { Pressable, type StyleProp, type ViewStyle } from "react-native";
import type { FontistoName } from "../FilterTitle/FilterTitle";
import { styles } from "./IconButton.style";

type IconButtonProps = {
	icon: FontistoName;
	onPress: () => void;
	iconSize?: number;
	iconColor?: string;
	backgroundColor?: string;
	style?: StyleProp<ViewStyle>;
};

export const IconButton: FC<IconButtonProps> = ({
	icon,
	onPress,
	iconSize = Spacing.Double,
	iconColor = Colors.black.default,
	backgroundColor = Colors.black.disabled,
	style,
}) => {
	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [
				styles.container,
				pressed && styles.pressed,
				{ backgroundColor },
				style,
			]}
		>
			<Fontisto
				name={icon}
				size={iconSize}
				color={iconColor}
				style={styles.icon}
			/>
		</Pressable>
	);
};
