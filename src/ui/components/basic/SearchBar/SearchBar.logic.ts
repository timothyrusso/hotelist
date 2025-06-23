import type { HotelCardItem } from "@/src/modules/hotels/domain/entities/HotelCardItem";
import { useGetHotelsQuery } from "@/src/ui/query/hotels/queries/useGetHotelsQuery";
import { useHotelsState } from "@/src/ui/state/hotels";
import { useEffect, useState } from "react";

const MIN_SEARCH_LENGTH = 1;

export const useSearchBarLogic = () => {
	const [searchText, setSearchText] = useState<string>("");
	const [currentFilteredList, setCurrentFilteredList] = useState<
		HotelCardItem[]
	>([]);

	const { isLoading } = useGetHotelsQuery();

	const { hotelsActions, hotelsSelectors } = useHotelsState();

	const hotelsList = hotelsSelectors.hotelsList();

	// Store the current filtered list when it changes (from other filters)
	useEffect(() => {
		if (searchText.length <= MIN_SEARCH_LENGTH) {
			setCurrentFilteredList(hotelsList);
		}
	}, [hotelsList, searchText]);

	const handleChangeText = (text: string) => {
		setSearchText(text);

		const trimmedText = text.trim();

		if (trimmedText.length <= MIN_SEARCH_LENGTH) {
			// Restore the current filtered list (which may have other filters applied)
			hotelsActions.setHotelsList(currentFilteredList);
			return;
		}

		// Filter from the current filtered list (respecting other filters)
		const filteredHotels = [...currentFilteredList]?.filter((hotel) =>
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
