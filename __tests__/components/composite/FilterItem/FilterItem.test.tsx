import { FilterItem } from "@/src/ui/components/composite/FilterItem/FilterItem";
import { fireEvent, render } from "@testing-library/react-native";

// Mock child components to isolate FilterItem testing
jest.mock("@/src/ui/components/basic/FilterTitle/FilterTitle", () => {
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	const { View, Text } = require("react-native");
	return {
		FilterTitle: ({ icon, title }: { icon: string; title: string }) => (
			<View testID="filter-title">
				<Text>
					{icon} - {title}
				</Text>
			</View>
		),
	};
});

jest.mock("@/src/ui/components/basic/FilterChip/FilterChip", () => {
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	const { Pressable, Text } = require("react-native");
	return {
		FilterChip: ({
			value,
			icon,
			onPress,
			selectedData,
		}: {
			value: string | number;
			icon?: string;
			onPress: (value: string | number) => void;
			selectedData: (string | number)[];
		}) => (
			<Pressable testID={`filter-chip-${value}`} onPress={() => onPress(value)}>
				<Text testID={`chip-selected-${value}`}>
					{selectedData.includes(value) ? "selected" : "not-selected"}
				</Text>
				<Text>{icon ? `${icon}-${value}` : value}</Text>
			</Pressable>
		),
	};
});

describe("FilterItem", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("snapshot tests", () => {
		it("should render correctly with default props", () => {
			// Mock data and callback
			const mockData = ["Option 1", "Option 2", "Option 3"];
			const mockOnPress = jest.fn();
			const mockSelectedData: string[] = [];

			const { toJSON } = render(
				<FilterItem
					icon="star"
					title="Test Filter"
					data={mockData}
					onPress={mockOnPress}
					selectedData={mockSelectedData}
				/>,
			);

			expect(toJSON()).toMatchSnapshot();
		});

		it("should render correctly with showIcon enabled", () => {
			const mockData = [1, 2, 3, 4, 5];
			const mockOnPress = jest.fn();
			const mockSelectedData: number[] = [2, 4];

			const { toJSON } = render(
				<FilterItem
					icon="star"
					title="Star Rating"
					data={mockData}
					showIcon={true}
					onPress={mockOnPress}
					selectedData={mockSelectedData}
				/>,
			);

			expect(toJSON()).toMatchSnapshot();
		});
	});

	describe("functional tests", () => {
		it("should render FilterTitle with correct props", () => {
			const mockData = ["Option 1", "Option 2"];
			const mockOnPress = jest.fn();
			const mockSelectedData: string[] = [];

			const { getByTestId } = render(
				<FilterItem
					icon="star"
					title="Test Filter"
					data={mockData}
					onPress={mockOnPress}
					selectedData={mockSelectedData}
				/>,
			);

			expect(getByTestId("filter-title")).toBeTruthy();
		});

		it("should render FilterChip for each data item", () => {
			const mockData = ["Option 1", "Option 2", "Option 3"];
			const mockOnPress = jest.fn();
			const mockSelectedData: string[] = [];

			const { getByTestId } = render(
				<FilterItem
					icon="star"
					title="Test Filter"
					data={mockData}
					onPress={mockOnPress}
					selectedData={mockSelectedData}
				/>,
			);

			expect(getByTestId("filter-chip-Option 1")).toBeTruthy();
			expect(getByTestId("filter-chip-Option 2")).toBeTruthy();
			expect(getByTestId("filter-chip-Option 3")).toBeTruthy();
		});

		it("should not pass icon to FilterChip when showIcon is false", () => {
			const mockData = ["Option 1", "Option 2"];
			const mockOnPress = jest.fn();
			const mockSelectedData: string[] = [];

			// Render the component with showIcon disabled (default)
			const { getByTestId } = render(
				<FilterItem
					icon="star"
					title="Test Filter"
					data={mockData}
					onPress={mockOnPress}
					selectedData={mockSelectedData}
				/>,
			);

			// Verify FilterChip does not receive icon prop
			const chip1 = getByTestId("filter-chip-Option 1");
			expect(chip1).toBeTruthy();
		});

		it("should propagate onPress callback to FilterChip", () => {
			const mockData = ["Option 1", "Option 2"];
			const mockOnPress = jest.fn();
			const mockSelectedData: string[] = [];

			const { getByTestId } = render(
				<FilterItem
					icon="star"
					title="Test Filter"
					data={mockData}
					onPress={mockOnPress}
					selectedData={mockSelectedData}
				/>,
			);

			// Press the first chip
			fireEvent.press(getByTestId("filter-chip-Option 1"));

			// Verify onPress was called with correct value
			expect(mockOnPress).toHaveBeenCalledWith("Option 1");
		});
	});

	describe("edge cases", () => {
		it("should handle empty data array", () => {
			const mockData: string[] = [];
			const mockOnPress = jest.fn();
			const mockSelectedData: string[] = [];

			const { toJSON } = render(
				<FilterItem
					icon="star"
					title="Empty Filter"
					data={mockData}
					onPress={mockOnPress}
					selectedData={mockSelectedData}
				/>,
			);

			expect(toJSON()).toBeTruthy();
		});

		it("should handle single item in data array", () => {
			const mockData = ["Single Option"];
			const mockOnPress = jest.fn();
			const mockSelectedData: string[] = [];

			const { getByTestId } = render(
				<FilterItem
					icon="star"
					title="Single Filter"
					data={mockData}
					onPress={mockOnPress}
					selectedData={mockSelectedData}
				/>,
			);

			expect(getByTestId("filter-chip-Single Option")).toBeTruthy();
		});
	});
});
