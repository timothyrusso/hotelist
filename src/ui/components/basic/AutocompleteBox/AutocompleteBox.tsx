import { FC } from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "./AutocompleteBox.style";

type AutocompleteBoxProps = {
    data: string[];
    onPress: (item: string) => void;
}

export const AutocompleteBox: FC<AutocompleteBoxProps> = ({ data, onPress }) => {
    return <View style={styles.container}>
        {data.map((item) => (
            <Pressable key={item} style={({ pressed }) => [styles.item, pressed && styles.pressed]} onPress={() => onPress(item)}>
                <Text>{item}</Text>
            </Pressable>
        ))}
    </View>;
};