import type { OrderByKeysType } from "@/src/ui/hooks/useFilterLogic";
import { styles as defaultStyles } from "./FilterChip.style";

export const useFilterChipLogic = (
	onPress: (value: string | number | OrderByKeysType) => void,
	selectedData: string[] | number[] | OrderByKeysType,
	value: string | number,
) => {
	const onChipPress = (value: string | number | OrderByKeysType) => {
		onPress(value);
	};

	const isSelected = (value: string | number) => {
		return (selectedData as (string | number)[]).includes(value);
	};

	const styles = defaultStyles(isSelected(value));

	const selected = isSelected(value);

	return {
		onChipPress,
		styles,
		selected,
	};
};
