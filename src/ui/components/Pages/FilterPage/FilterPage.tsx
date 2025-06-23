import { en } from "@/src/modules/localization/locales/en";
import { Screens } from "@/src/ui/constants/navigation/Routes";
import { Icons } from "@/src/ui/constants/style/Icons";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import { OrderByKeys } from "@/src/ui/state/filters/types";
import Fontisto from "@expo/vector-icons/Fontisto";
import { ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { BasicView } from "../../basic/BasicView/BasicView";
import { CloseButton } from "../../basic/CloseButton/CloseButton";
import { CustomButton } from "../../basic/CustomButton/CustomButton";
import { CustomButtonType } from "../../basic/CustomButton/CustomButton.types";
import { FilterItem } from "../../composite/FilterItem/FilterItem";
import { OrderByItem } from "../../composite/OrderByItem/OrderByItem";
import { useFilterPageLogic } from "./FilterPage.logic";

export const FilterPage = () => {
	const {
		availableStars,
		handleStarsPress,
		closeFilter,
		stars,
		resetFilters,
		applyFilters,
		selectedOrderBy,
		handleOrderByPress,
		styles,
	} = useFilterPageLogic();

	return (
		<BasicView statusBarStyle="dark" nameView={Screens.Filter}>
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.filterContainer}>
						<Fontisto name={Icons.filter} size={Spacing.TripleAndHalf} />
						<Text style={styles.title}>{en.filter_page.filters}</Text>
					</View>
					<CloseButton
						onPress={closeFilter}
						style={styles.closeButton}
						size={Spacing.Triple}
					/>
				</View>
				<ScrollView style={styles.content}>
					<FilterItem
						icon={Icons.star}
						title={en.filter_page.hotel_rating}
						data={availableStars}
						showIcon
						onPress={handleStarsPress}
						selectedData={stars}
					/>
					<OrderByItem
						icon={Icons.list}
						title={en.filter_page.order_by}
						data={Object.values(OrderByKeys)}
						onPress={handleOrderByPress as (value: string | number) => void}
						selectedData={selectedOrderBy}
					/>
				</ScrollView>
				<View style={styles.footer}>
					<CustomButton
						title={en.filter_page.reset}
						onPress={resetFilters}
						type={CustomButtonType.Secondary}
					/>
					<CustomButton title={en.filter_page.apply} onPress={applyFilters} />
				</View>
				<Toast />
			</View>
		</BasicView>
	);
};
