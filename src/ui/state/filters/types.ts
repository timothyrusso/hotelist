import type { OrderByKeysType } from "../../hooks/useFilterLogic";

export type FiltersState = {
	stars: number[];
	selectedOrderBy: OrderByKeysType;
	searchedText: string;
	isFilterApplied: boolean;
};

export type FiltersActions = {
	actions: {
		setStars: (stars: number[]) => void;
		setSelectedOrderBy: (selectedOrderBy: OrderByKeysType) => void;
		setSearchedText: (searchedText: string) => void;
		setIsFilterApplied: (isFilterApplied: boolean) => void;
		resetFilters: () => void;
	};
};
