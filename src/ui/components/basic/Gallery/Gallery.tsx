import { Image } from "expo-image";
import { type FC, Fragment } from "react";
import {
	FlatList,
	Pressable,
	type StyleProp,
	View,
	type ViewStyle,
} from "react-native";
import { ImageModal } from "../../composite/ImageModal/ImageModal";
import { useGalleryLogic } from "./Gallery.logic";
import { styles } from "./Gallery.style";

type GalleryProps = {
	images: string[];
	style?: StyleProp<ViewStyle>;
};

const separator = () => <View style={styles.separator} />;

export const Gallery: FC<GalleryProps> = ({ images, style }) => {
	const { openImageModal } = useGalleryLogic();

	const renderItem = ({ item }: { item: string }) => (
		<Pressable
			onPress={() => openImageModal(item)}
			style={({ pressed }) => [pressed && styles.imagePressed]}
		>
			<Image source={{ uri: item }} style={styles.image} />
		</Pressable>
	);

	return (
		<Fragment>
			<FlatList
				style={[styles.container, style]}
				horizontal
				data={images}
				renderItem={renderItem}
				ItemSeparatorComponent={separator}
			/>
			<ImageModal />
		</Fragment>
	);
};
