import { View } from "react-native";
import { FilterButton } from "../../basic/FilterButton/FilterButton";
import { Logo } from "../../basic/Logo/Logo";
import { SearchBar } from "../../basic/SearchBar/SearchBar";
import { styles } from "./HomePageListHeader.style";

export const HomePageListHeader = () => {
	return (
		<View style={styles.container}>
			<Logo />
			<View style={styles.searchBarContainer}>
				<SearchBar />
				<FilterButton />
			</View>
		</View>
	);
};
