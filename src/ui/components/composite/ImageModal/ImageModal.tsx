import { Image } from "expo-image";
import { Modal, View } from "react-native";
import { Platforms } from "@/src/ui/constants/platform/Platforms";
import { Colors } from "@/src/ui/constants/style/Colors";
import { Icons } from "@/src/ui/constants/style/Icons";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import { CloseButton } from "../../basic/CloseButton/CloseButton";
import { IconButton } from "../../basic/IconButton/IconButton";
import { useImageModal } from "./ImageModal.logic";
import { styles } from "./ImageModal.style";

export const ImageModal = () => {
	const {
		isModalVisible,
		closeImageModal,
		selectedImage,
		handleNextImage,
		handlePreviousImage,
	} = useImageModal();

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
				<IconButton
					icon={Icons.angleLeft}
					onPress={handlePreviousImage}
					style={styles.iconButtonLeft}
				/>
				<IconButton
					icon={Icons.angleRight}
					onPress={handleNextImage}
					style={styles.iconButtonRight}
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
