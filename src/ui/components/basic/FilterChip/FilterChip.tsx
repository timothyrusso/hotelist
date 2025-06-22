import type { FC } from "react";
import { Pressable, Text } from "react-native";
import type { FontistoName } from "../FilterTitle/FilterTitle";
import { StarsList } from "../StarsList/StarsList";
import { useFilterChipLogic } from "./FilterChip.logic";
import { styles } from "./FilterChip.style";

type FilterChipProps = {
	value: string | number;
	icon?: FontistoName;
	onPress: (value: string | number) => void;
	selectedData: string[] | number[];
};

export const FilterChip: FC<FilterChipProps> = ({
	value,
	icon,
	onPress,
	selectedData,
}) => {
	const { onChipPress, isSelected } = useFilterChipLogic(onPress, selectedData);
	const selected = isSelected(value);

	return (
		<Pressable
			style={({ pressed }) => [
				styles.container,
				pressed && styles.pressed,
				selected && styles.selected,
			]}
			onPress={() => onChipPress(value)}
		>
			{icon ? (
				<StarsList stars={Number(value)} />
			) : (
				<Text style={styles.text}>{value}</Text>
			)}
		</Pressable>
	);
};
