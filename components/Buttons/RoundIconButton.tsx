import { Pressable, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

function RoundIconButton({
  size = 24,
  color,
  iconColor,
  name,
  onPress,
  style = null,
}) {
  if (color === undefined) {
    color = "white";
  }

  if (iconColor === undefined) {
    iconColor = "blue";
  }

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {
          maxWidth: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        },
        style,
      ]}
    >
      <Icon color={iconColor} name={name} size={size * 0.8} />
    </Pressable>
  );
}

export default RoundIconButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
