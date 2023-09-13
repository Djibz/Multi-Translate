import { createContext } from "react";
import { DarkTheme, Theme } from "../constants/colors";

export const ThemeContext = createContext<Theme>(DarkTheme);
