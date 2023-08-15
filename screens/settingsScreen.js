import { StyleSheet, Text, View } from "react-native";
import Switch from "../components/Switch";
import { useContext } from "react";
import { ThemeContext } from "../store/themeContext";

function SettingsScreen() {
  const theme = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={{ color: theme.text, fontWeight: "bold" }}>Theme</Text>
      <Switch />
    </View>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    alignContent: "center",
    paddingHorizontal: "10%",
  },
});
