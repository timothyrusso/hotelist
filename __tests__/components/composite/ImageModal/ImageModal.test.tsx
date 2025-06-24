import { ImageModal } from "@/src/ui/components/composite/ImageModal/ImageModal";
import { fireEvent, render } from "@testing-library/react-native";
import type { StyleProp, ViewStyle } from "react-native";

// Mock child components and dependencies
jest.mock("@/src/ui/components/basic/CloseButton/CloseButton", () => {
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	const { Pressable, Text } = require("react-native");
	return {
		CloseButton: ({
			onPress,
			color,
			style,
			size,
		}: {
			onPress: () => void;
			color?: string;
			style?: StyleProp<ViewStyle>;
			size?: number;
		}) => (
			<Pressable testID="close-button" onPress={onPress} style={style}>
				<Text testID="close-button-text">
					Close ({color}, {size})
				</Text>
			</Pressable>
		),
	};
});

// Mock the custom hook to control modal state and behavior
jest.mock("@/src/ui/components/composite/ImageModal/ImageModal.logic", () => ({
	useImageModal: jest.fn(),
}));

// Mock expo-image to avoid native image loading and test image props
jest.mock("expo-image", () => ({
	Image: ({
		source,
		style,
		contentFit,
	}: {
		source: { uri: string };
		style: StyleProp<ViewStyle>;
		contentFit: string;
	}) => {
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		const { View, Text } = require("react-native");
		return (
			<View testID="modal-image" style={style}>
				<Text testID="image-uri">{source.uri}</Text>
				<Text testID="image-content-fit">{contentFit}</Text>
			</View>
		);
	},
}));

describe("ImageModal", () => {
	// Get reference to the mocked hook for controlling test scenarios
	const mockUseImageModal =
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		require("@/src/ui/components/composite/ImageModal/ImageModal.logic").useImageModal;

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("snapshot tests", () => {
		it("should render correctly when modal is visible with image", () => {
			mockUseImageModal.mockReturnValue({
				isModalVisible: true,
				closeImageModal: jest.fn(),
				selectedImage: "https://example.com/test-image.jpg",
			});

			const { toJSON } = render(<ImageModal />);
			expect(toJSON()).toMatchSnapshot();
		});

		describe("functional tests", () => {
			it("should render modal when isModalVisible is true", () => {
				mockUseImageModal.mockReturnValue({
					isModalVisible: true,
					closeImageModal: jest.fn(),
					selectedImage: "https://example.com/test-image.jpg",
				});

				const { getByTestId } = render(<ImageModal />);
				expect(getByTestId("close-button")).toBeTruthy();
			});

			it("should not render modal content when isModalVisible is false", () => {
				mockUseImageModal.mockReturnValue({
					isModalVisible: false,
					closeImageModal: jest.fn(),
					selectedImage: "https://example.com/test-image.jpg",
				});

				const { queryByTestId } = render(<ImageModal />);
				expect(queryByTestId("close-button")).toBeNull();
			});

			it("should render image when selectedImage is provided", () => {
				mockUseImageModal.mockReturnValue({
					isModalVisible: true,
					closeImageModal: jest.fn(),
					selectedImage: "https://example.com/test-image.jpg",
				});

				const { getByTestId } = render(<ImageModal />);
				expect(getByTestId("modal-image")).toBeTruthy();
				expect(getByTestId("image-uri").children[0]).toBe(
					"https://example.com/test-image.jpg",
				);
			});

			it("should not render image when selectedImage is null", () => {
				mockUseImageModal.mockReturnValue({
					isModalVisible: true,
					closeImageModal: jest.fn(),
					selectedImage: null,
				});

				const { queryByTestId } = render(<ImageModal />);
				expect(queryByTestId("modal-image")).toBeNull();
			});

			it("should call closeImageModal when close button is pressed", () => {
				// Create a mock function to track if closeImageModal is called
				const mockCloseImageModal = jest.fn();
				mockUseImageModal.mockReturnValue({
					isModalVisible: true,
					closeImageModal: mockCloseImageModal,
					selectedImage: "https://example.com/test-image.jpg",
				});

				const { getByTestId } = render(<ImageModal />);
				fireEvent.press(getByTestId("close-button"));

				expect(mockCloseImageModal).toHaveBeenCalledTimes(1);
			});

			it("should render CloseButton with correct props", () => {
				mockUseImageModal.mockReturnValue({
					isModalVisible: true,
					closeImageModal: jest.fn(),
					selectedImage: "https://example.com/test-image.jpg",
				});

				const { getByTestId } = render(<ImageModal />);
				const closeButtonText = getByTestId("close-button-text");
				expect(closeButtonText.children[0]).toContain("Close");
			});

			it("should render image with correct contentFit", () => {
				mockUseImageModal.mockReturnValue({
					isModalVisible: true,
					closeImageModal: jest.fn(),
					selectedImage: "https://example.com/test-image.jpg",
				});

				const { getByTestId } = render(<ImageModal />);
				expect(getByTestId("image-content-fit").children[0]).toBe("contain");
			});
		});

		describe("edge cases", () => {
			it("should handle very long image URL", () => {
				// Test with extremely long URL to ensure no rendering issues
				const longUrl = "https://example.com/" + "a".repeat(1000) + ".jpg";
				mockUseImageModal.mockReturnValue({
					isModalVisible: true,
					closeImageModal: jest.fn(),
					selectedImage: longUrl,
				});

				const { getByTestId } = render(<ImageModal />);
				expect(getByTestId("modal-image")).toBeTruthy();
				expect(getByTestId("image-uri").children[0]).toBe(longUrl);
			});

			it("should handle undefined selectedImage", () => {
				// Test behavior when selectedImage is undefined (should not render image)
				mockUseImageModal.mockReturnValue({
					isModalVisible: true,
					closeImageModal: jest.fn(),
					selectedImage: undefined,
				});

				const { queryByTestId } = render(<ImageModal />);
				expect(queryByTestId("modal-image")).toBeNull();
			});
		});
	});
});
