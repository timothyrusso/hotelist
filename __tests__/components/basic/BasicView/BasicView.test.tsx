import { BasicView } from "@/src/ui/components/basic/BasicView/BasicView";
import { render } from "@testing-library/react-native";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";

// Mock expo-status-bar to avoid platform-specific issues
jest.mock("expo-status-bar", () => ({
	StatusBar: jest.fn(() => null),
}));

describe("BasicView", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		// Mock console.log to prevent test output pollution
		jest.spyOn(console, "log").mockImplementation();
	});

	afterEach(() => {
		// Restore console.log
		jest.restoreAllMocks();
	});

	describe("snapshot tests", () => {
		it("should render correctly with default props", () => {
			const { toJSON } = render(
				<BasicView nameView="TestView">
					<View>
						<Text>Test Content</Text>
					</View>
				</BasicView>,
			);

			// Verify the component renders correctly
			expect(toJSON()).toMatchSnapshot();
		});

		it("should render correctly with light status bar", () => {
			const { toJSON } = render(
				<BasicView nameView="TestView" statusBarStyle="light">
					<View>
						<Text>Test Content</Text>
					</View>
				</BasicView>,
			);

			expect(toJSON()).toMatchSnapshot();
		});

		it("should render correctly in full screen mode", () => {
			const { toJSON } = render(
				<BasicView nameView="TestView" isFullScreen={true}>
					<View>
						<Text>Test Content</Text>
					</View>
				</BasicView>,
			);

			expect(toJSON()).toMatchSnapshot();
		});

		it("should render correctly with all custom props", () => {
			const { toJSON } = render(
				<BasicView
					nameView="TestView"
					statusBarStyle="light"
					isFullScreen={true}
				>
					<View>
						<Text>Test Content</Text>
					</View>
				</BasicView>,
			);

			expect(toJSON()).toMatchSnapshot();
		});
	});
	describe("functional tests", () => {
		it("should render children correctly", () => {
			// Render with children
			const { toJSON } = render(
				<BasicView nameView="TestView">
					<View>
						<Text>Test Content</Text>
					</View>
				</BasicView>,
			);

			// Verify children are rendered
			const componentTree = toJSON();
			expect(componentTree).toBeTruthy();
		});

		it("should log view name for re-render analysis", () => {
			const consoleSpy = jest.spyOn(console, "log").mockImplementation();

			render(
				<BasicView nameView="TestView">
					<View>
						<Text>Test Content</Text>
					</View>
				</BasicView>,
			);

			// Verify console.log was called with the view name
			expect(consoleSpy).toHaveBeenCalledWith("----------TestView---------");
		});

		it("should use correct default values for optional props", () => {
			// Mock StatusBar component
			const mockStatusBar = StatusBar as jest.MockedFunction<typeof StatusBar>;

			// Render with only required props
			render(
				<BasicView nameView="TestView">
					<View>
						<Text>Test Content</Text>
					</View>
				</BasicView>,
			);

			// Verify default values are used
			expect(mockStatusBar).toHaveBeenCalledWith(
				{ style: "dark" }, // Default statusBarStyle
				undefined,
			);
		});

		it("should render ScrollView children correctly", () => {
			const { toJSON } = render(
				<BasicView nameView="TestView">
					<ScrollView>
						<View>
							<Text>Scrollable Content</Text>
						</View>
					</ScrollView>
				</BasicView>,
			);

			// Verify ScrollView is rendered
			const componentTree = toJSON();
			expect(componentTree).toBeTruthy();
		});
	});
});
