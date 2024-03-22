import { Pressable, StyleSheet, Text, View } from "react-native";
import { useContext, useState } from "react";
import { ThemeContext } from "../../Contexts/themeContext";
import Icon from "react-native-vector-icons/Ionicons";

function IconTextButton({
  text = "",
  activatedText = null,
  activated = false,
  style = null,
  color = null,
  name = "",
  backgroundColor = null,
  onPress = () => {},
  onDone = () => {},
  doneDuration = 0,
  disabled = false,
  ...props
}) {
  const [act, setAct] = useState(activated);
  const [iconName, setIconName] = useState(name);
  const theme = useContext(ThemeContext);
  let wait = null;

  async function action() {
    clearTimeout(wait);
    await onPress();
    if (doneDuration) {
      setAct(true);
    }
    wait = setTimeout(() => {
      setAct(false);
    }, doneDuration);
    onDone();
  }

  if (disabled) {
    return <></>;
  }

  return (
    <Pressable
      onPress={action}
      {...props}
      style={[
        styles.container,
        style,
        {
          borderColor: act ? theme.activated : backgroundColor ?? theme.thirdly,
          borderWidth: 2,
          backgroundColor: backgroundColor ?? theme.thirdly,
        },
      ]}
    >
      <Icon
        color={act ? theme.activated : color ?? theme.text}
        name={act ? "checkmark" : iconName}
        size={16}
      />
      <Text style={{ color: theme.text, textAlign: "center", marginLeft: 0 }}>
        {act ? activatedText ?? text : text}
      </Text>
    </Pressable>
  );
}

export default IconTextButton;

const styles = StyleSheet.create({
  container: {
    height: 32,
    width: 64,
    flexDirection: "row",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "green",
    backgroundColor: "green",
    elevation: 4,
  },
});
