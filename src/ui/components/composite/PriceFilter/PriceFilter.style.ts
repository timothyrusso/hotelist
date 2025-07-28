import { Colors } from "@/src/ui/constants/style/Colors";
import { Fonts } from "@/src/ui/constants/style/Fonts";
import { Spacing } from "@/src/ui/constants/style/Spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        marginHorizontal: Spacing.TripleAndHalf,
        paddingVertical: Spacing.Fourfold,
        rowGap: Spacing.Triple,
        borderBottomWidth: 1,
        borderBottomColor: Colors.black.disabled,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    input: {
        padding: Spacing.Triple,
        borderWidth: 1,
        borderColor: Colors.black.disabled,
        borderRadius: Spacing.Double,
        backgroundColor: Colors.black.disabled,
        width: "100%",
    },
    separator: {
        width: Spacing.Sextuple,
        height: Spacing.HalfMinimal,
        backgroundColor: Colors.black.disabled,
    },
    inputWrapper: {
        width: "40%",
    },
    inputError: {
        color: Colors.delta.default,
        fontSize: Spacing.SingleAndHalf,
        fontFamily: Fonts.interRegular,
        position: "absolute",
        bottom: -Spacing.Double,
        left: 0,
    },
});