import { BasicSkeleton } from "@/src/ui/components/basic/BasicSkeleton/BasicSkeleton";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import { render } from "@testing-library/react-native";

describe("BasicSkeleton", () => {
	it("should render correctly with default props", () => {
		const { toJSON } = render(<BasicSkeleton />);

		// Verify the component renders correctly
		expect(toJSON()).toMatchSnapshot();
	});

	it("should render correctly with children", () => {
		const { toJSON } = render(
			<BasicSkeleton>
				<BasicSkeleton />
			</BasicSkeleton>,
		);

		expect(toJSON()).toMatchSnapshot();
	});

	it("should render correctly with custom style", () => {
		const { toJSON } = render(
			<BasicSkeleton
				style={{ width: Spacing.separator120, height: Spacing.separator80 }}
			/>,
		);

		expect(toJSON()).toMatchSnapshot();
	});

	it("should render correctly with children and custom style", () => {
		const { toJSON } = render(
			<BasicSkeleton style={{ padding: Spacing.Triple }}>
				<BasicSkeleton style={{ margin: Spacing.Double }} />
			</BasicSkeleton>,
		);

		expect(toJSON()).toMatchSnapshot();
	});
});
