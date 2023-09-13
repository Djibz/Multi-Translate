import { StyleSheet } from "react-native";
import CustomButton from "./Buttons/CustomButton";
import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SetThemeContext } from "../Contexts/setThemeContext";

const themes = {
  auto: false,
  light: false,
  dark: false,
};

function Switch({ style = null }) {
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);

  const setTheme = useContext(SetThemeContext);

  useEffect(() => {
    async function getTheme() {
      setLoading(true);
      try {
        const currentTheme = (await AsyncStorage.getItem("theme")) ?? "auto";
        changeTheme(currentTheme);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }

    getTheme();
  }, []);

  function changeTheme(theme) {
    themes["auto"] = false;
    themes["light"] = false;
    themes["dark"] = false;
    themes[theme] = true;

    AsyncStorage.setItem("theme", theme);

    setCounter((nb) => nb + 1);

    setTheme(theme);
  }

  return (
    <View style={style}>
      <CustomButton
        text="Phone settings"
        onPress={() => changeTheme("auto")}
        activated={themes["auto"]}
        style={styles.button}
      />
      <CustomButton
        text="Light theme"
        onPress={() => changeTheme("light")}
        activated={themes["light"]}
        style={styles.button}
      />
      <CustomButton
        text="Dark theme"
        onPress={() => changeTheme("dark")}
        activated={themes["dark"]}
        style={styles.button}
      />
    </View>
  );
}

export default Switch;

const styles = StyleSheet.create({
  button: {
    marginVertical: 8,
    height: 64,
  },
});
