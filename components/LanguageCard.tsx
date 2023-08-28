import { Pressable, StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../store/themeContext";
import Icon from "react-native-vector-icons/Ionicons";

function LanguageCard({ item, onClick, onFavorite }) {
  const theme = useContext(ThemeContext);

  return (
    <Pressable
      style={[
        styles.languageButton,
        {
          backgroundColor: item.item.activated
            ? theme.activated
            : theme.secondary,
        },
      ]}
      onPress={onClick}
    >
      <View>
        <Text style={[styles.languageText, { color: theme.text }]}>
          {item.item.nameInLanguage}
        </Text>
        <Text
          style={[
            styles.languageText,
            { color: theme.text, fontWeight: "normal" },
          ]}
        >
          {item.item.name}
        </Text>
      </View>
      <Pressable onPress={onFavorite}>
        <Icon
          name={item.item.favorite ? "star" : "star-outline"}
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
