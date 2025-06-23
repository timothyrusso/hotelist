import type { HotelCardItem } from "@/src/modules/hotels/domain/entities/HotelCardItem";
import { useGetHotelsQuery } from "@/src/ui/query/hotels/queries/useGetHotelsQuery";
import { useHotelsState } from "@/src/ui/state/hotels";
import { useEffect, useState } from "react";

const MIN_SEARCH_LENGTH = 1;

export const useSearchBarLogic = () => {
	const [searchText, setSearchText] = useState<string>("");

	// Snapshot of the hotels list when search is inactive
	// This contains the result of other filters (star rating, price, etc.) applied to the original data
	const [currentFilteredList, setCurrentFilteredList] = useState<
		HotelCardItem[]
	>([]);

	const { isLoading } = useGetHotelsQuery();

	const { hotelsActions, hotelsSelectors } = useHotelsState();

	const hotelsList = hotelsSelectors.hotelsList();

	/**
	 * Synchronization between our local snapshot and the global state, witch can change from the filters
	 * CONDITION: Only update when search is inactive (length <= MIN_SEARCH_LENGTH)
	 * - This prevents the snapshot from being updated while user is actively searching
	 * - If we updated during search, we'd lose the reference to the base filtered state
	 */
	useEffect(() => {
		if (searchText.length <= MIN_SEARCH_LENGTH) {
			setCurrentFilteredList(hotelsList);
		}
	}, [hotelsList, searchText]);

	const handleChangeText = (text: string) => {
		setSearchText(text);

		const trimmedText = text.trim();

		// If search is cleared (text too short) → restore previous filtered state
		if (trimmedText.length <= MIN_SEARCH_LENGTH) {
			/**
			 * Restore the previous filtered state (which may have other filters applied)
			 *
			 * WHY currentFilteredList and not hotelsList?
			 * - hotelsList might already be filtered by the current search
			 * - currentFilteredList contains the state before search was applied
			 * - This ensures we restore the correct filtered state, not a circular reference
			 */
			hotelsActions.setHotelsList(currentFilteredList);
			return;
		}

		// CASE 2: Search is active - apply search filter
		/**
		 * Filter from the snapshot (respecting other filters)
		 *
		 * WHY [...currentFilteredList]?
		 * - Creates a new array to avoid mutating the original
		 * - Ensures React detects the change properly
		 *
		 * WHY currentFilteredList and not hotelsList?
		 * - hotelsList might already be filtered by this search
		 * - currentFilteredList contains the base state (with other filters but no search)
		 * - This prevents double-filtering and maintains consistency
		 */
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
