import { createSelectors } from "../shared/createSelectors";
import { useHotelsStore } from "./hotelsStore";

export const useHotelsState = () => {
	const hotelsStore = createSelectors(useHotelsStore);

	const { actions, ...hotelsSelectors } = hotelsStore.use;

	return {
		hotelsActions: actions(),
		hotelsSelectors: { ...hotelsSelectors },
	};
};
