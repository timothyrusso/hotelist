import { useFilterLogic } from "@/src/ui/hooks/useFilterLogic";
import { useGetHotelsQuery } from "@/src/ui/query/hotels/queries/useGetHotelsQuery";
import { useFiltersState } from "@/src/ui/state/filters";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles as filterPageStyles } from "./FilterPage.style";

export const useFilterPageLogic = () => {
	const { bottom } = useSafeAreaInsets();
	const { filtersSelectors } = useFiltersState();

	const { hotelsData } = useGetHotelsQuery();

	const availableStars = hotelsData?.availableStars || [];
	const filteredStars = filtersSelectors.stars();
	const selectedOrderBy = filtersSelectors.selectedOrderBy();

	const { applyFilters, resetFilters, handleStarsPress, handleOrderByPress } =
		useFilterLogic();

	const closeFilter = () => {
		router.back();
	};

	const styles = filterPageStyles(bottom);

	return {
		availableStars,
		handleStarsPress,
		closeFilter,
		stars: filteredStars,
		resetFilters,
		applyFilters,
		selectedOrderBy,
		handleOrderByPress,
		styles,
	};
};
