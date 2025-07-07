import { useGetHotelsQuery } from "@/src/ui/query/hotels/queries/useGetHotelsQuery";
import { useFiltersState } from "@/src/ui/state/filters";
import { useHotelsState } from "@/src/ui/state/hotels";
import { useState } from "react";

const MIN_SEARCH_LENGTH = 1;

export const useSearchBarLogic = () => {
	const [searchText, setSearchText] = useState<string>("");
	const { filtersActions, filtersSelectors } = useFiltersState();

	const { isLoading } = useGetHotelsQuery();

	const { hotelsActions, hotelsSelectors } = useHotelsState();

	const isFilterApplied = filtersSelectors.isFilterApplied();

	const filteredByFiltersOnly = hotelsSelectors.filteredByFiltersOnly();

	const hotelsListWithFavorites = hotelsSelectors.hotelsListWithFavorites();

	const hotelList = hotelsSelectors.hotelsList();

	const showAutocomplete = filtersSelectors.showAutocomplete() && hotelList.length > 0;


	const handleChangeText = (text: string) => {
		setSearchText(text);

		const trimmedText = text.trim();

		filtersActions.setSearchedText(trimmedText);

		if (trimmedText.length > MIN_SEARCH_LENGTH) {
			filtersActions.setShowAutocomplete(true);
		} else {
			filtersActions.setShowAutocomplete(false);
		}

		// If search is cleared (text too short) → restore previous filtered state
		if (trimmedText.length <= MIN_SEARCH_LENGTH && !isFilterApplied) {
			hotelsActions.setHotelsList(hotelsListWithFavorites);
			return;
		} else if (trimmedText.length <= MIN_SEARCH_LENGTH && isFilterApplied) {
			// Use the list that's filtered only by filters (not by search text)
			hotelsActions.setHotelsList(filteredByFiltersOnly);
			return;
		}

		// Filter from the list that's filtered only by filters (not by previous search text)
		const baseList = isFilterApplied
			? filteredByFiltersOnly
			: (hotelsListWithFavorites ?? []);

		const filteredHotels = [...baseList]?.filter((hotel) =>
			hotel.name.toLowerCase().includes(trimmedText.toLowerCase()),
		);

		hotelsActions.setHotelsList(filteredHotels);
	};

	const autocompleteData = hotelList.map((hotel) => hotel.name).filter((name) => name.toLowerCase().includes(searchText.toLowerCase()));

	const handleAutocompleteItemClick = (item: string) => {
		handleChangeText(item);
		filtersActions.setShowAutocomplete(false);
	};

	return {
		searchText,
		handleChangeText,
		isLoading,
		autocompleteData,
		handleAutocompleteItemClick,
		showAutocomplete
	};
};
