import type { HotelCardItem } from "@/src/modules/hotels/domain/entities/HotelCardItem";

export type HotelsState = {
	hotelsList: HotelCardItem[];
	filteredByFiltersOnly: HotelCardItem[];
	hotelsListWithFavorites: HotelCardItem[];
};

export type HotelsActions = {
	actions: {
		setHotelsList: (hotelsList: HotelCardItem[]) => void;
		setFilteredByFiltersOnly: (hotelsList: HotelCardItem[]) => void;
		setHotelsListWithFavorites: (hotelsList: HotelCardItem[]) => void;
		setIsFavorite: (id: number, isFavorite: boolean) => void;
		getHotelById: (id: number) => HotelCardItem | undefined;
	};
};
