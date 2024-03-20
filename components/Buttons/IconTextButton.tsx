import { Pressable, StyleSheet, Text } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../../Contexts/themeContext";
import Icon from "react-native-vector-icons/Ionicons";

function IconTextButton({
  text = "",
  activated = false,
  style = null,
  color = null,
  name = "",
  backgroundColor = null,
  ...props
}) {
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
          backgroundColor: backgroundColor ?? theme.thirdly,
        },
      ]}
    >
      <Icon color={color ?? theme.text} name={name} size={24} />
      <Text style={{ color: theme.text, textAlign: "center", marginLeft: 8 }}>
        {text}
      </Text>
    </Pressable>
  );
}

export default IconTextButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
});
