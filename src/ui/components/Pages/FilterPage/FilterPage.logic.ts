import { useGetHotelsQuery } from "@/src/ui/query/hotels/queries/useGetHotelsQuery";
import { useFiltersState } from "@/src/ui/state/filters";
import { useHotelsState } from "@/src/ui/state/hotels";
import { router } from "expo-router";

export const useFilterPageLogic = () => {
	const { hotelsData } = useGetHotelsQuery();
	const { filtersActions, filtersSelectors } = useFiltersState();
	const { hotelsActions } = useHotelsState();

	const availableStars = hotelsData?.availableStars || [];
	const filteredStars = filtersSelectors.stars();

	const handleStarsPress = (value: string | number) => {
		if (filteredStars.includes(Number(value))) {
			const updatedFilteredStars = filteredStars.filter(
				(star) => star !== value,
			);
			filtersActions.setStars(updatedFilteredStars as number[]);
		} else {
			const updatedFilteredStars = [...filteredStars, value];
			filtersActions.setStars(updatedFilteredStars as number[]);
		}
	};

	const closeFilter = () => {
		router.back();
	};

	const resetFilters = () => {
		filtersActions.resetFilters();
		hotelsActions.setHotelsList(hotelsData?.cardList ?? []);
	};

	const applyFilters = () => {
		let filteredHotels = hotelsData?.cardList;

		if (filteredStars.length > 0) {
			filteredHotels = filteredHotels?.filter((hotel) =>
				filteredStars.includes(hotel.stars),
			);
		} else {
			filteredHotels = hotelsData?.cardList;
		}

		hotelsActions.setHotelsList(filteredHotels ?? []);

		router.back();
	};

	return {
		availableStars,
		handleStarsPress,
		closeFilter,
		stars: filteredStars,
		resetFilters,
		applyFilters,
	};
};
