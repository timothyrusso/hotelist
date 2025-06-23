import type { HotelCardItem } from "@/src/modules/hotels/domain/entities/HotelCardItem";
import { GetHotelsUseCase } from "@/src/modules/hotels/usecases/GetHotelsUseCase";
import { en } from "@/src/modules/localization/locales/en";
import { ToastType, useToast } from "@/src/ui/hooks/useToast";
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
		}),
	});

	return { hotelsData: data, isLoading, error, refetch };
};
