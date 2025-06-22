import { en } from "@/src/modules/localization/locales/en";
import type { FC } from "react";
import { Text, View } from "react-native";
import { styles } from "./DateCard.style";

type DateCardProps = {
	checkInData: string;
	checkOutData: string;
};

export const DateCard: FC<DateCardProps> = ({ checkInData, checkOutData }) => {
	return (
		<View style={styles.container}>
			<View style={styles.contentContainer}>
				<Text style={styles.title}>{en.hotel_details_page.check_in}</Text>
				<Text style={styles.date}>{checkInData}</Text>
			</View>
			<View style={styles.separator} />
			<View style={styles.contentContainer}>
				<Text style={styles.title}>{en.hotel_details_page.check_out}</Text>
				<Text style={styles.date}>{checkOutData}</Text>
			</View>
		</View>
	);
};
