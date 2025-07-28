export type ModalsState = {
	imageModal: {
		visible: boolean;
		image: string;
		images: string[];
		currentIndex: number;
	};
};

export type ModalsActions = {
	actions: {
		showImageModal: (image: string, images: string[], currentIndex: number) => void;
		hideImageModal: () => void;
		nextImage: () => void;
		previousImage: () => void;
	};
};
