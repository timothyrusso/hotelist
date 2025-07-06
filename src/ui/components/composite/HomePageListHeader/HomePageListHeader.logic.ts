import { useFiltersState } from "@/src/ui/state/filters";

export const useHomePageListHeaderLogic = () => {
	const { filtersSelectors } = useFiltersState();

	// Call all selectors once and store the values
	const selectedStars = filtersSelectors.stars();
	const selectedOrderBy = filtersSelectors.selectedOrderBy();
	const minPrice = filtersSelectors.minPrice();
	const maxPrice = filtersSelectors.maxPrice();
	const isFilterApplied = filtersSelectors.isFilterApplied();

	// Calculate derived values
	const selectedPrice = minPrice + " - " + maxPrice;
	const showStarsChip = isFilterApplied && selectedStars.length > 0;
	const showOrderByChip = isFilterApplied && selectedOrderBy !== "";
	const showPriceChip = isFilterApplied && (minPrice !== "" && maxPrice !== "");
	const showChips = showStarsChip || showOrderByChip || showPriceChip;

	return {
		showStarsChip,
		showOrderByChip,
		selectedStars,
		selectedOrderBy,
		showChips,
		showPriceChip,
		selectedPrice,
	};
};
