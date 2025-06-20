import type { HotelCardItem } from "@/src/modules/hotels/domain/entities/HotelCardItem";
import { BasicView } from "@/src/ui/components/basic/BasicView/BasicView";
import { useGetHotelsQuery } from "@/src/ui/query/hotels/queries/useGetHotelsQuery";
import { FlatList, View } from "react-native";
import { HotelCard } from "../../basic/HotelCard/HotelCard";
import { HomePageListHeader } from "../../composite/HomePageListHeader/HomePageListHeader";
import { styles } from "./HomePage.style";

const Separator = () => <View style={styles.separator} />;

const RenderItem = ({ item }: { item: HotelCardItem }) => {
	return <HotelCard hotel={item} />;
};

export const HomePage = () => {
	const { hotelsData } = useGetHotelsQuery();

	return (
		<BasicView isFullScreen statusBarStyle="dark">
			<FlatList
				data={hotelsData?.cardList}
				renderItem={RenderItem}
				ItemSeparatorComponent={Separator}
				contentContainerStyle={styles.listContentContainer}
				style={styles.listContainer}
				ListHeaderComponent={<HomePageListHeader />}
			/>
		</BasicView>
	);
};
