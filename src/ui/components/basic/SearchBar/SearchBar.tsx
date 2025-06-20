import { en } from "@/src/modules/localization/locales/en";
import { Icons } from "@/src/ui/constants/style/Icons";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import Fontisto from "@expo/vector-icons/Fontisto";
import { TextInput, View } from "react-native";
import { styles } from "./SearchBar.style";

export const SearchBar = () => {
	return (
		<View style={styles.container}>
			<TextInput style={styles.input} placeholder={en.home_page.find_hotel} />
			<Fontisto name={Icons.search} size={Spacing.Triple} style={styles.icon} />
		</View>
	);
};
