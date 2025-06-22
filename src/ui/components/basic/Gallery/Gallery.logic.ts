import { useModalsState } from "@/src/ui/state/modals";

export const useGalleryLogic = () => {
	const { modalsActions } = useModalsState();

	const openImageModal = (image: string) => {
		modalsActions.showImageModal(image);
	};

	return {
		openImageModal,
	};
};
