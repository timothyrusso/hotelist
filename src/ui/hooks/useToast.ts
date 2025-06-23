import Toast from "react-native-toast-message";

export enum ToastType {
	ERROR = "error",
	SUCCESS = "success",
	INFO = "info",
}

export const useToast = () => {
	const showToast = (
		text: string,
		type: ToastType = ToastType.ERROR,
		description?: string,
	) => {
		Toast.show({
			type: type,
			text1: text,
			...(description && { text2: description }),
		});
	};

	return {
		showToast,
	};
};
