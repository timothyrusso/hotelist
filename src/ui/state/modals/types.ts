export type ModalsState = {
	imageModal: {
		visible: boolean;
		image: string;
	};
};

export type ModalsActions = {
	actions: {
		showImageModal: (image: string) => void;
		hideImageModal: () => void;
	};
};
