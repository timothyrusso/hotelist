import { en } from "@/src/modules/localization/locales/en";
import { FC } from "react";
import { Text, TextInput, View } from "react-native";
import { FilterTitle, type FontistoName } from "../../basic/FilterTitle/FilterTitle";
import { usePriceFilterLogic } from "./PriceFilter.logic";
import { styles } from "./PriceFilter.style";

type PriceFilterProps = {
    icon: FontistoName;
    title: string;
};

export const PriceFilter: FC<PriceFilterProps> = ({ icon, title }) => {
    const { minPrice, maxPrice, handleMinPriceChange, handleMaxPriceChange, minPriceError, maxPriceError } = usePriceFilterLogic();

    return <View style={styles.container}>
        <FilterTitle icon={icon} title={title} />
        <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
                <TextInput style={styles.input} placeholder={en.filter_page.from} keyboardType="numeric" value={minPrice} onChangeText={handleMinPriceChange} />
                {minPriceError && <Text style={styles.inputError}>{en.filter_page.low_price_error}</Text>}
            </View>
            <View style={styles.separator} />
            <View style={styles.inputWrapper}>
                <TextInput style={styles.input} placeholder={en.filter_page.to} keyboardType="numeric" value={maxPrice} onChangeText={handleMaxPriceChange} />
                {maxPriceError && <Text style={styles.inputError}>{en.filter_page.high_price_error}</Text>}
            </View>
        </View>
    </View>;
};