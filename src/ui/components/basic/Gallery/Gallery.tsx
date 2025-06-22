import { Image } from "expo-image";
import type { FC } from "react";
import { FlatList, type StyleProp, View, type ViewStyle } from "react-native";
import { styles } from "./Gallery.style";

type GalleryProps = {
	images: string[];
	style?: StyleProp<ViewStyle>;
};

const renderItem = ({ item }: { item: string }) => (
	<Image source={{ uri: item }} style={styles.image} />
);

const separator = () => <View style={styles.separator} />;

export const Gallery: FC<GalleryProps> = ({ images, style }) => {
	return (
		<FlatList
			style={[styles.container, style]}
			horizontal
			data={images}
			renderItem={renderItem}
			ItemSeparatorComponent={separator}
		/>
	);
};
