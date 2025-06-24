// Import the testing utilities from @testing-library/react-native

import type { HotelCardItem } from "@/src/modules/hotels/domain/entities/HotelCardItem";
import { OrderByKeys, useFilterLogic } from "@/src/ui/hooks/useFilterLogic";
import { useGetHotelsQuery } from "@/src/ui/query/hotels/queries/useGetHotelsQuery";
import { useFiltersState } from "@/src/ui/state/filters";
import { useHotelsState } from "@/src/ui/state/hotels";
import { renderHook } from "@testing-library/react-native";
import { router } from "expo-router";

// Replace all dependencies with Jest mocks
jest.mock("@/src/ui/state/filters");
jest.mock("@/src/ui/state/hotels");
jest.mock("@/src/ui/query/hotels/queries/useGetHotelsQuery");
jest.mock("expo-router", () => ({
	router: {
		back: jest.fn(),
	},
}));

// Create properly typed references to our mocks
const mockUseFiltersState = useFiltersState as jest.MockedFunction<
	typeof useFiltersState
>;
const mockUseHotelsState = useHotelsState as jest.MockedFunction<
	typeof useHotelsState
>;
const mockUseGetHotelsQuery = useGetHotelsQuery as jest.MockedFunction<
	typeof useGetHotelsQuery
>;
const mockRouter = router as jest.Mocked<typeof router>;

