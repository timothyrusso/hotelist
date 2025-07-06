import type { HotelCardItem } from "@/src/modules/hotels/domain/entities/HotelCardItem";
import { create } from "../shared/createStore";
import type { HotelsActions, HotelsState } from "./types";

const initialState: HotelsState = {
	hotelsList: [],
	filteredByFiltersOnly: [],
	hotelsListWithFavorites: [],
};

export const useHotelsStore = create<HotelsState & HotelsActions>((set, get) => ({
	...initialState,
	actions: {
		setHotelsList: (hotelsList: HotelCardItem[]) => {
			set({ hotelsList });
		},
		setFilteredByFiltersOnly: (hotelsList: HotelCardItem[]) => {
			set({ filteredByFiltersOnly: hotelsList });
		},
		setHotelsListWithFavorites: (hotelsList: HotelCardItem[]) => {
			set({ hotelsListWithFavorites: hotelsList });
		},
		setIsFavorite: (id: number, isFavorite: boolean) => {
			set((state) => ({
				hotelsListWithFavorites: state.hotelsListWithFavorites.map((hotel) =>
					hotel.id === id ? { ...hotel, isFavorite } : hotel,
				),
			}));
		},
		getHotelById: (id: number) => {
			return get().hotelsListWithFavorites.find((hotel) => hotel.id === id);
		},
	},
}));
