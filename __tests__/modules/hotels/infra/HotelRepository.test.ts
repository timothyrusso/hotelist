import { httpClient } from "@/src/modules/shared/infra/httpClient";
import type { HotelDto } from "../../../../src/modules/hotels/domain/dto/HotelDto";
import { Urls } from "../../../../src/modules/hotels/domain/Urls";
import { HotelRepository } from "../../../../src/modules/hotels/infra/HotelRepository";

// Replace the real httpClient with a fake version
jest.mock("@/src/modules/shared/infra/httpClient", () => ({
	httpClient: jest.fn(),
}));

// Create a properly typed reference to our mock
const mockHttpClient = httpClient as jest.MockedFunction<typeof httpClient>;

describe("HotelRepository", () => {
	// Variables that multiple tests can use
	let repository: ReturnType<typeof HotelRepository>;

	beforeEach(() => {
		jest.clearAllMocks();
		// Create a fresh instance of the repository for each test
		// This ensures each test has its own isolated repository
		repository = HotelRepository();
	});

	describe("getHotels", () => {
		const mockHotels: HotelDto[] = [
			{
				id: 1,
				name: "Test Hotel",
				location: {
					address: "123 Test Street",
					city: "Test City",
					latitude: 40.7128,
					longitude: -74.006,
				},
				stars: 4,
				checkIn: {
					from: "14:00",
					to: "23:00",
				},
				checkOut: {
					from: "07:00",
					to: "11:00",
				},
				contact: {
					phoneNumber: "+1234567890",
					email: "test@hotel.com",
				},
				gallery: ["test-image-1.jpg", "test-image-2.jpg"],
				userRating: 4.5,
				price: 100,
				currency: "EUR",
			},
		];

		it("should call httpClient with correct URL and return hotels data", async () => {
			// Simulate a successful API response
			mockHttpClient.mockResolvedValue({
				success: true,
				data: mockHotels,
			});

			const result = await repository.getHotels();

			expect(mockHttpClient).toHaveBeenCalledWith(Urls.getHotels);
			expect(mockHttpClient).toHaveBeenCalledTimes(1);
			expect(result).toEqual({
				success: true,
				data: mockHotels,
			});
		});

		it("should handle httpClient error response", async () => {
			// Set up mock to simulate an API error response
			const mockError = new Error("Network error");
			// Simulate when the API returns success: false with an error
			mockHttpClient.mockResolvedValue({
				success: false,
				error: mockError,
			});

			const result = await repository.getHotels();

			expect(mockHttpClient).toHaveBeenCalledWith(Urls.getHotels);
			expect(mockHttpClient).toHaveBeenCalledTimes(1);
			expect(result).toEqual({
				success: false,
				error: mockError,
			});
		});

		it("should handle httpClient throwing an exception", async () => {
			// Set up mock to simulate an exception being thrown
			const mockError = new Error("Connection timeout");
			// mockRejectedValue() simulates a Promise rejection (thrown exception)
			mockHttpClient.mockRejectedValue(mockError);

			// Test that the exception is properly propagated
			// expect().rejects.toThrow() verifies that the function throws the expected error
			await expect(repository.getHotels()).rejects.toThrow(mockError);
			// Still verify the function was called correctly before throwing
			expect(mockHttpClient).toHaveBeenCalledWith(Urls.getHotels);
			expect(mockHttpClient).toHaveBeenCalledTimes(1);
		});

		it("should handle empty data response", async () => {
			// Set up mock to return empty array
			mockHttpClient.mockResolvedValue({
				success: true,
				data: [],
			});

			const result = await repository.getHotels();

			expect(result).toEqual({
				success: true,
				data: [],
			});
		});
	});
});