describe("useFilterLogic", () => {
	beforeEach(() => {
		jest.clearAllMocks();

		// Mock useFiltersState
		mockUseFiltersState.mockReturnValue({
			filtersSelectors: {
				selectedOrderBy: jest.fn().mockReturnValue(""),
				searchedText: jest.fn().mockReturnValue(""),
				stars: jest.fn().mockReturnValue([]),
				isFilterApplied: jest.fn().mockReturnValue(false),
			},
			filtersActions: {
				setStars: jest.fn(),
				setSelectedOrderBy: jest.fn(),
				setSearchedText: jest.fn(),
				setIsFilterApplied: jest.fn(),
				resetFilters: jest.fn(),
			},
		});

		// Mock useHotelsState
		mockUseHotelsState.mockReturnValue({
			hotelsActions: {
				setHotelsList: jest.fn(),
				setFilteredByFiltersOnly: jest.fn(),
			},
			hotelsSelectors: {
				hotelsList: jest.fn().mockReturnValue([]),
				filteredByFiltersOnly: jest.fn().mockReturnValue([]),
			},
		});

		// Mock useGetHotelsQuery
		mockUseGetHotelsQuery.mockReturnValue({
			hotelsData: {
				hotelList: [],
				cardList: [
					{
						id: 1,
						name: "Hotel A",
						stars: 4,
						price: 100,
						city: "City A",
						image: "image1.jpg",
					},
					{
						id: 2,
						name: "Hotel B",
						stars: 5,
						price: 200,
						city: "City B",
						image: "image2.jpg",
					},
					{
						id: 3,
						name: "Hotel C",
						stars: 3,
						price: 150,
						city: "City C",
						image: "image3.jpg",
					},
				] as HotelCardItem[],
				selectHotelById: jest.fn(),
				availableStars: [3, 4, 5],
			},
			isLoading: false,
			error: null,
			refetch: jest.fn(),
		});
	});

	describe("successful usage", () => {
		it("should return the expected functions and properties", () => {
			const { result } = renderHook(() => useFilterLogic());

			// Verify the hook returns the expected structure
			expect(result.current).toHaveProperty("applyFilters");
			expect(result.current).toHaveProperty("resetFilters");
			expect(result.current).toHaveProperty("handleStarsPress");
			expect(result.current).toHaveProperty("handleOrderByPress");
			expect(result.current).toHaveProperty("isFilterApplied");
			expect(result.current).toHaveProperty("disableResetButton");
			expect(result.current).toHaveProperty("disableApplyButton");

			// Verify all returned values are functions or booleans
			expect(typeof result.current.applyFilters).toBe("function");
			expect(typeof result.current.resetFilters).toBe("function");
			expect(typeof result.current.handleStarsPress).toBe("function");
			expect(typeof result.current.handleOrderByPress).toBe("function");
			expect(typeof result.current.isFilterApplied).toBe("boolean");
			expect(typeof result.current.disableResetButton).toBe("boolean");
			expect(typeof result.current.disableApplyButton).toBe("boolean");
		});

		it("should apply filters and call router.back", () => {
			// Set up mocks with filter data
			const mockFiltersActions = {
				setStars: jest.fn(),
				setSelectedOrderBy: jest.fn(),
				setSearchedText: jest.fn(),
				setIsFilterApplied: jest.fn(),
				resetFilters: jest.fn(),
			};

			const mockHotelsActions = {
				setHotelsList: jest.fn(),
				setFilteredByFiltersOnly: jest.fn(),
			};

			mockUseFiltersState.mockReturnValue({
				filtersSelectors: {
					selectedOrderBy: jest.fn().mockReturnValue(OrderByKeys.PriceAsc),
					searchedText: jest.fn().mockReturnValue("Hotel"),
					stars: jest.fn().mockReturnValue([4, 5]),
					isFilterApplied: jest.fn().mockReturnValue(false),
				},
				filtersActions: mockFiltersActions,
			});

			mockUseHotelsState.mockReturnValue({
				hotelsActions: mockHotelsActions,
				hotelsSelectors: {
					hotelsList: jest.fn().mockReturnValue([]),
					filteredByFiltersOnly: jest.fn().mockReturnValue([]),
				},
			});

			// Execute the hook and call applyFilters
			const { result } = renderHook(() => useFilterLogic());
			result.current.applyFilters();

			// Verify the expected actions were called
			expect(mockFiltersActions.setIsFilterApplied).toHaveBeenCalledWith(true);
			expect(mockHotelsActions.setHotelsList).toHaveBeenCalled();
			expect(mockHotelsActions.setFilteredByFiltersOnly).toHaveBeenCalled();
			expect(mockRouter.back).toHaveBeenCalled();
		});

		it("should reset filters and call router.back", () => {
			const mockFiltersActions = {
				setStars: jest.fn(),
				setSelectedOrderBy: jest.fn(),
				setSearchedText: jest.fn(),
				setIsFilterApplied: jest.fn(),
				resetFilters: jest.fn(),
			};

			const mockHotelsActions = {
				setHotelsList: jest.fn(),
				setFilteredByFiltersOnly: jest.fn(),
			};

			const mockRefetch = jest.fn();

			mockUseFiltersState.mockReturnValue({
				filtersSelectors: {
					selectedOrderBy: jest.fn().mockReturnValue(""),
					searchedText: jest.fn().mockReturnValue(""),
					stars: jest.fn().mockReturnValue([]),
					isFilterApplied: jest.fn().mockReturnValue(false),
				},
				filtersActions: mockFiltersActions,
			});

			mockUseHotelsState.mockReturnValue({
				hotelsActions: mockHotelsActions,
				hotelsSelectors: {
					hotelsList: jest.fn().mockReturnValue([]),
					filteredByFiltersOnly: jest.fn().mockReturnValue([]),
				},
			});

			mockUseGetHotelsQuery.mockReturnValue({
				hotelsData: {
					hotelList: [],
					cardList: [
						{
							id: 1,
							name: "Hotel A",
							stars: 4,
							price: 100,
							city: "City A",
							image: "image1.jpg",
						},
						{
							id: 2,
							name: "Hotel B",
							stars: 5,
							price: 200,
							city: "City B",
							image: "image2.jpg",
						},
					] as HotelCardItem[],
					selectHotelById: jest.fn(),
					availableStars: [4, 5],
				},
				isLoading: false,
				error: null,
				refetch: mockRefetch,
			});

			// Execute the hook and call resetFilters
			const { result } = renderHook(() => useFilterLogic());
			result.current.resetFilters();

			// Verify the expected actions were called
			expect(mockFiltersActions.resetFilters).toHaveBeenCalled();
			expect(mockHotelsActions.setHotelsList).toHaveBeenCalled();
			expect(mockHotelsActions.setFilteredByFiltersOnly).toHaveBeenCalled();
			expect(mockRefetch).toHaveBeenCalled();
			expect(mockRouter.back).toHaveBeenCalled();
		});

		it("should handle stars press correctly", () => {
			const mockSetStars = jest.fn();
			mockUseFiltersState.mockReturnValue({
				filtersSelectors: {
					selectedOrderBy: jest.fn().mockReturnValue(""),
					searchedText: jest.fn().mockReturnValue(""),
					stars: jest.fn().mockReturnValue([4]),
					isFilterApplied: jest.fn().mockReturnValue(false),
				},
				filtersActions: {
					setStars: mockSetStars,
					setSelectedOrderBy: jest.fn(),
					setSearchedText: jest.fn(),
					setIsFilterApplied: jest.fn(),
					resetFilters: jest.fn(),
				},
			});

			// Execute the hook and call handleStarsPress
			const { result } = renderHook(() => useFilterLogic());

			// Test adding a star
			result.current.handleStarsPress(5);
			expect(mockSetStars).toHaveBeenCalledWith([4, 5]);

			// Test removing a star
			result.current.handleStarsPress(4);
			expect(mockSetStars).toHaveBeenCalledWith([]);
		});

		it("should handle order by press correctly", () => {
			const mockSetSelectedOrderBy = jest.fn();
			mockUseFiltersState.mockReturnValue({
				filtersSelectors: {
					selectedOrderBy: jest.fn().mockReturnValue(OrderByKeys.PriceAsc),
					searchedText: jest.fn().mockReturnValue(""),
					stars: jest.fn().mockReturnValue([]),
					isFilterApplied: jest.fn().mockReturnValue(false),
				},
				filtersActions: {
					setStars: jest.fn(),
					setSelectedOrderBy: mockSetSelectedOrderBy,
					setSearchedText: jest.fn(),
					setIsFilterApplied: jest.fn(),
					resetFilters: jest.fn(),
				},
			});

			// Execute the hook and call handleOrderByPress
			const { result } = renderHook(() => useFilterLogic());

			// Test selecting different order
			result.current.handleOrderByPress(OrderByKeys.PriceDesc);
			expect(mockSetSelectedOrderBy).toHaveBeenCalledWith(
				OrderByKeys.PriceDesc,
			);

			// Test deselecting same order
			result.current.handleOrderByPress(OrderByKeys.PriceAsc);
			expect(mockSetSelectedOrderBy).toHaveBeenCalledWith("");
		});
	});

	describe("button states", () => {
		it("should correctly set button disable states", () => {
			// Set up mocks with no filters applied
			mockUseFiltersState.mockReturnValue({
				filtersSelectors: {
					selectedOrderBy: jest.fn().mockReturnValue(""),
					searchedText: jest.fn().mockReturnValue(""),
					stars: jest.fn().mockReturnValue([]),
					isFilterApplied: jest.fn().mockReturnValue(false),
				},
				filtersActions: {
					setStars: jest.fn(),
					setSelectedOrderBy: jest.fn(),
					setSearchedText: jest.fn(),
					setIsFilterApplied: jest.fn(),
					resetFilters: jest.fn(),
				},
			});

			const { result } = renderHook(() => useFilterLogic());

			// Verify button states
			expect(result.current.disableResetButton).toBe(true); // No filters applied
			expect(result.current.disableApplyButton).toBe(true); // No filters selected

			// Test with filters applied
			mockUseFiltersState.mockReturnValue({
				filtersSelectors: {
					selectedOrderBy: jest.fn().mockReturnValue(OrderByKeys.PriceAsc),
					searchedText: jest.fn().mockReturnValue(""),
					stars: jest.fn().mockReturnValue([4]),
					isFilterApplied: jest.fn().mockReturnValue(true),
				},
				filtersActions: {
					setStars: jest.fn(),
					setSelectedOrderBy: jest.fn(),
					setSearchedText: jest.fn(),
					setIsFilterApplied: jest.fn(),
					resetFilters: jest.fn(),
				},
			});

			const { result: resultWithFilters } = renderHook(() => useFilterLogic());
			expect(resultWithFilters.current.disableResetButton).toBe(false); // Filters applied
			expect(resultWithFilters.current.disableApplyButton).toBe(false); // Filters selected
		});
	});
});
