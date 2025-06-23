import { Icons } from "@/src/ui/constants/style/Icons";
import { View } from "react-native";
import { FilterButton } from "../../basic/FilterButton/FilterButton";
import { Logo } from "../../basic/Logo/Logo";
import { SearchBar } from "../../basic/SearchBar/SearchBar";
import { SearchBarChip } from "../../basic/SearchBarChip/SearchBarChip";
import { useHomePageListHeaderLogic } from "./HomePageListHeader.logic";
import { styles } from "./HomePageListHeader.style";

export const HomePageListHeader = () => {
	const {
		showChips,
		showStarsChip,
		showOrderByChip,
		selectedStars,
		selectedOrderBy,
	} = useHomePageListHeaderLogic();

	return (
		<View style={styles.container}>
			<Logo />
			<View style={styles.searchBarContainer}>
				<SearchBar />
				<FilterButton />
			</View>
			{showChips && (
				<View style={styles.chipsContainer}>
					{showStarsChip &&
						selectedStars.map((star) => (
							<SearchBarChip
								key={star}
								value={star}
								icon={Icons.star}
								style={styles.chip}
							/>
						))}
					{showOrderByChip && (
						<SearchBarChip value={selectedOrderBy} style={styles.chip} />
					)}
				</View>
			)}
		</View>
	);
};
