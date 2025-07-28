import { useModalsState } from "@/src/ui/state/modals";

export const useGalleryLogic = (images: string[]) => {
	const { modalsActions } = useModalsState();

	const openImageModal = (image: string) => {
		const currentIndex = images.indexOf(image);
		modalsActions.showImageModal(image, images, currentIndex);
	};

	return {
		openImageModal,
	};
};
