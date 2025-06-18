import { Screens } from "@/src/ui/constants/navigation/Routes";
import { ScreenOptions } from "@/src/ui/constants/navigation/ScreenOptions";
import { Stack } from "expo-router";

export default function MainLayout() {
	return (
		<Stack screenOptions={ScreenOptions}>
			<Stack.Screen name={Screens.Home} />
		</Stack>
	);
}
