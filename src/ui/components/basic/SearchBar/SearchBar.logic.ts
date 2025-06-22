import { useGetHotelsQuery } from "@/src/ui/query/hotels/queries/useGetHotelsQuery";
import { useHotelsState } from "@/src/ui/state/hotels";
import { useState } from "react";

const MIN_SEARCH_LENGTH = 2;

export const useSearchBarLogic = () => {
	const [searchText, setSearchText] = useState<string>("");
	const { hotelsData } = useGetHotelsQuery();
	const { hotelsActions } = useHotelsState();

	const handleChangeText = (text: string) => {
		setSearchText(text);

		const trimmedText = text.trim();

		if (trimmedText.length <= MIN_SEARCH_LENGTH) {
			hotelsActions.setHotelsList(hotelsData?.cardList ?? []);
			return;
		}

		const filteredHotels = [...(hotelsData?.cardList ?? [])]?.filter((hotel) =>
			hotel.name.toLowerCase().includes(trimmedText.toLowerCase()),
		);
		hotelsActions.setHotelsList(filteredHotels);
	};

	return {
		searchText,
		handleChangeText,
	};
};
