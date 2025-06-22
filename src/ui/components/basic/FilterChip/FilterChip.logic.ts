export const useFilterChipLogic = (
	onPress: (value: string | number) => void,
	selectedData: string[] | number[],
) => {
	const onChipPress = (value: string | number) => {
		onPress(value);
	};

	const isSelected = (value: string | number) => {
		return (selectedData as (string | number)[]).includes(value);
	};

	return {
		onChipPress,
		isSelected,
	};
};
