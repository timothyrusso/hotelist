import type { OrderByKeysType } from "../../hooks/useFilterLogic";
import { create } from "../shared/createStore";
import type { FiltersActions, FiltersState } from "./types";

export const initialState: FiltersState = {
	stars: [],
	selectedOrderBy: "",
	searchedText: "",
	isFilterApplied: false,
};

export const useFiltersStore = create<FiltersState & FiltersActions>((set) => ({
	...initialState,
	actions: {
		setStars: (stars) => {
			set({ stars });
		},
		setSelectedOrderBy: (selectedOrderBy: OrderByKeysType) => {
			set({ selectedOrderBy });
		},
		setSearchedText: (searchedText) => {
			set({ searchedText });
		},
		setIsFilterApplied: (isFilterApplied) => {
			set({ isFilterApplied });
		},
		resetFilters: () => {
			set(initialState);
		},
	},
}));
