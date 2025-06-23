import type { HotelDto } from "@/src/modules/hotels/domain/dto/HotelDto";
import type { HotelCardItem } from "@/src/modules/hotels/domain/entities/HotelCardItem";
import { GetHotelsUseCase } from "@/src/modules/hotels/usecases/GetHotelsUseCase";
import { en } from "@/src/modules/localization/locales/en";
import { ToastType, useToast } from "@/src/ui/hooks/useToast";
import {
	OrderByKeys,
	type OrderByKeysType,
} from "@/src/ui/state/filters/types";
import { useQuery } from "@tanstack/react-query";
import { QueryConfig } from "../../QueryConfig";
import { HotelQueryKeys } from "../HotelQueryKeys";

export const useGetHotelsQuery = () => {
	const { showToast } = useToast();

	const getHotels = async () => {
		const response = await GetHotelsUseCase();
		if (!response.success) {
			showToast(
				en.shared.something_went_wrong,
				ToastType.ERROR,
				response.error.message,
			);
			throw new Error(response.error.message);
		}

		return response.data;
	};

	const getCardList = (data: HotelDto[]) => {
		return data.map(
			(hotel): HotelCardItem => ({
				id: hotel.id,
				name: hotel.name,
				city: hotel.location.city,
				stars: hotel.stars,
				price: hotel.price,
				image: hotel.gallery[0],
			}),
		);
	};

	const { data, isLoading, error, refetch } = useQuery({
		queryKey: [HotelQueryKeys.getHotels],
		queryFn: () => getHotels(),
		staleTime: QueryConfig.staleTime,
		gcTime: QueryConfig.gcTime,
		select: (data) => ({
			hotelList: data,
			cardList: data.map(
				(hotel): HotelCardItem => ({
					id: hotel.id,
					name: hotel.name,
					city: hotel.location.city,
					stars: hotel.stars,
					price: hotel.price,
					image: hotel.gallery[0],
				}),
			),
			selectHotelById: (id: number) => {
				return data.find((hotel) => hotel.id === id);
			},
			availableStars: Array.from(
				new Set(data.map((hotel) => hotel.stars)),
			).sort((a, b) => a - b),
			orderByKeys: (key: OrderByKeysType) => {
				return data.sort((a, b) => {
					if (key === OrderByKeys.PriceAsc) return a.price - b.price;
					if (key === OrderByKeys.PriceDesc) return b.price - a.price;
					if (key === OrderByKeys.PlaceNameAsc)
						return a.name.localeCompare(b.name);
					if (key === OrderByKeys.PlaceNameDesc)
						return b.name.localeCompare(a.name);
					if (key === OrderByKeys.HotelRatingAsc) return b.stars - a.stars;
					if (key === OrderByKeys.HotelRatingDesc) return a.stars - b.stars;
					return 0;
				});
			},
		}),
	});

	return { hotelsData: data, isLoading, error, getCardList, refetch };
};
