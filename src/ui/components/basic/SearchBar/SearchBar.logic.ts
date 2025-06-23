import { useGetHotelsQuery } from "@/src/ui/query/hotels/queries/useGetHotelsQuery";
import { useFiltersState } from "@/src/ui/state/filters";
import { useHotelsState } from "@/src/ui/state/hotels";
import { useState } from "react";

const MIN_SEARCH_LENGTH = 1;

export const useSearchBarLogic = () => {
	const [searchText, setSearchText] = useState<string>("");
	const { filtersActions, filtersSelectors } = useFiltersState();

	const { isLoading, hotelsData } = useGetHotelsQuery();

	const { hotelsActions, hotelsSelectors } = useHotelsState();

	const isFilterApplied = filtersSelectors.isFilterApplied();

	const filteredByFiltersOnly = hotelsSelectors.filteredByFiltersOnly();

	const handleChangeText = (text: string) => {
		setSearchText(text);

		const trimmedText = text.trim();

		filtersActions.setSearchedText(trimmedText);

		// If search is cleared (text too short) → restore previous filtered state
		if (trimmedText.length <= MIN_SEARCH_LENGTH && !isFilterApplied) {
			hotelsActions.setHotelsList(hotelsData?.cardList ?? []);
			return;
		} else if (trimmedText.length <= MIN_SEARCH_LENGTH && isFilterApplied) {
			// Use the list that's filtered only by filters (not by search text)
			hotelsActions.setHotelsList(filteredByFiltersOnly);
			return;
		}

		// Filter from the list that's filtered only by filters (not by previous search text)
		const baseList = isFilterApplied
			? filteredByFiltersOnly
			: (hotelsData?.cardList ?? []);

		const filteredHotels = [...baseList]?.filter((hotel) =>
			hotel.name.toLowerCase().includes(trimmedText.toLowerCase()),
		);

		hotelsActions.setHotelsList(filteredHotels);
	};

	return {
		searchText,
		handleChangeText,
		isLoading,
	};
};
