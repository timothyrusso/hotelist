import type { Result } from "@/src/modules/shared/domain/entities/Result";
import type { HotelDto } from "../../dto/HotelDto";

export interface IHotelRepository {
	getHotels: () => Promise<Result<HotelDto[]>>;
}
