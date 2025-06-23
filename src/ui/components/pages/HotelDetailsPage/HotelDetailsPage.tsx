import { en } from "@/src/modules/localization/locales/en";
import { BasicView } from "@/src/ui/components/basic/BasicView/BasicView";
import { Screens } from "@/src/ui/constants/navigation/Routes";
import { Colors } from "@/src/ui/constants/style/Colors";
import { Icons } from "@/src/ui/constants/style/Icons";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import Fontisto from "@expo/vector-icons/Fontisto";
import { Image } from "expo-image";
import { Fragment } from "react";
import { ScrollView, Text, View } from "react-native";
import { Chip } from "../../basic/Chip/Chip";
import { CustomButton } from "../../basic/CustomButton/CustomButton";
import { DateCard } from "../../basic/DateCard/DateCard";
import { FilterTitle } from "../../basic/FilterTitle/FilterTitle";
import { Gallery } from "../../basic/Gallery/Gallery";
import { IconButton } from "../../basic/IconButton/IconButton";
import { StarsList } from "../../basic/StarsList/StarsList";
import { useHotelDetailsPageLogic } from "./HotelDetailsPage.logic";

export const HotelDetailsPage = () => {
	const {
		hotelsPageData,
		handleImageError,
		imageError,
		userRatingLabel,
		checkInLabel,
		checkOutLabel,
		showGallery,
		openEmail,
		styles,
		chipLabel,
		goBack,
		mainImage,
	} = useHotelDetailsPageLogic();

	return (
		<BasicView
			nameView={Screens.HotelDetails}
			isFullScreen
			statusBarStyle="light"
		>
			<View style={styles.main}>
				<ScrollView style={styles.container}>
					<View style={styles.imageContainer}>
						<IconButton
							icon={Icons.angleLeft}
							onPress={goBack}
							style={styles.iconButton}
							iconSize={Spacing.Fourfold}
						/>
						<Chip
							label={chipLabel}
							style={styles.chip}
							textStyle={styles.priceChipText}
						/>
						{imageError ? (
							<View style={styles.iconImage}>
								<Fontisto
									name={Icons.hotel}
									size={Spacing.Sextuple}
									color={Colors.white.default}
								/>
							</View>
						) : (
							<Image
								source={{ uri: mainImage }}
								style={styles.image}
								onError={handleImageError}
							/>
						)}
					</View>
					<View style={styles.infoContainer}>
						<View>
							<Text style={styles.name}>{hotelsPageData?.name}</Text>
						</View>
						<View style={styles.ratingContainer}>
							<StarsList stars={hotelsPageData?.stars ?? 0} />
							<Chip
								label={userRatingLabel}
								style={styles.userRatingChip}
								textStyle={styles.userRatingChipText}
							/>
						</View>
						<FilterTitle
							title={en.filter_page.location}
							icon={Icons.mapMarker}
						/>
						<Text style={styles.locationInfo}>
							{hotelsPageData?.location.address}
						</Text>
						<Text style={styles.locationCity}>
							{hotelsPageData?.location.city}
						</Text>
						<View style={styles.dateContainer}>
							<FilterTitle
								title={en.hotel_details_page.check_in_out}
								icon={Icons.clock}
							/>
							<DateCard
								checkInData={checkInLabel}
								checkOutData={checkOutLabel}
							/>
						</View>
						<FilterTitle
							title={en.hotel_details_page.contact_information}
							icon={Icons.headphone}
						/>
						<View style={styles.contactContainer}>
							<FilterTitle
								textStyle={styles.contactText}
								title={hotelsPageData?.contact.email ?? ""}
								icon={Icons.email}
								iconSize={Spacing.SingleAndHalf + Spacing.Minimal}
								iconColor={Colors.black.hover}
							/>
							<FilterTitle
								textStyle={styles.contactText}
								title={hotelsPageData?.contact.phoneNumber ?? ""}
								icon={Icons.phone}
								iconSize={Spacing.SingleAndHalf + Spacing.Minimal}
								iconColor={Colors.black.hover}
							/>
						</View>
						{showGallery && (
							<Fragment>
								<FilterTitle
									title={en.hotel_details_page.gallery}
									icon={Icons.picture}
								/>
								<Gallery
									images={hotelsPageData?.gallery ?? []}
									style={styles.gallery}
								/>
							</Fragment>
						)}
					</View>
				</ScrollView>
				<View style={styles.footer}>
					<CustomButton
						title={en.hotel_details_page.book_now}
						onPress={openEmail}
					/>
				</View>
			</View>
		</BasicView>
	);
};
