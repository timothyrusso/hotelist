import type { FC } from "react";
import { Pressable, type StyleProp, Text, type ViewStyle } from "react-native";
import type { FontistoName } from "../FilterTitle/FilterTitle";
import { StarsList } from "../StarsList/StarsList";
import { useSearchBarChipLogic } from "./SearchBarChip.logic";
import { styles } from "./SearchBarChip.style";

type SearchBarChipProps = {
	value: string | number;
	icon?: FontistoName;
	style?: StyleProp<ViewStyle>;
};

export const SearchBarChip: FC<SearchBarChipProps> = ({
	value,
	icon,
	style,
}) => {
	const { onPress } = useSearchBarChipLogic();

	return (
		<Pressable
			style={({ pressed }) => [
				styles.container,
				pressed && styles.pressed,
				style,
			]}
			onPress={onPress}
		>
			{icon ? (
				<StarsList stars={Number(value)} />
			) : (
				<Text style={styles.text}>{value}</Text>
			)}
		</Pressable>
	);
};
