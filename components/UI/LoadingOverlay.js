import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Colors } from "../../constants/colors";

function LoadingOverlay() {
  return (
    <View style={styles.container}>
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
    backgroundColor: Colors.primary,
  },
});
