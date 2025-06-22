import { createSelectors } from "../shared/createSelectors";
import { useFiltersStore } from "./filtersStore";

export const useFiltersState = () => {
	const filtersStore = createSelectors(useFiltersStore);

	const { actions, ...filtersSelectors } = filtersStore.use;

	return {
		filtersActions: actions(),
		filtersSelectors: { ...filtersSelectors },
	};
};
