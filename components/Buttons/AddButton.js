import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";

function AddButton({ onPress }) {
  return (
    <Pressable
      android_ripple={"#ccc"}
      style={styles.container}
      onPress={onPress}
    >
      <Text style={styles.text}>ADD</Text>
    </Pressable>
  );
}

export default AddButton;

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: Colors.thirdly,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});
