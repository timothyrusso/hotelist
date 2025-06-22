import { Colors } from "@/src/ui/constants/style/Colors";
import { Icons } from "@/src/ui/constants/style/Icons";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import Fontisto from "@expo/vector-icons/Fontisto";
import type { FC } from "react";
import { View } from "react-native";
import { styles } from "./StarsList.style";

type StarsListProps = {
	stars: number;
};

export const StarsList: FC<StarsListProps> = ({ stars }) => {
	return (
		<View style={styles.container}>
			{Array.from({ length: stars }, (_, index) => index).map((star) => (
				<Fontisto
					key={star}
					name={Icons.star}
					size={Spacing.Double}
					color={Colors.gamma.default}
				/>
			))}
		</View>
	);
};
