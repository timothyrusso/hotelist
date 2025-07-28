import { useModalsState } from "@/src/ui/state/modals";

export const useImageModal = () => {
	const { modalsActions, modalsSelectors } = useModalsState();

	const closeImageModal = () => {
		modalsActions.hideImageModal();
	};

	const handleNextImage = () => {
		modalsActions.nextImage();
	};

	const handlePreviousImage = () => {
		modalsActions.previousImage();
	};

	return {
		closeImageModal,
		isModalVisible: modalsSelectors.imageModal().visible,
		selectedImage: modalsSelectors.imageModal().image,
		handleNextImage,
		handlePreviousImage,
	};
};
