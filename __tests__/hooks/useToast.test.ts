import { ToastType, useToast } from "@/src/ui/hooks/useToast";
import { renderHook } from "@testing-library/react-native";
import Toast from "react-native-toast-message";

// This prevents actual toast notifications during testing and gives us control over the Toast.show method
jest.mock("react-native-toast-message", () => ({
	show: jest.fn(),
}));

// Create a properly typed reference to our mock
const mockToast = Toast as jest.Mocked<typeof Toast>;

describe("useToast", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("successful usage", () => {
		it("should show error toast with default type when no type is specified", () => {
			const testText = "This is an error message";

			const { result } = renderHook(() => useToast());

			// Test the showToast function with only text (defaults to ERROR type)
			result.current.showToast(testText);

			// Verify Toast.show was called with correct parameters
			expect(mockToast.show).toHaveBeenCalledTimes(1);
			expect(mockToast.show).toHaveBeenCalledWith({
				type: ToastType.ERROR,
				text1: testText,
			});
		});

		it("should show error toast with explicit ERROR type", () => {
			const testText = "This is an error message";
			const testDescription = "This is the error description";

			const { result } = renderHook(() => useToast());

			result.current.showToast(testText, ToastType.ERROR, testDescription);

			expect(mockToast.show).toHaveBeenCalledTimes(1);
			expect(mockToast.show).toHaveBeenCalledWith({
				type: ToastType.ERROR,
				text1: testText,
				text2: testDescription,
			});
		});

		it("should show success toast with SUCCESS type", () => {
			const testText = "Operation completed successfully";
			const testDescription = "Your data has been saved";

			const { result } = renderHook(() => useToast());

			result.current.showToast(testText, ToastType.SUCCESS, testDescription);

			expect(mockToast.show).toHaveBeenCalledTimes(1);
			expect(mockToast.show).toHaveBeenCalledWith({
				type: ToastType.SUCCESS,
				text1: testText,
				text2: testDescription,
			});
		});

		it("should show info toast with INFO type", () => {
			const testText = "Information message";
			const testDescription = "This is informational content";

			const { result } = renderHook(() => useToast());

			result.current.showToast(testText, ToastType.INFO, testDescription);

			expect(mockToast.show).toHaveBeenCalledTimes(1);
			expect(mockToast.show).toHaveBeenCalledWith({
				type: ToastType.INFO,
				text1: testText,
				text2: testDescription,
			});
		});

		it("should show toast without description when description is not provided", () => {
			const testText = "Simple message without description";

			const { result } = renderHook(() => useToast());

			result.current.showToast(testText, ToastType.SUCCESS);

			expect(mockToast.show).toHaveBeenCalledTimes(1);
			expect(mockToast.show).toHaveBeenCalledWith({
				type: ToastType.SUCCESS,
				text1: testText,
				// text2 should not be included when description is not provided
			});

			// Verify text2 is not in the called parameters
			const callArgs = mockToast.show.mock.calls[0][0];
			expect(callArgs).not.toHaveProperty("text2");
		});

		describe("edge cases", () => {
			it("should handle very long text messages", () => {
				const longText = "A".repeat(1000); // Very long text
				const longDescription = "B".repeat(500); // Long description

				const { result } = renderHook(() => useToast());

				result.current.showToast(longText, ToastType.INFO, longDescription);

				expect(mockToast.show).toHaveBeenCalledTimes(1);
				expect(mockToast.show).toHaveBeenCalledWith({
					type: ToastType.INFO,
					text1: longText,
					text2: longDescription,
				});
			});

			it("should handle special characters in text", () => {
				const specialText = "Special chars: !@#$%^&*()_+-=[]{}|;:,.<>?";
				const specialDescription = "Description with emojis: 🎉🚀💻";

				const { result } = renderHook(() => useToast());

				result.current.showToast(
					specialText,
					ToastType.SUCCESS,
					specialDescription,
				);

				expect(mockToast.show).toHaveBeenCalledTimes(1);
				expect(mockToast.show).toHaveBeenCalledWith({
					type: ToastType.SUCCESS,
					text1: specialText,
					text2: specialDescription,
				});
			});

			it("should handle multiple consecutive showToast calls", () => {
				const messages = [
					{
						text: "First message",
						type: ToastType.INFO,
						description: "First desc",
					},
					{
						text: "Second message",
						type: ToastType.SUCCESS,
						description: "Second desc",
					},
					{ text: "Third message", type: ToastType.ERROR },
				];

				const { result } = renderHook(() => useToast());

				// Make multiple consecutive calls
				messages.forEach((msg) => {
					result.current.showToast(msg.text, msg.type, msg.description);
				});

				// Verify Toast.show was called for each message
				expect(mockToast.show).toHaveBeenCalledTimes(3);

				// Verify each call was made with correct parameters
				expect(mockToast.show).toHaveBeenNthCalledWith(1, {
					type: ToastType.INFO,
					text1: "First message",
					text2: "First desc",
				});

				expect(mockToast.show).toHaveBeenNthCalledWith(2, {
					type: ToastType.SUCCESS,
					text1: "Second message",
					text2: "Second desc",
				});

				expect(mockToast.show).toHaveBeenNthCalledWith(3, {
					type: ToastType.ERROR,
					text1: "Third message",
				});
			});
		});
	});
});
