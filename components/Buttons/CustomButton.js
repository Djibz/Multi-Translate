import { Pressable, StyleSheet, Text } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../../store/themeContext";

function CustomButton({ text, activated, style, ...props }) {
  const theme = useContext(ThemeContext);

  return (
    <Pressable
      {...props}
      style={[
        styles.container,
        style,
        {
          borderColor: theme.activated,
          borderWidth: activated ? 2 : 0,
          backgroundColor: theme.thirdly,
        },
      ]}
    >
      <Text style={{ color: theme.text, fontWeight: "bold" }}>{text}</Text>
    </Pressable>
  );
}

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    minHeight: 48,
    minWidth: 48,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
});
