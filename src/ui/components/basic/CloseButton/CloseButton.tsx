import { Icons } from "@/src/ui/constants/style/Icons";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import Fontisto from "@expo/vector-icons/Fontisto";
import type { FC } from "react";
import { Pressable } from "react-native";
import { styles } from "./CloseButton.style";

type CloseButtonProps = {
	onPress: () => void;
};

export const CloseButton: FC<CloseButtonProps> = ({ onPress }) => {
	return (
		<Pressable
			style={({ pressed }) => [styles.container, pressed && styles.pressed]}
			onPress={onPress}
			hitSlop={Spacing.MinimalDouble}
		>
			<Fontisto name={Icons.close} size={Spacing.Double} />
		</Pressable>
	);
};
