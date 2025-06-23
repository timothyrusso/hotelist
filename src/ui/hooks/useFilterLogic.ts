import type { HotelCardItem } from "@/src/modules/hotels/domain/entities/HotelCardItem";
import { en } from "@/src/modules/localization/locales/en";
import { router } from "expo-router";
import { useGetHotelsQuery } from "../query/hotels/queries/useGetHotelsQuery";
import { useFiltersState } from "../state/filters";
import { useHotelsState } from "../state/hotels";

export const OrderByKeys = {
	PriceAsc: en.filter_page.price_low_to_high,
	PriceDesc: en.filter_page.price_high_to_low,
	PlaceNameDesc: en.filter_page.place_name_z_to_a,
	PlaceNameAsc: en.filter_page.place_name_a_to_z,
	HotelRatingDesc: en.filter_page.hotel_rating_low_to_high,
	HotelRatingAsc: en.filter_page.hotel_rating_high_to_low,
} as const;

export type OrderByKeysType = (typeof OrderByKeys)[keyof typeof OrderByKeys];

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
			filtersActions.setIsFilterApplied(true);
		} else if (orderByValue === "" && filteredStars.length === 0) {
			filteredHotels = filterListByText(initialHotelsData);
			filtersActions.setIsFilterApplied(false);
		} else if (orderByValue !== "" && filteredStars.length === 0) {
			filteredHotels = orderHotelsByKey(
				filterListByText(initialHotelsData),
				orderByValue,
			);
			filtersActions.setIsFilterApplied(true);
		} else if (orderByValue === "" && filteredStars.length > 0) {
			filteredHotels = filteredHotels?.filter((hotel) =>
				filteredStars.includes(hotel.stars),
			);
			filtersActions.setIsFilterApplied(true);
		}

		hotelsActions.setHotelsList(filteredHotels ?? []);
		// Save the filtered list (without search text) to restore it when search is cleared
		hotelsActions.setFilteredByFiltersOnly(filteredHotels ?? []);

		router.back();
	};

	const resetFilters = () => {
		filtersActions.resetFilters();

		if (searchedText === "") {
			hotelsActions.setHotelsList(initialHotelsData);
		} else {
			hotelsActions.setHotelsList(filterListByText(initialHotelsData));
		}

		refetch(); // Restore the original list order

		router.back();
	};

	const isFilterApplied = filtersSelectors.isFilterApplied();

	const disableResetButton = !isFilterApplied;
	const disableApplyButton =
		filteredStars.length === 0 && orderByValue === "" && !isFilterApplied;

	return {
		applyFilters,
		resetFilters,
		handleStarsPress,
		handleOrderByPress,
		isFilterApplied,
		disableResetButton,
		disableApplyButton,
	};
};
