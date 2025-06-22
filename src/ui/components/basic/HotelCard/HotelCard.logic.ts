import { Screens } from "@/src/ui/constants/navigation/Routes";
import { router } from "expo-router";
import { useState } from "react";

export const useHotelCardLogic = (id: number) => {
	const [imageError, setImageError] = useState(false);

	const handleImageError = () => {
		setImageError(true);
	};

	const onPress = () => {
		router.push({
			pathname: `/${Screens.HotelDetails}`,
			params: { id },
		});
	};

	return {
		imageError,
		handleImageError,
		onPress,
	};
};
