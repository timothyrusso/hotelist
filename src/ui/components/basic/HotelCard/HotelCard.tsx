import type { HotelCardItem } from "@/src/modules/hotels/domain/entities/HotelCardItem";
import { Colors } from "@/src/ui/constants/style/Colors";
import { Icons } from "@/src/ui/constants/style/Icons";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import Entypo from "@expo/vector-icons/Entypo";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import type { FC } from "react";
import { Pressable, Text, View } from "react-native";
import { StarsList } from "../StarsList/StarsList";
import { useHotelCardLogic } from "./HotelCard.logic";
import { styles } from "./HotelCard.style";

type HotelCardProps = {
	hotel: HotelCardItem;
};

export const HotelCard: FC<HotelCardProps> = ({
	hotel: { image, name, city, price, stars, id },
}) => {
	const { imageError, handleImageError, onPress } = useHotelCardLogic(id);

	// Analyze ri-renders
	console.log("----------Hotel Card---------", name);

	return (
		<Pressable
			style={({ pressed }) => [styles.container, pressed && styles.pressed]}
			onPress={onPress}
		>
			{image && !imageError ? (
				<Image
					source={{ uri: image }}
					style={styles.image}
					onError={handleImageError}
				/>
			) : (
				<View style={styles.iconImage}>
					<Fontisto
						name={Icons.hotel}
						size={Spacing.Quintuple}
						color={Colors.white.default}
					/>
				</View>
			)}
			<View style={styles.contentContainer}>
				<View style={styles.headerContainer}>
					<StarsList stars={stars} />
					<View style={styles.priceContainer}>
						<Text style={styles.price}>{price}</Text>
						<Fontisto
							name={Icons.euro}
							size={Spacing.Double}
							color={Colors.alpha.default}
						/>
					</View>
				</View>
				<Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
					{name}
				</Text>
				<View style={styles.cityContainer}>
					<Ionicons
						name={Icons.location}
						size={Spacing.Double}
						color={Colors.alpha.default}
					/>
					<Text style={styles.city}>{city}</Text>
				</View>
			</View>
			<Entypo
				name={Icons.chevronRight}
				size={Spacing.Fourfold}
				style={styles.chevron}
				color={Colors.alpha.default}
			/>
		</Pressable>
	);
};
