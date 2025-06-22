import type { OrderByKeysType } from "@/src/ui/state/filters/types";
import { styles as defaultStyles } from "./FilterChip.style";

export const useFilterChipLogic = (
	onPress: (value: string | number) => void,
	selectedData: string[] | number[] | OrderByKeysType,
	value: string | number,
) => {
	const onChipPress = (value: string | number) => {
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
