import { useUniqueItems } from "@/src/ui/hooks/useUniqueItems";
import { renderHook } from "@testing-library/react-native";
import { randomUUID } from "expo-crypto";

// Replace the expo-crypto module with a Jest mock
jest.mock("expo-crypto", () => ({
	randomUUID: jest.fn(),
}));

// Create a properly typed reference to our mock
const mockRandomUUID = randomUUID as jest.MockedFunction<typeof randomUUID>;

describe("useUniqueItems", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("successful usage", () => {
		it("should generate a single unique item with UUID", () => {
			const mockUUID = "test-uuid-123";
			mockRandomUUID.mockReturnValue(mockUUID);

			const { result } = renderHook(() => useUniqueItems());

			// Verify the hook returns the expected structure
			expect(result.current).toHaveProperty("getUniqueItems");
			expect(typeof result.current.getUniqueItems).toBe("function");

			// Test the getUniqueItems function
			const items = result.current.getUniqueItems(1);

			// Verify the function was called correctly
			expect(mockRandomUUID).toHaveBeenCalledTimes(1);
			expect(items).toHaveLength(1);
			expect(items[0]).toEqual({
				uuid: mockUUID,
			});
		});

		it("should generate multiple unique items with different UUIDs", () => {
			// Set up mock to return different UUIDs for each call
			const mockUUIDs = ["uuid-1", "uuid-2", "uuid-3", "uuid-4", "uuid-5"];
			mockRandomUUID
				.mockReturnValueOnce(mockUUIDs[0])
				.mockReturnValueOnce(mockUUIDs[1])
				.mockReturnValueOnce(mockUUIDs[2])
				.mockReturnValueOnce(mockUUIDs[3])
				.mockReturnValueOnce(mockUUIDs[4]);

			const { result } = renderHook(() => useUniqueItems());

			// Test generating 5 items
			const items = result.current.getUniqueItems(5);

			expect(mockRandomUUID).toHaveBeenCalledTimes(5);
			expect(items).toHaveLength(5);

			// Verify each item has the correct structure and UUID
			items.forEach((item, index) => {
				expect(item).toEqual({
					uuid: mockUUIDs[index],
				});
				expect(item).toHaveProperty("uuid");
				expect(typeof item.uuid).toBe("string");
			});

			// Verify all UUIDs are unique
			const uuids = items.map((item) => item.uuid);
			const uniqueUUIDs = new Set(uuids);
			expect(uniqueUUIDs.size).toBe(5);
		});

		it("should generate unique items across multiple calls", () => {
			const mockUUIDs = [
				"first-uuid",
				"second-uuid",
				"third-uuid",
				"fourth-uuid",
			];
			mockRandomUUID
				.mockReturnValueOnce(mockUUIDs[0])
				.mockReturnValueOnce(mockUUIDs[1])
				.mockReturnValueOnce(mockUUIDs[2])
				.mockReturnValueOnce(mockUUIDs[3]);

			const { result } = renderHook(() => useUniqueItems());

			// Make multiple calls to getUniqueItems
			const firstCall = result.current.getUniqueItems(1);
			const secondCall = result.current.getUniqueItems(1);
			const thirdCall = result.current.getUniqueItems(2);

			// Verify each call generates unique items
			expect(mockRandomUUID).toHaveBeenCalledTimes(4);
			expect(firstCall).toEqual([{ uuid: "first-uuid" }]);
			expect(secondCall).toEqual([{ uuid: "second-uuid" }]);
			expect(thirdCall).toEqual([
				{ uuid: "third-uuid" },
				{ uuid: "fourth-uuid" },
			]);
		});
	});

	describe("type safety", () => {
		it("should consistently return array of UniqueItem type", () => {
			const mockUUIDs = ["consistency-uuid-1", "consistency-uuid-2"];
			mockRandomUUID
				.mockReturnValueOnce(mockUUIDs[0])
				.mockReturnValueOnce(mockUUIDs[1]);

			const { result } = renderHook(() => useUniqueItems());

			const items = result.current.getUniqueItems(2);

			// Verify return type consistency
			expect(Array.isArray(items)).toBe(true);
			expect(items).toHaveLength(2);

			// Verify each item is of UniqueItem type
			items.forEach((item) => {
				expect(item).toHaveProperty("uuid");
				expect(typeof item.uuid).toBe("string");
				expect(item.uuid.length).toBeGreaterThan(0);
			});
		});
	});
});
