import { Pressable, StyleSheet, Text, View } from "react-native";
import { useContext, useState } from "react";
import { ThemeContext } from "../Contexts/themeContext";
import Icon from "react-native-vector-icons/Ionicons";

function LanguageCard({
  name,
  translated,
  activated,
  isFavorite,
  inFavorite,
  onClick,
  onFavorite,
}) {
  const [active, setActive] = useState(activated);
  const theme = useContext(ThemeContext);

  if ((inFavorite && !isFavorite) || (!inFavorite && isFavorite)) {
    return <></>;
  }

  function click() {
    setActive((cur: Boolean) => !cur);
    onClick();
  }

  return (
    <Pressable
      style={[
        styles.languageButton,
        {
          backgroundColor: active ? theme.activated : theme.secondary,
          borderColor: theme.text,
          borderWidth: isFavorite ? 1 : 0,
        },
      ]}
      onPress={click}
    >
      <View>
        <Text style={[styles.languageText, { color: theme.text }]}>
          {translated}
        </Text>
        <Text
          style={[
            styles.languageText,
            { color: theme.text, fontWeight: "normal" },
          ]}
        >
          {name}
        </Text>
      </View>
      <Pressable onPress={onFavorite}>
        <Icon
          name={isFavorite ? "star" : "star-outline"}
          size={20}
          color={theme.text}
        />
      </Pressable>
    </Pressable>
  );
}

export default LanguageCard;

const styles = StyleSheet.create({
  languageButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 4,
    marginVertical: 6,
    margin: "5%",
    elevation: 4,
  },
  languageText: {
    fontWeight: "bold",
  },
});
