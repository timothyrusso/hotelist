import { Platforms } from "@/src/ui/constants/platform/Platforms";
import { Colors } from "@/src/ui/constants/style/Colors";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import { Image } from "expo-image";
import { Modal, View } from "react-native";
import { CloseButton } from "../../basic/CloseButton/CloseButton";
import { useImageModal } from "./ImageModal.logic";
import { styles } from "./ImageModal.style";

export const ImageModal = () => {
	const { isModalVisible, closeImageModal, selectedImage } = useImageModal();

	return (
		<Modal
			visible={isModalVisible}
			transparent
			animationType="fade"
			onRequestClose={closeImageModal}
			statusBarTranslucent={Platforms.Android}
		>
			<View style={styles.modalOverlay}>
				<CloseButton
					onPress={closeImageModal}
					color={Colors.white.default}
					style={styles.closeButton}
					size={Spacing.Fourfold}
				/>
				{selectedImage ? (
					<Image
						source={{ uri: selectedImage }}
						style={styles.modalImage}
						contentFit="contain"
					/>
				) : null}
			</View>
		</Modal>
	);
};
