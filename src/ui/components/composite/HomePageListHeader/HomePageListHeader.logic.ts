import { useFiltersState } from "@/src/ui/state/filters";

export const useHomePageListHeaderLogic = () => {
	const { filtersSelectors } = useFiltersState();
	const selectedStars = filtersSelectors.stars();
	const selectedOrderBy = filtersSelectors.selectedOrderBy();

	const isFilterApplied = filtersSelectors.isFilterApplied();
	const showStarsChip = isFilterApplied && selectedStars.length > 0;
	const showOrderByChip = isFilterApplied && selectedOrderBy !== "";

	const showChips = showStarsChip || showOrderByChip;

	return {
		showStarsChip,
		showOrderByChip,
		selectedStars,
		selectedOrderBy,
		showChips,
	};
};
