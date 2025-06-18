import { StatusBar } from "expo-status-bar";
import type { FC, ReactElement } from "react";
import { SafeAreaView, View } from "react-native";
import { useBasicViewLogic } from "./BasicView.logic";

type BasicViewProps = {
	children: ReactElement;
	statusBarStyle?: "light" | "dark";
	isFullScreen?: boolean;
};

export const BasicView: FC<BasicViewProps> = ({
	children,
	statusBarStyle = "dark",
	isFullScreen = false,
}) => {
	const { basicViewStyle } = useBasicViewLogic(isFullScreen);
	const Container = isFullScreen ? View : SafeAreaView;

	return (
		<Container style={basicViewStyle.containerViewStyle}>
			<StatusBar style={statusBarStyle} />
			{children}
		</Container>
	);
};
