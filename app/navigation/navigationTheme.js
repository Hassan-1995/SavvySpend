import { DefaultTheme } from "@react-navigation/native";
import colors from "../config/colors";

const myTheme = {
    ...DefaultTheme,
    colors:{
        ...DefaultTheme.colors,
        primary: colors.primary,
        text: colors.primary,
        background: colors.white,
    }
}

export default myTheme;