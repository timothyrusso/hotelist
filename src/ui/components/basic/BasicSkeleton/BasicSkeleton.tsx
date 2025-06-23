import { Animated, type StyleProp, type ViewStyle } from "react-native";
import { useBasicSkeletonLogic } from "./BasicSkeleton.logic";

interface BasicSkeletonProps {
	children?: React.ReactNode;
	style?: StyleProp<ViewStyle>;
}

export const BasicSkeleton: React.FC<BasicSkeletonProps> = ({
	children,
	style,
}) => {
	const { styles } = useBasicSkeletonLogic();

	return (
		<Animated.View style={[styles.container, style]}>{children}</Animated.View>
	);
};
