import { Chip } from "@/src/ui/components/basic/Chip/Chip";
import { Colors } from "@/src/ui/constants/style/Colors";
import { Fonts } from "@/src/ui/constants/style/Fonts";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import { render } from "@testing-library/react-native";

describe("Chip", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("snapshot tests", () => {
		it("should render correctly with default props", () => {
			// Render the component with default props
			const { toJSON } = render(<Chip label="Test Chip" />);

			expect(toJSON()).toMatchSnapshot();
		});

		it("should render correctly with custom container style", () => {
			const { toJSON } = render(
				<Chip
					label="Test Chip"
					style={{
						backgroundColor: Colors.alpha.default,
						padding: Spacing.TripleAndHalf,
					}}
				/>,
			);

			// ASSERT: Verify the component renders correctly
			expect(toJSON()).toMatchSnapshot();
		});

		it("should render correctly with custom text style", () => {
			const { toJSON } = render(
				<Chip
					label="Test Chip"
					textStyle={{
						color: Colors.alpha.default,
						fontSize: Spacing.Triple,
						fontFamily: Fonts.interMedium,
					}}
				/>,
			);

			expect(toJSON()).toMatchSnapshot();
		});
	});

	describe("functional tests", () => {
		it("should render the label text correctly", () => {
			const { getByText } = render(<Chip label="Custom Label" />);

			expect(getByText("Custom Label")).toBeTruthy();
		});

		it("should handle multiple style objects in arrays", () => {
			const { toJSON } = render(
				<Chip
					label="Test Chip"
					style={[
						{ backgroundColor: Colors.alpha.default },
						{ padding: Spacing.Double },
					]}
					textStyle={[
						{ color: Colors.white.default },
						{ fontSize: Spacing.Triple },
					]}
				/>,
			);

			// Verify the component renders without errors
			expect(toJSON()).toBeTruthy();
		});
	});

	describe("edge cases", () => {
		it("should handle empty label", () => {
			const { getByText } = render(<Chip label="" />);

			expect(getByText("")).toBeTruthy();
		});
	});
});
