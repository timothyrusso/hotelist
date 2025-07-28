import { useUniqueItems } from "@/src/ui/hooks/useUniqueItems";
import { useGetHotelsQuery } from "@/src/ui/query/hotels/queries/useGetHotelsQuery";
import { useFiltersState } from "@/src/ui/state/filters";
import { useHotelsState } from "@/src/ui/state/hotels";
import { useEffect } from "react";

export const useHomePageLogic = () => {
	const { hotelsSelectors, hotelsActions } = useHotelsState();
	const { filtersSelectors } = useFiltersState();
	const { isLoading, hotelsData } = useGetHotelsQuery();
	const { getUniqueItems } = useUniqueItems();

	const skeletonCardList = getUniqueItems(6);

	const hotelsList = hotelsSelectors.hotelsList();

	const initialHotelsList = hotelsData?.cardList ?? [];

	const hotelsListWithFavorites = hotelsSelectors.hotelsListWithFavorites();

	const showEmptyList = !isLoading && hotelsList.length === 0;

	useEffect(() => {
		if (initialHotelsList.length > 0) {
			hotelsActions.setHotelsListWithFavorites(initialHotelsList);
		}
	}, [initialHotelsList]);

	useEffect(() => {
		if (hotelsListWithFavorites.length > 0) {
			hotelsActions.setHotelsList(hotelsListWithFavorites);
		}
	}, [hotelsListWithFavorites]);

	return {
		hotelsList,
		showEmptyList,
		isLoading,
		skeletonCardList,
	};
};