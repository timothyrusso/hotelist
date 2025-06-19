import { Stacks } from "@/src/ui/constants/navigation/Routes";
import { ScreenOptions } from "@/src/ui/constants/navigation/ScreenOptions";
import { queryClient } from "@/src/ui/query/QueryConfig";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<Stack screenOptions={ScreenOptions}>
				<Stack.Screen name={Stacks.Main} />
			</Stack>
		</QueryClientProvider>
	);
}
