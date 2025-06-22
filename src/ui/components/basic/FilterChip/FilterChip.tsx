import type { OrderByKeysType } from "@/src/ui/state/filters/types";
import type { FC } from "react";
import { Pressable, Text } from "react-native";
import type { FontistoName } from "../FilterTitle/FilterTitle";
import { StarsList } from "../StarsList/StarsList";
import { useFilterChipLogic } from "./FilterChip.logic";

type FilterChipProps = {
	value: string | number;
	icon?: FontistoName;
	onPress: (value: string | number | OrderByKeysType) => void;
	selectedData: string[] | number[] | OrderByKeysType;
};

export const FilterChip: FC<FilterChipProps> = ({
	value,
	icon,
	onPress,
	selectedData,
}) => {
	const { onChipPress, styles, selected } = useFilterChipLogic(
		onPress,
		selectedData,
		value,
	);

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
