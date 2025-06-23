import { View } from "react-native";
import { BasicSkeleton } from "../../basic/BasicSkeleton/BasicSkeleton";
import { styles } from "./HotelCardSkeleton.style";

export const HotelCardSkeleton = () => {
	return (
		<BasicSkeleton style={styles.container}>
			<View style={styles.image} />
			<View style={styles.content}>
				<View style={styles.name} />
				<View style={styles.city} />
			</View>
		</BasicSkeleton>
	);
};
