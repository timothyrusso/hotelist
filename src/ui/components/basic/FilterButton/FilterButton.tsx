import { Colors } from "@/src/ui/constants/style/Colors";
import { Icons } from "@/src/ui/constants/style/Icons";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable } from "react-native";
import { useFilterButtonLogic } from "./FilterButton.logic";
import { styles } from "./FilterButton.style";

export const FilterButton = () => {
	const { handlePress } = useFilterButtonLogic();

	return (
		<Pressable
			style={({ pressed }) => [styles.container, pressed && styles.pressed]}
			onPress={handlePress}
		>
			<Ionicons
				name={Icons.options}
				size={Spacing.TripleAndHalf}
				color={Colors.white.default}
			/>
		</Pressable>
	);
};
