import { Screens } from "@/src/ui/constants/navigation/Routes";
import { useRouter } from "expo-router";

export const useFilterButtonLogic = () => {
	const router = useRouter();

	const handlePress = () => {
		router.push(`/${Screens.Filter}`);
	};

	return {
		handlePress,
	};
};
