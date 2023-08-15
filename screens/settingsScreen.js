import { StyleSheet, Text, View } from "react-native";
import Switch from "../components/Switch";

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Theme</Text>
      <Switch />
    </View>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
