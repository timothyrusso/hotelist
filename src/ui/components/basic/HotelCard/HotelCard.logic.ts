import { useState } from "react";

export const useHotelCardLogic = () => {
	const [imageError, setImageError] = useState(false);

	const handleImageError = () => {
		setImageError(true);
	};

	return {
		imageError,
		handleImageError,
	};
};
