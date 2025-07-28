import type { OrderByKeysType } from "../../hooks/useFilterLogic";

export type FiltersState = {
	stars: number[];
	selectedOrderBy: OrderByKeysType;
	searchedText: string;
	isFilterApplied: boolean;
	minPrice: string;
	maxPrice: string;
	isPriceFilterError: boolean;
	showAutocomplete: boolean;
};

export type FiltersActions = {
	actions: {
		setStars: (stars: number[]) => void;
		setSelectedOrderBy: (selectedOrderBy: OrderByKeysType) => void;
		setSearchedText: (searchedText: string) => void;
		setIsFilterApplied: (isFilterApplied: boolean) => void;
		setMinPrice: (minPrice: string) => void;
		setMaxPrice: (maxPrice: string) => void;
		setIsPriceFilterError: (isPriceFilterError: boolean) => void;
		setShowAutocomplete: (showAutocomplete: boolean) => void;
		resetFilters: () => void;
	};
};
