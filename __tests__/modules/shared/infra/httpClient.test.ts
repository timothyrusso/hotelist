import { httpClient } from "@/src/modules/shared/infra/httpClient";

// Replace the global fetch function with a Jest mock
global.fetch = jest.fn();

// Create a properly typed reference to our fetch mock
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

// Define proper types for mock responses
interface MockResponse {
	ok: boolean;
	status?: number;
	json: jest.MockedFunction<() => Promise<unknown>>;
}

// Helper function to safely cast MockResponse to Response
const createMockResponse = (mockResponse: MockResponse): Response => {
	return mockResponse as unknown as Response;
};

describe("httpClient", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("successful requests", () => {
		it("should make a successful GET request and return data", async () => {
			const mockUrl = "https://api.example.com/data";
			const mockData = { id: 1, name: "Test Item" };

			// Create a mock Response object that simulates a successful HTTP response
			const mockResponse: MockResponse = {
				ok: true, // HTTP status 200-299
				json: jest.fn().mockResolvedValue(mockData), // Simulate JSON parsing
			};

			mockFetch.mockResolvedValue(createMockResponse(mockResponse));

			const result = await httpClient(mockUrl);

			expect(mockFetch).toHaveBeenCalledWith(mockUrl, undefined);
			expect(mockFetch).toHaveBeenCalledTimes(1);
			expect(result).toEqual({
				success: true,
				data: mockData,
			});
		});

		it("should make a successful POST request with options", async () => {
			const mockUrl = "https://api.example.com/create";
			const mockData = { success: true, id: 123 };
			const mockOptions: RequestInit = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name: "Test" }),
			};

			const mockResponse: MockResponse = {
				ok: true,
				json: jest.fn().mockResolvedValue(mockData),
			};

			mockFetch.mockResolvedValue(createMockResponse(mockResponse));

			const result = await httpClient(mockUrl, mockOptions);

			expect(mockFetch).toHaveBeenCalledWith(mockUrl, mockOptions);
			expect(mockFetch).toHaveBeenCalledTimes(1);
			expect(result).toEqual({
				success: true,
				data: mockData,
			});
		});

		it("should handle different data types correctly", async () => {
			const mockUrl = "https://api.example.com/list";
			const mockData = ["item1", "item2", "item3"];

			const mockResponse: MockResponse = {
				ok: true,
				json: jest.fn().mockResolvedValue(mockData),
			};

			mockFetch.mockResolvedValue(createMockResponse(mockResponse));

			const result = await httpClient<string[]>(mockUrl);

			expect(result).toEqual({
				success: true,
				data: mockData,
			});
		});
	});

	describe("HTTP error responses", () => {
		it("should handle 404 Not Found error", async () => {
			const mockUrl = "https://api.example.com/notfound";

			const mockResponse: MockResponse = {
				ok: false,
				status: 404,
				json: jest.fn(), // Not called for error responses
			};

			mockFetch.mockResolvedValue(createMockResponse(mockResponse));

			const result = await httpClient(mockUrl);

			expect(mockFetch).toHaveBeenCalledWith(mockUrl, undefined);
			expect(mockFetch).toHaveBeenCalledTimes(1);
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.message).toBe("HTTP error, status: 404");
			}
		});

		it("should handle 500 Internal Server Error", async () => {
			const mockUrl = "https://api.example.com/error";

			const mockResponse: MockResponse = {
				ok: false,
				status: 500,
				json: jest.fn(),
			};

			mockFetch.mockResolvedValue(createMockResponse(mockResponse));

			const result = await httpClient(mockUrl);

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.message).toBe("HTTP error, status: 500");
			}
		});

		it("should handle 401 Unauthorized error", async () => {
			const mockUrl = "https://api.example.com/unauthorized";

			const mockResponse: MockResponse = {
				ok: false,
				status: 401,
				json: jest.fn(),
			};

			mockFetch.mockResolvedValue(createMockResponse(mockResponse));

			const result = await httpClient(mockUrl);

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.message).toBe("HTTP error, status: 401");
			}
		});
	});

	describe("network and exception errors", () => {
		it("should handle network errors when fetch throws", async () => {
			const mockUrl = "https://api.example.com/network-error";
			const networkError = new Error("Network request failed");

			// Simulate fetch throwing an exception
			mockFetch.mockRejectedValue(networkError);

			const result = await httpClient(mockUrl);

			expect(mockFetch).toHaveBeenCalledWith(mockUrl, undefined);
			expect(mockFetch).toHaveBeenCalledTimes(1);
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.message).toBe("Network request failed");
			}
		});

		it("should handle JSON parsing errors", async () => {
			// Set up mock to simulate invalid JSON response
			const mockUrl = "https://api.example.com/invalid-json";

			const mockResponse: MockResponse = {
				ok: true,
				// Simulate JSON parsing throwing an error
				json: jest.fn().mockRejectedValue(new Error("Invalid JSON")),
			};

			mockFetch.mockResolvedValue(createMockResponse(mockResponse));

			const result = await httpClient(mockUrl);

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.message).toBe("Invalid JSON");
			}
		});

		it("should handle non-Error exceptions and convert them", async () => {
			// Set up mock to simulate a non-Error exception
			const mockUrl = "https://api.example.com/strange-error";

			// Simulate fetch throwing a string (which is not an Error object)
			mockFetch.mockRejectedValue("Something went wrong");

			const result = await httpClient(mockUrl);

			expect(result.success).toBe(false);
			if (!result.success) {
				// Should convert non-Error to "Unknown error"
				expect(result.error.message).toBe("Unknown error");
			}
		});
	});

	describe("edge cases", () => {
		it("should handle empty response data", async () => {
			// Set up mock to return empty data
			const mockUrl = "https://api.example.com/empty";

			const mockResponse: MockResponse = {
				ok: true,
				json: jest.fn().mockResolvedValue(null), // null response
			};

			mockFetch.mockResolvedValue(createMockResponse(mockResponse));

			const result = await httpClient(mockUrl);

			expect(result).toEqual({
				success: true,
				data: null,
			});
		});
	});
});
