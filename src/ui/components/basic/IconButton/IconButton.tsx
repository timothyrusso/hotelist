import { Colors } from "@/src/ui/constants/style/Colors";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FC } from "react";
import { Pressable, type StyleProp, type ViewStyle } from "react-native";
import type { FontistoName, IoniconsName } from "../FilterTitle/FilterTitle";
import { styles } from "./IconButton.style";

type IconButtonProps = {
	icon: FontistoName | IoniconsName;
	onPress: () => void;
	iconSize?: number;
	iconColor?: string;
	backgroundColor?: string;
	style?: StyleProp<ViewStyle>;
	iconType?: "fontisto" | "ionicons";
};

export const IconButton: FC<IconButtonProps> = ({
	icon,
	onPress,
	iconSize = Spacing.Double,
	iconColor = Colors.black.default,
	backgroundColor = Colors.black.disabled,
	style,
	iconType = "fontisto",
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
			{iconType === "fontisto" ? (
				<Fontisto
					name={icon as FontistoName}
					size={iconSize}
					color={iconColor}
					style={styles.icon}
				/>
			) : (
				<Ionicons
					name={icon as IoniconsName}
					size={iconSize}
					color={iconColor}
					style={styles.icon}
				/>
			)}
		</Pressable>
	);
};
