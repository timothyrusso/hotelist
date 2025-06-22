import { useGetHotelsQuery } from "@/src/ui/query/hotels/queries/useGetHotelsQuery";
import { useHotelsState } from "@/src/ui/state/hotels";
import { useEffect } from "react";

export const useHomePageLogic = () => {
	const { hotelsSelectors, hotelsActions } = useHotelsState();
	const { isLoading, hotelsData } = useGetHotelsQuery();

	const hotelsList = hotelsSelectors.hotelsList();

	const showEmptyList = !isLoading && hotelsList.length === 0;

	useEffect(() => {
		hotelsActions.setHotelsList(hotelsData?.cardList ?? []);
	}, [hotelsData?.cardList, hotelsActions]);

	return {
		hotelsList,
		showEmptyList,
	};
};
