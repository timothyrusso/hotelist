import { Stacks } from "@/src/ui/constants/navigation/Routes";
import { ScreenOptions } from "@/src/ui/constants/navigation/ScreenOptions";
import { fontsConfig } from "@/src/ui/constants/style/fonts";
import { queryClient } from "@/src/ui/query/QueryConfig";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
	SplashScreen.preventAutoHideAsync();

	const [fontsLoaded] = useFonts({
		...fontsConfig,
	});

	useEffect(() => {
		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	return (
		<QueryClientProvider client={queryClient}>
			<Stack screenOptions={ScreenOptions}>
				<Stack.Screen name={Stacks.Main} />
			</Stack>
		</QueryClientProvider>
	);
}
