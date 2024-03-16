import { useContext, useState } from "react";
import RoundIconButton from "./RoundIconButton";
import { ActivityIndicator } from "react-native-paper";
import { ThemeContext } from "../../Contexts/themeContext";

function AsyncButton({
  size = 32,
  color,
  iconColor,
  name,
  onPress,
  style = null,
}) {
  const theme = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);

  async function press() {
    setLoading(true);
    await onPress();
    setLoading(false);
  }

  if (loading) {
    return (
      <ActivityIndicator
        style={[style, { maxHeight: size }]}
        color={theme.text}
        size={size * 0.6}
      />
    );
  }

  return (
    <RoundIconButton
      size={size}
      color={color}
      iconColor={iconColor}
      name={name}
      onPress={press}
      style={style}
    />
  );
}

export default AsyncButton;
