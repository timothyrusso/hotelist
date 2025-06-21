import { useGetHotelsQuery } from "@/src/ui/query/hotels/queries/useGetHotelsQuery";
import { useHotelsState } from "@/src/ui/state/hotels";

export const useHomePageLogic = () => {
	const { hotelsSelectors } = useHotelsState();
	const { isLoading } = useGetHotelsQuery();

	const hotelsList = hotelsSelectors.hotelsList();

	const showEmptyList = !isLoading && hotelsList.length === 0;

	return {
		hotelsList,
		showEmptyList,
	};
};
