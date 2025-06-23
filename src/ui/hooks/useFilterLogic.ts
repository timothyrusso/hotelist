import type { HotelCardItem } from "@/src/modules/hotels/domain/entities/HotelCardItem";
import { router } from "expo-router";
import { useGetHotelsQuery } from "../query/hotels/queries/useGetHotelsQuery";
import { useFiltersState } from "../state/filters";
import { OrderByKeys, type OrderByKeysType } from "../state/filters/types";
import { useHotelsState } from "../state/hotels";

export const useFilterLogic = () => {
	const { filtersSelectors, filtersActions } = useFiltersState();
	const { hotelsSelectors, hotelsActions } = useHotelsState();
	const { hotelsData, refetch } = useGetHotelsQuery();
	const orderByValue = filtersSelectors.selectedOrderBy();
	const hotelsList = hotelsSelectors.hotelsList();

	const searchedText = filtersSelectors.searchedText();

	const initialHotelsData = hotelsData?.cardList ?? [];

	const orderHotelsByKey = (
		hotelsList: HotelCardItem[],
		key: OrderByKeysType,
	) => {
		return [...hotelsList].sort((a, b) => {
			if (key === OrderByKeys.PriceAsc) return a.price - b.price;
			if (key === OrderByKeys.PriceDesc) return b.price - a.price;
			if (key === OrderByKeys.PlaceNameAsc) return a.name.localeCompare(b.name);
			if (key === OrderByKeys.PlaceNameDesc)
				return b.name.localeCompare(a.name);
			if (key === OrderByKeys.HotelRatingAsc) return b.stars - a.stars;
			if (key === OrderByKeys.HotelRatingDesc) return a.stars - b.stars;
			return 0;
		});
	};

	const filteredStars = filtersSelectors.stars();

	const selectedOrderBy = filtersSelectors.selectedOrderBy();

	const handleStarsPress = (value: string | number) => {
		let updatedFilteredStars: (string | number)[];
		if (filteredStars.includes(Number(value))) {
			updatedFilteredStars = filteredStars.filter((star) => star !== value);
			filtersActions.setStars(updatedFilteredStars as number[]);
		} else {
			updatedFilteredStars = [...filteredStars, value];
			filtersActions.setStars(updatedFilteredStars as number[]);
		}
	};

	const handleOrderByPress = (value: OrderByKeysType) => {
		if (selectedOrderBy === value) {
			filtersActions.setSelectedOrderBy("");
		} else {
			filtersActions.setSelectedOrderBy(value);
		}
	};

	const filterListByText = (list: HotelCardItem[]) => {
		return list?.filter((hotel) =>
			hotel.name.toLowerCase().includes(searchedText.toLowerCase()),
		);
	};

	const applyFilters = () => {
		let filteredListByText = hotelsList;

		if (searchedText !== "") {
			filteredListByText = filterListByText(filteredListByText);
		}

		let filteredHotels = filteredListByText;

		if (filteredStars.length > 0 && orderByValue !== "") {
			filteredHotels = orderHotelsByKey(
				filterListByText(initialHotelsData),
				orderByValue,
			)?.filter((hotel) => filteredStars.includes(hotel.stars));
		} else if (orderByValue === "" && filteredStars.length === 0) {
			filteredHotels = filterListByText(initialHotelsData);
		} else if (orderByValue !== "" && filteredStars.length === 0) {
			filteredHotels = orderHotelsByKey(
				filterListByText(initialHotelsData),
				orderByValue,
			);
		} else if (orderByValue === "" && filteredStars.length > 0) {
			filteredHotels = filteredHotels?.filter((hotel) =>
				filteredStars.includes(hotel.stars),
			);
		}

		hotelsActions.setHotelsList(filteredHotels ?? []);

		router.back();
	};

	const resetFilters = () => {
		filtersActions.resetFilters();
		refetch(); // Restore the original list order
	};

	return {
		applyFilters,
		resetFilters,
		handleStarsPress,
		handleOrderByPress,
	};
};
