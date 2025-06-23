import { Screens } from "@/src/ui/constants/navigation/Routes";
import { router } from "expo-router";

export const useSearchBarChipLogic = () => {
	const onPress = () => {
		router.push(`/${Screens.Filter}`);
	};

	return {
		onPress,
	};
};
