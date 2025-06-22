import { create } from "../shared/createStore";
import type { FiltersActions, FiltersState, OrderByKeysType } from "./types";

export const initialState: FiltersState = {
	stars: [],
	selectedOrderBy: "",
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
		resetFilters: () => {
			set(initialState);
		},
	},
}));
