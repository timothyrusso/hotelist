import type { HotelCardItem } from "@/src/modules/hotels/domain/entities/HotelCardItem";
import { BasicView } from "@/src/ui/components/basic/BasicView/BasicView";
import { useHotelsState } from "@/src/ui/state/hotels";
import { FlatList, View } from "react-native";
import { EmptyList } from "../../basic/EmptyList/EmptyList";
import { HotelCard } from "../../basic/HotelCard/HotelCard";
import { HomePageListHeader } from "../../composite/HomePageListHeader/HomePageListHeader";
import { styles } from "./HomePage.style";

const Separator = () => <View style={styles.separator} />;

const RenderItem = ({ item }: { item: HotelCardItem }) => {
	return <HotelCard hotel={item} />;
};

export const HomePage = () => {
	const { hotelsSelectors } = useHotelsState();

	const hotelsList = hotelsSelectors.hotelsList();

	return (
		<BasicView isFullScreen statusBarStyle="dark">
			<FlatList
				data={hotelsList}
				renderItem={RenderItem}
				ItemSeparatorComponent={Separator}
				contentContainerStyle={styles.listContentContainer}
				style={styles.listContainer}
				ListHeaderComponent={<HomePageListHeader />}
				ListEmptyComponent={<EmptyList />}
			/>
		</BasicView>
	);
};
