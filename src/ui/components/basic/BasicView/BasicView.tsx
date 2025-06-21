import { StatusBar } from "expo-status-bar";
import type { FC, ReactElement } from "react";
import { SafeAreaView, View } from "react-native";
import { useBasicViewLogic } from "./BasicView.logic";

type BasicViewProps = {
	children: ReactElement;
	statusBarStyle?: "light" | "dark";
	isFullScreen?: boolean;
	nameView: string;
};

export const BasicView: FC<BasicViewProps> = ({
	children,
	statusBarStyle = "dark",
	isFullScreen = false,
	nameView,
}) => {
	const { basicViewStyle } = useBasicViewLogic(isFullScreen);
	const Container = isFullScreen ? View : SafeAreaView;

	// Analyze ri-renders
	console.log(`----------${nameView}---------`);

	return (
		<Container style={basicViewStyle.containerViewStyle}>
			<StatusBar style={statusBarStyle} />
			{children}
		</Container>
	);
};
