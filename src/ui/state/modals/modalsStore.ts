import { create } from "../shared/createStore";
import type { ModalsActions, ModalsState } from "./types";

export const initialState: ModalsState = {
	imageModal: {
		visible: false,
		image: "",
		images: [],
		currentIndex: 0,
	},
};

export const useModalsStore = create<ModalsState & ModalsActions>((set, get) => ({
	...initialState,
	actions: {
		hideImageModal: () => {
			set({ imageModal: { visible: false, image: "", images: [], currentIndex: 0 } });
		},
		showImageModal: (image, images, currentIndex) => {
			set({ imageModal: { visible: true, image, images, currentIndex } });
		},
		nextImage: () => {
			const { imageModal } = get();
			// Circular array pattern
			// If the current index is the last index, the next index should be the first index
			// How it works:
			// 1. currentIndex + 1 = 1
			// 2. 1 % 3 = 1
			// 3. nextIndex = 1
			// 4. imageModal.images[1] = imageModal.images[1]
			const nextIndex = (imageModal.currentIndex + 1) % imageModal.images.length; 
			set({
				imageModal: {
					...imageModal,
					image: imageModal.images[nextIndex],
					currentIndex: nextIndex,
				},
			});
		},
		previousImage: () => {
			const { imageModal } = get();
			const previousIndex = (imageModal.currentIndex - 1 + imageModal.images.length) % imageModal.images.length;
			set({
				imageModal: {
					...imageModal,
					image: imageModal.images[previousIndex],
					currentIndex: previousIndex,
				},
			});
		},
	},
}));
