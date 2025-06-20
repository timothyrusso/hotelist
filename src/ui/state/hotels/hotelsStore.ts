import { create } from "../shared/createStore";
import type { HotelsActions, HotelsState } from "./types";

const initialState: HotelsState = {
	hotelsList: [],
};

export const useHotelsStore = create<HotelsState & HotelsActions>((set) => ({
	...initialState,
	actions: {
		setHotelsList: (hotelsList) => {
			set({ hotelsList });
		},
	},
}));
