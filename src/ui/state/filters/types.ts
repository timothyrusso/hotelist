import { en } from "@/src/modules/localization/locales/en";

export type FiltersState = {
	stars: number[];
	selectedOrderBy: OrderByKeysType;
};

export type FiltersActions = {
	actions: {
		setStars: (stars: number[]) => void;
		setSelectedOrderBy: (selectedOrderBy: OrderByKeysType) => void;
		resetFilters: () => void;
	};
};

export const OrderByKeys = {
	PriceAsc: en.filter_page.price_low_to_high,
	PriceDesc: en.filter_page.price_high_to_low,
	PlaceNameDesc: en.filter_page.place_name_z_to_a,
	PlaceNameAsc: en.filter_page.place_name_a_to_z,
	HotelRatingDesc: en.filter_page.hotel_rating_low_to_high,
	HotelRatingAsc: en.filter_page.hotel_rating_high_to_low,
} as const;

export type OrderByKeysType = (typeof OrderByKeys)[keyof typeof OrderByKeys];
