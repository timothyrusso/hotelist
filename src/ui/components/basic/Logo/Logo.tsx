import { en } from "@/src/modules/localization/locales/en";
import { Image, Text, View } from "react-native";
import { styles } from "./Logo.style";

export const Logo = () => {
	return (
		<View style={styles.container}>
			<Image
				source={require("../../../../ui/assets/images/logo.png")}
				style={styles.logo}
			/>
			<Text style={styles.logoText}>{en.home_page.logo}</Text>
		</View>
	);
};
