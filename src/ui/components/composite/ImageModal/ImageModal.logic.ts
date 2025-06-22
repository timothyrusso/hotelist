import { useModalsState } from "@/src/ui/state/modals";

export const useImageModal = () => {
	const { modalsActions, modalsSelectors } = useModalsState();

	const closeImageModal = () => {
		modalsActions.hideImageModal();
	};

	return {
		closeImageModal,
		isModalVisible: modalsSelectors.imageModal().visible,
		selectedImage: modalsSelectors.imageModal().image,
	};
};
