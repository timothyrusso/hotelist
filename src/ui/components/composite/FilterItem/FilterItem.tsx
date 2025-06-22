import { FC } from "react";
import { View } from "react-native";
import { FilterChip } from "../../basic/FilterChip/FilterChip";
import {
	FilterTitle,
	type FontistoName,
} from "../../basic/FilterTitle/FilterTitle";
import { styles } from "./FilterItem.style";

type FilterItemProps = {
	icon: FontistoName;
	title: string;
	data: string[] | number[];
	showIcon?: boolean;
	onPress: (value: string | number) => void;
	selectedData: number[] | string[];
};

export const FilterItem: FC<FilterItemProps> = ({
	icon,
	title,
	data,
	showIcon = false,
	onPress,
	selectedData,
}) => {
	return (
		<View style={styles.container}>
			<FilterTitle icon={icon} title={title} />
			<View style={styles.dataContainer}>
				{data.map((item) => (
					<FilterChip
						key={item}
						value={item}
						icon={showIcon ? icon : undefined}
						onPress={onPress}
						selectedData={selectedData}
					/>
				))}
			</View>
		</View>
	);
};
