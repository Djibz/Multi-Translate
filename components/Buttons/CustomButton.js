import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";

function CustomButton({ text, activated, style, ...props }) {
  return (
    <Pressable
      {...props}
      style={[styles.container, style, { borderWidth: activated ? 2 : 0 }]}
    >
      <Text style={{ color: "white" }}>{text}</Text>
    </Pressable>
  );
}

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: Colors.thirdly,
    minHeight: 48,
    minWidth: 48,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderColor: "green",
  },
});
