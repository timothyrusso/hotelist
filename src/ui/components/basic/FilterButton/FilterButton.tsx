import { Colors } from "@/src/ui/constants/style/Colors";
import { Icons } from "@/src/ui/constants/style/Icons";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable } from "react-native";
import { styles } from "./FilterButton.style";

export const FilterButton = () => {
	return (
		<Pressable
			style={({ pressed }) => [styles.container, pressed && styles.pressed]}
		>
			<Ionicons
				name={Icons.options}
				size={Spacing.TripleAndHalf}
				color={Colors.white.default}
			/>
		</Pressable>
	);
};
