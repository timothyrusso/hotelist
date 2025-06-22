import { create } from "../shared/createStore";
import type { FiltersActions, FiltersState } from "./types";

export const initialState: FiltersState = {
	stars: [],
};

export const useFiltersStore = create<FiltersState & FiltersActions>((set) => ({
	...initialState,
	actions: {
		setStars: (stars) => {
			set({ stars });
		},
		resetFilters: () => {
			set(initialState);
		},
	},
}));
