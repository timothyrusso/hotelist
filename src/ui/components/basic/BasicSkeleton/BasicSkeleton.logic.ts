import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { styles as skeletonStyles } from "./BasicSkeleton.style";

const PULSE_DURATION = 800; // Duration for each direction of the pulse (in milliseconds)

const PULSE_STARTING_OPACITY = 0.4; // Minimum opacity (dimmer state)
const PULSE_ENDING_OPACITY = 1.0; // Maximum opacity (brighter state)

export const useBasicSkeletonLogic = () => {
	// Create an animated value for opacity, starting at the minimum opacity
	// useRef ensures the animated value persists across re-renders
	const opacityAnim = useRef(
		new Animated.Value(PULSE_STARTING_OPACITY),
	).current;

	useEffect(() => {
		// Create a looping animation sequence that pulses the opacity
		const pulseAnimation = Animated.loop(
			Animated.sequence([
				// Step 1: Animate from starting opacity to ending opacity (fade in)
				Animated.timing(opacityAnim, {
					toValue: PULSE_ENDING_OPACITY,
					duration: PULSE_DURATION,
					useNativeDriver: true,
				}),
				// Step 2: Animate from ending opacity back to starting opacity (fade out)
				Animated.timing(opacityAnim, {
					toValue: PULSE_STARTING_OPACITY,
					duration: PULSE_DURATION,
					useNativeDriver: true,
				}),
			]),
		);

		// Start the animation loop
		pulseAnimation.start();

		// Cleanup function: stop the animation when component unmounts
		// This prevents memory leaks and ensures the animation stops properly
		return () => {
			pulseAnimation.stop();
		};
	}, [opacityAnim]); // Dependency array: re-run effect if opacityAnim changes

	const styles = skeletonStyles(opacityAnim);

	return {
		styles,
	};
};
