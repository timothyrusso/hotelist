import { en } from "@/src/modules/localization/locales/en";
import { useGetHotelsQuery } from "@/src/ui/query/hotels/queries/useGetHotelsQuery";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Linking } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles as hotelDetailsPageStyles } from "./HotelDetailsPage.style";

export const useHotelDetailsPageLogic = () => {
	const { bottom, top } = useSafeAreaInsets();

	const { id } = useLocalSearchParams();
	const [imageError, setImageError] = useState<boolean>(false);

	const { hotelsData } = useGetHotelsQuery();

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
	};
};
