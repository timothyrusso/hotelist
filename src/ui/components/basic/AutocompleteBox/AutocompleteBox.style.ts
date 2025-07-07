import { Colors } from "@/src/ui/constants/style/Colors";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: Spacing.separator40 + Spacing.Double,
        left: Spacing.Quintuple + Spacing.Single,
        right: 0,
        backgroundColor: Colors.white.default,
        zIndex: 2,
        borderRadius: Spacing.Triple,
        padding: Spacing.Double,
        borderWidth: 1,
        borderColor: Colors.black.hover,
        width: "88%",
        rowGap: Spacing.Double,
    },
    item: {
        padding: Spacing.Single,
    },
    pressed: {
        backgroundColor: Colors.black.hover,
    },
});