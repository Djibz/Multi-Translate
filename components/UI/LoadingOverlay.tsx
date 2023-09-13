import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../../Contexts/themeContext";

function LoadingOverlay() {
  const theme = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ActivityIndicator />
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "black",
  },
});
