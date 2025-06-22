import { create } from "../shared/createStore";
import type { ModalsActions, ModalsState } from "./types";

export const initialState: ModalsState = {
	imageModal: {
		visible: false,
		image: "",
	},
};

export const useModalsStore = create<ModalsState & ModalsActions>((set) => ({
	...initialState,
	actions: {
		hideImageModal: () => {
			set({ imageModal: { visible: false, image: "" } });
		},
		showImageModal: (image) => {
			set({ imageModal: { visible: true, image } });
		},
	},
}));
