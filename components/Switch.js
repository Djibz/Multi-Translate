import { StyleSheet } from "react-native";
import CustomButton from "./Buttons/CustomButton";
import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SetThemeContext } from "../store/setThemeContext";

const themes = {
  auto: true,
  light: false,
  dark: false,
};

function Switch({ style }) {
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
        console.log(err);
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

  if (loading) {
    return <></>;
  }

  return (
    <View style={style}>
      <CustomButton
        text="Phone settings"
        onPress={() => changeTheme("auto", this)}
        activated={themes["auto"]}
        style={styles.button}
      />
      <CustomButton
        text="Light theme"
        onPress={() => changeTheme("light", this)}
        activated={themes["light"]}
        style={styles.button}
      />
      <CustomButton
        text="Dark theme"
        onPress={() => changeTheme("dark", this)}
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
