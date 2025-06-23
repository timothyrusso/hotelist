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
	const { hotelsActions } = useHotelsState();
	const { hotelsData, refetch } = useGetHotelsQuery();
	const orderByValue = filtersSelectors.selectedOrderBy();

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
		// First, apply only stars and orderBy filters (no search text) for filteredByFiltersOnly
		let filteredByFiltersOnly = initialHotelsData;

		if (filteredStars.length > 0) {
			filteredByFiltersOnly = filteredByFiltersOnly.filter((hotel) =>
				filteredStars.includes(hotel.stars),
			);
		}

		if (orderByValue !== "") {
			filteredByFiltersOnly = orderHotelsByKey(
				filteredByFiltersOnly,
				orderByValue,
			);
		}

		// Then, apply search text on top of the filtered results for the final list
		let finalFilteredHotels = filteredByFiltersOnly;
		if (searchedText !== "") {
			finalFilteredHotels = finalFilteredHotels.filter((hotel) =>
				hotel.name.toLowerCase().includes(searchedText.toLowerCase()),
			);
		}

		// Update filter applied state
		const hasFilters = filteredStars.length > 0 || orderByValue !== "";
		filtersActions.setIsFilterApplied(hasFilters);

		// Save both states correctly
		hotelsActions.setHotelsList(finalFilteredHotels);
		hotelsActions.setFilteredByFiltersOnly(filteredByFiltersOnly); // Only stars + orderBy, no search text

		router.back();
	};

	const resetFilters = () => {
		filtersActions.resetFilters();

		// Reset to original data with or without search text
		const resetList =
			searchedText === ""
				? initialHotelsData
				: filterListByText(initialHotelsData);

		hotelsActions.setHotelsList(resetList);
		hotelsActions.setFilteredByFiltersOnly(initialHotelsData); // Reset to original data

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
