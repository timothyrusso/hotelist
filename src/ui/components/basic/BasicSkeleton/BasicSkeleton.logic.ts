import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { styles as skeletonStyles } from "./BasicSkeleton.style";

const PULSE_DURATION = 800;

const PULSE_STARTING_OPACITY = 0.4;
const PULSE_ENDING_OPACITY = 1.0;

export const useBasicSkeletonLogic = () => {
	const opacityAnim = useRef(
		new Animated.Value(PULSE_STARTING_OPACITY),
	).current;

	useEffect(() => {
		const pulseAnimation = Animated.loop(
			Animated.sequence([
				Animated.timing(opacityAnim, {
					toValue: PULSE_ENDING_OPACITY,
					duration: PULSE_DURATION,
					useNativeDriver: true,
				}),
				Animated.timing(opacityAnim, {
					toValue: PULSE_STARTING_OPACITY,
					duration: PULSE_DURATION,
					useNativeDriver: true,
				}),
			]),
		);

		pulseAnimation.start();

		return () => {
			pulseAnimation.stop();
		};
	}, [opacityAnim]);

	const styles = skeletonStyles(opacityAnim);

	return {
		styles,
	};
};
