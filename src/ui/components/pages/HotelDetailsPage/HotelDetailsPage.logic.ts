import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { Animated, Linking } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { en } from "@/src/modules/localization/locales/en";
import { useGetHotelsQuery } from "@/src/ui/query/hotels/queries/useGetHotelsQuery";
import { useHotelsState } from "@/src/ui/state/hotels";
import { styles as hotelDetailsPageStyles } from "./HotelDetailsPage.style";

export const START_ICON_SIZE = 24;
export const END_ICON_SIZE = 32;
export const INTERPOLATED_ICON_OUTPUT_RANGE = 1.33;
const DURATION = 100;

export const useHotelDetailsPageLogic = () => {
	const { bottom, top } = useSafeAreaInsets();

	const animatedIconSize = useRef(new Animated.Value(START_ICON_SIZE)).current;

	const handleIconAnimation = () => {
		Animated.sequence([
			Animated.timing(animatedIconSize, {
				toValue: END_ICON_SIZE,
				duration: DURATION,
				useNativeDriver: false,
			}),
			Animated.timing(animatedIconSize, {
				toValue: START_ICON_SIZE,
				duration: DURATION,
				useNativeDriver: false,
			}),
		]).start();
	};

	const { id } = useLocalSearchParams();

	const { hotelsActions } = useHotelsState();

	const isHotelFavorite = hotelsActions.getHotelById(Number(id))?.isFavorite;

	const [imageError, setImageError] = useState<boolean>(false);
	const [isFavorite, setIsFavorite] = useState<boolean>(
		isHotelFavorite ?? false,
	);

	const { hotelsData } = useGetHotelsQuery();

	const handleFavoritePress = () => {
		handleIconAnimation();
		setIsFavorite(!isFavorite);
		hotelsActions.setIsFavorite(Number(id), !isFavorite);
	};

	const hotelsPageData = hotelsData?.selectHotelById(Number(id));

	const handleImageError = () => {
		setImageError(true);
	};

	const userRatingLabel = `${en.hotel_details_page.users_rating}: ${hotelsPageData?.userRating}`;

	const checkInLabel = `${hotelsPageData?.checkIn.from} - ${hotelsPageData?.checkIn.to}`;
	const checkOutLabel = `${hotelsPageData?.checkOut.from} - ${hotelsPageData?.checkOut.to}`;

	const showGallery =
		!imageError && hotelsPageData?.gallery && hotelsPageData.gallery.length > 1;

	const openEmail = () => {
		console.log(hotelsPageData?.contact.email);
		return Linking.openURL(
			`mailto:${hotelsPageData?.contact.email}?subject=${en.hotel_details_page.booking} - ${hotelsPageData?.name}`,
		);
	};

	const chipLabel = `${hotelsPageData?.price} ${hotelsPageData?.currency} / ${en.hotel_details_page.night}`;

	return {
		hotelsPageData,
		imageError,
		handleImageError,
		userRatingLabel,
		checkInLabel,
		checkOutLabel,
		showGallery,
		openEmail,
		styles: hotelDetailsPageStyles(bottom, top),
		chipLabel,
		goBack: () => router.back(),
		mainImage: hotelsPageData?.gallery[0],
		isFavorite,
		handleFavoritePress,
		animatedIconSize,
	};
};
