import { Screens } from "@/src/ui/constants/navigation/Routes";
import { useGetHotelsQuery } from "@/src/ui/query/hotels/queries/useGetHotelsQuery";
import { useRouter } from "expo-router";

export const useFilterButtonLogic = () => {
	const { isLoading } = useGetHotelsQuery();
	const router = useRouter();

	const handlePress = () => {
		router.push(`/${Screens.Filter}`);
	};

	return {
		handlePress,
		isLoading,
	};
};
