import { createSelectors } from "../shared/createSelectors";
import { useModalsStore } from "./modalsStore";

export const useModalsState = () => {
	const modalsStore = createSelectors(useModalsStore);

	const { actions, ...modalsSelectors } = modalsStore.use;

	return {
		modalsActions: actions(),
		modalsSelectors: { ...modalsSelectors },
	};
};
