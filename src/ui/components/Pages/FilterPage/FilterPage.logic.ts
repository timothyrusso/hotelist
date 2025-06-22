import type { HotelCardItem } from "@/src/modules/hotels/domain/entities/HotelCardItem";
import { useGetHotelsQuery } from "@/src/ui/query/hotels/queries/useGetHotelsQuery";
import { useFiltersState } from "@/src/ui/state/filters";
import type { OrderByKeysType } from "@/src/ui/state/filters/types";
import { useHotelsState } from "@/src/ui/state/hotels";
import { router } from "expo-router";

export const useFilterPageLogic = () => {
	const { hotelsData, getCardList } = useGetHotelsQuery();
	const { filtersActions, filtersSelectors } = useFiltersState();
	const { hotelsActions } = useHotelsState();

	const availableStars = hotelsData?.availableStars || [];
	const filteredStars = filtersSelectors.stars();

	const selectedOrderBy = filtersSelectors.selectedOrderBy();

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

	const handleOrderByPress = (value: OrderByKeysType) => {
		let updatedHotelList: HotelCardItem[];

		if (selectedOrderBy === value) {
			filtersActions.setSelectedOrderBy("");
			updatedHotelList = hotelsData?.cardList || [];
			hotelsActions.setHotelsList(updatedHotelList);
		} else {
			filtersActions.setSelectedOrderBy(value);
			const sortedHotels = hotelsData?.orderByKeys(value) || [];
			updatedHotelList = getCardList(sortedHotels);
			hotelsActions.setHotelsList(updatedHotelList);
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
		selectedOrderBy,
		handleOrderByPress,
	};
};
