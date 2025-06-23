import type { HotelCardItem } from "@/src/modules/hotels/domain/entities/HotelCardItem";
import { create } from "../shared/createStore";
import type { HotelsActions, HotelsState } from "./types";

const initialState: HotelsState = {
	hotelsList: [],
	filteredByFiltersOnly: [],
};

export const useHotelsStore = create<HotelsState & HotelsActions>((set) => ({
	...initialState,
	actions: {
		setHotelsList: (hotelsList: HotelCardItem[]) => {
			set({ hotelsList });
		},
		setFilteredByFiltersOnly: (hotelsList: HotelCardItem[]) => {
			set({ filteredByFiltersOnly: hotelsList });
		},
	},
}));
