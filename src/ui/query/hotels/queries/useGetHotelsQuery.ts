import type { HotelCardItem } from "@/src/modules/hotels/domain/entities/HotelCardItem";
import { GetHotelsUseCase } from "@/src/modules/hotels/usecases/GetHotelsUseCase";
import { useQuery } from "@tanstack/react-query";
import { QueryConfig } from "../../QueryConfig";
import { HotelQueryKeys } from "../HotelQueryKeys";

export const useGetHotelsQuery = () => {
	const getHotels = async () => {
		const response = await GetHotelsUseCase();
		if (!response.success) throw new Error(response.error.message);

		return response.data;
	};

	const { data, isLoading, error } = useQuery({
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
		}),
	});

	return { hotelsData: data, isLoading, error };
};
