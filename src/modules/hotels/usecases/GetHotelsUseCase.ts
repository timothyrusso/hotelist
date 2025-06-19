import type { Result } from "../../shared/domain/entities/Result";
import type { HotelDto } from "../domain/dto/HotelDto";
import { HotelRepository } from "../infra/HotelRepository";

/**
 * GetHotelsUseCase is a use case that gets all hotels from the database.
 * @returns {Promise<Result<HotelDto[]>>} A promise that resolves to a Result object containing an array of HotelDto objects.
 */
export async function GetHotelsUseCase(): Promise<Result<HotelDto[]>> {
	const { getHotels } = await HotelRepository();

	return await getHotels();
}
