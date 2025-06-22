import { Colors } from "@/src/ui/constants/style/Colors";
import { Icons } from "@/src/ui/constants/style/Icons";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import Fontisto from "@expo/vector-icons/Fontisto";
import type { FC } from "react";
import { Pressable, type StyleProp, type ViewStyle } from "react-native";
import { styles } from "./CloseButton.style";

type CloseButtonProps = {
	onPress: () => void;
	color?: string;
	style?: StyleProp<ViewStyle>;
	size?: number;
};

export const CloseButton: FC<CloseButtonProps> = ({
	onPress,
	color = Colors.black.default,
	style,
	size = Spacing.Double,
}) => {
	return (
		<Pressable
			style={({ pressed }) => [
				styles.container,
				pressed && styles.pressed,
				style,
			]}
			onPress={onPress}
			hitSlop={Spacing.MinimalDouble}
		>
			<Fontisto name={Icons.close} size={size} color={color} />
		</Pressable>
	);
};
