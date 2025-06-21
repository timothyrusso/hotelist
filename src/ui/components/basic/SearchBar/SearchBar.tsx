import { en } from "@/src/modules/localization/locales/en";
import { Colors } from "@/src/ui/constants/style/Colors";
import { Icons } from "@/src/ui/constants/style/Icons";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import Fontisto from "@expo/vector-icons/Fontisto";
import { TextInput, View } from "react-native";
import { CloseButton } from "../CloseButton/CloseButton";
import { useSearchBarLogic } from "./SearchBar.logic";
import { styles } from "./SearchBar.style";

export const SearchBar = () => {
	const { searchText, handleChangeText } = useSearchBarLogic();

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder={en.home_page.find_hotel}
				placeholderTextColor={Colors.black.hover}
				onChangeText={handleChangeText}
				value={searchText}
			/>
			{searchText.length === 0 ? (
				<Fontisto
					name={Icons.search}
					size={Spacing.Triple}
					style={styles.icon}
				/>
			) : (
				<CloseButton onPress={() => handleChangeText("")} />
			)}
		</View>
	);
};
