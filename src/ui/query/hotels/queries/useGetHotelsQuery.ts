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
			cardList: data.map((hotel) => ({
				id: hotel.id,
				name: hotel.name,
				price: hotel.price,
			})),
			selectHotelById: (id: number) => {
				return data.find((hotel) => hotel.id === id);
			},
		}),
	});

	return { hotelsData: data, isLoading, error };
};
