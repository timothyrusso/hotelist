import { Platforms } from "@/src/ui/constants/platform/Platforms";
import { StatusBar } from "react-native";
import { styles } from "./BasicView.style";

export const useBasicViewLogic = (isFullScreen: boolean) => {
	const paddingTop =
		Platforms.Android && !isFullScreen ? StatusBar.currentHeight : 0;

	const basicViewStyle = styles(paddingTop ?? 0);

	return { basicViewStyle };
};
