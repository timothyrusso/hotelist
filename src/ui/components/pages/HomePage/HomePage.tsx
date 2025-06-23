import type { HotelCardItem } from "@/src/modules/hotels/domain/entities/HotelCardItem";
import { BasicView } from "@/src/ui/components/basic/BasicView/BasicView";
import { Screens } from "@/src/ui/constants/navigation/Routes";
import type { UniqueItem } from "@/src/ui/hooks/useUniqueItems";
import { Fragment } from "react";
import { FlatList, View } from "react-native";
import Toast from "react-native-toast-message";
import { EmptyList } from "../../basic/EmptyList/EmptyList";
import { HotelCard } from "../../basic/HotelCard/HotelCard";
import { HomePageListHeader } from "../../composite/HomePageListHeader/HomePageListHeader";
import { HotelCardSkeleton } from "../../composite/HotelCardSkeleton/HotelCardSkeleton";
import { useHomePageLogic } from "./HomePage.logic";
import { styles } from "./HomePage.style";

const Separator = () => <View style={styles.separator} />;

const RenderItem = ({ item }: { item: HotelCardItem | UniqueItem }) => {
	const isSkeleton = "uuid" in item;
	return isSkeleton ? <HotelCardSkeleton /> : <HotelCard hotel={item} />;
};

export const HomePage = () => {
	const { hotelsList, showEmptyList, isLoading, skeletonCardList } =
		useHomePageLogic();

	return (
		<BasicView isFullScreen statusBarStyle="dark" nameView={Screens.Home}>
			<Fragment>
				<FlatList
					data={isLoading ? skeletonCardList : hotelsList}
					renderItem={RenderItem}
					ItemSeparatorComponent={Separator}
					contentContainerStyle={styles.listContentContainer}
					style={styles.listContainer}
					ListHeaderComponent={<HomePageListHeader />}
					ListEmptyComponent={<EmptyList showEmptyList={showEmptyList} />}
				/>
				<Toast />
			</Fragment>
		</BasicView>
	);
};
