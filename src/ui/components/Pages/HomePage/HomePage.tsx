import type { HotelCardItem } from "@/src/modules/hotels/domain/entities/HotelCardItem";
import { BasicView } from "@/src/ui/components/basic/BasicView/BasicView";
import { Screens } from "@/src/ui/constants/navigation/Routes";
import { FlatList, View } from "react-native";
import { EmptyList } from "../../basic/EmptyList/EmptyList";
import { HotelCard } from "../../basic/HotelCard/HotelCard";
import { HomePageListHeader } from "../../composite/HomePageListHeader/HomePageListHeader";
import { useHomePageLogic } from "./HomePage.logic";
import { styles } from "./HomePage.style";

const Separator = () => <View style={styles.separator} />;

const RenderItem = ({ item }: { item: HotelCardItem }) => {
	return <HotelCard hotel={item} />;
};

export const HomePage = () => {
	const { hotelsList, showEmptyList } = useHomePageLogic();

	return (
		<BasicView isFullScreen statusBarStyle="dark" nameView={Screens.Home}>
			<FlatList
				data={hotelsList}
				renderItem={RenderItem}
				ItemSeparatorComponent={Separator}
				contentContainerStyle={styles.listContentContainer}
				style={styles.listContainer}
				ListHeaderComponent={<HomePageListHeader />}
				ListEmptyComponent={<EmptyList showEmptyList={showEmptyList} />}
			/>
		</BasicView>
	);
};
