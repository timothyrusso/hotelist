import { en } from "@/src/modules/localization/locales/en";
import { Colors } from "@/src/ui/constants/style/Colors";
import { Icons } from "@/src/ui/constants/style/Icons";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import Ionicons from "@expo/vector-icons/Ionicons";
import type { FC } from "react";
import { Text, View } from "react-native";
import { styles } from "./EmptyList.style";

type EmptyListProps = {
	showEmptyList: boolean;
};

export const EmptyList: FC<EmptyListProps> = ({ showEmptyList }) => {
	return showEmptyList ? (
		<View style={styles.container}>
			<Ionicons
				name={Icons.sad}
				size={Spacing.Fourfold}
				color={Colors.delta.default}
			/>
			<Text style={styles.text}>{en.home_page.no_results_found}</Text>
		</View>
	) : null;
};
