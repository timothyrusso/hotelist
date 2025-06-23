import { useGetHotelsQuery } from "@/src/ui/query/hotels/queries/useGetHotelsQuery";
import { useFiltersState } from "@/src/ui/state/filters";
import { useHotelsState } from "@/src/ui/state/hotels";
import { useState } from "react";

const MIN_SEARCH_LENGTH = 1;

export const useSearchBarLogic = () => {
	const [searchText, setSearchText] = useState<string>("");
	const { filtersActions } = useFiltersState();

	const { isLoading, hotelsData } = useGetHotelsQuery();

	const { hotelsActions, hotelsSelectors } = useHotelsState();

	const hotelsList = hotelsSelectors.hotelsList();

	const handleChangeText = (text: string) => {
		setSearchText(text);

		const trimmedText = text.trim();

		filtersActions.setSearchedText(trimmedText);

		// If search is cleared (text too short) → restore previous filtered state
		if (trimmedText.length <= MIN_SEARCH_LENGTH) {
			hotelsActions.setHotelsList(hotelsData?.cardList ?? []);
			return;
		}

		const filteredHotels = [...hotelsList]?.filter((hotel) =>
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
