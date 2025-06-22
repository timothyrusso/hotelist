import { Spacing } from "@/src/ui/constants/style/Spacing";
import type { OrderByKeysType } from "@/src/ui/state/filters/types";
import type { FC } from "react";
import { View } from "react-native";
import { FilterChip } from "../../basic/FilterChip/FilterChip";
import {
	FilterTitle,
	type FontistoName,
} from "../../basic/FilterTitle/FilterTitle";
import { styles } from "./OrderByItem.style";

type OrderByItemProps = {
	icon: FontistoName;
	title: string;
	data: string[] | number[];
	onPress: (value: string | number | OrderByKeysType) => void;
	selectedData: string[] | number[] | OrderByKeysType;
};

export const OrderByItem: FC<OrderByItemProps> = ({
	icon,
	title,
	data,
	onPress,
	selectedData,
}) => {
	return (
		<View style={styles.container}>
			<FilterTitle icon={icon} title={title} iconSize={Spacing.Double} />
			<View style={styles.dataContainer}>
				{data.map((item) => (
					<FilterChip
						key={item}
						value={item}
						onPress={onPress}
						selectedData={selectedData}
					/>
				))}
			</View>
		</View>
	);
};
