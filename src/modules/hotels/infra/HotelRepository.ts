import { httpClient } from "@/src/modules/shared/infra/httpClient";
import type { HotelDto } from "../domain/dto/HotelDto";
import type { IHotelRepository } from "../domain/entities/repository/IHotelRepository";
import { Urls } from "../domain/Urls";

/**
 * HotelRepository is a function that contains all the methods related to the hotels
 */
export function HotelRepository(): IHotelRepository {
	const getHotels = async () => {
		return await httpClient<HotelDto[]>(Urls.getHotels);
	};

	return {
		getHotels,
	};
}
