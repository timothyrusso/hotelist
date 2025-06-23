import type { HotelCardItem } from "@/src/modules/hotels/domain/entities/HotelCardItem";

export type HotelsState = {
	hotelsList: HotelCardItem[];
	filteredByFiltersOnly: HotelCardItem[];
};

export type HotelsActions = {
	actions: {
		setHotelsList: (hotelsList: HotelCardItem[]) => void;
		setFilteredByFiltersOnly: (hotelsList: HotelCardItem[]) => void;
	};
};
