import type { FC } from "react";
import { Pressable, type StyleProp, Text, type ViewStyle } from "react-native";
import { styles as buttonStyles } from "./CustomButton.style";

export enum CustomButtonType {
	Primary = "primary",
	Secondary = "secondary",
}

type CustomButtonProps = {
	title: string;
	onPress: () => void;
	type?: CustomButtonType;
	style?: StyleProp<ViewStyle>;
	disabled?: boolean;
};

export const CustomButton: FC<CustomButtonProps> = ({
	title,
	onPress,
	type = CustomButtonType.Primary,
	style,
	disabled,
}) => {
	const styles = buttonStyles(type);

	return (
		<Pressable
			disabled={disabled}
			style={({ pressed }) => [
				styles.container,
				pressed && styles.pressed,
				style,
				disabled && styles.disabled,
			]}
			onPress={onPress}
		>
			<Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
				{title}
			</Text>
		</Pressable>
	);
};
