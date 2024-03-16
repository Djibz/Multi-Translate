import { Pressable, StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../Contexts/themeContext";
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
          borderColor: theme.text,
          borderWidth: item.item.favorite ? 1 : 0,
        },
      ]}
      onPress={onClick}
    >
      <View style={styles.textContainer}>
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
      <Pressable onPress={onFavorite} style={styles.favoriteButton}>
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
    padding: 0,
    borderRadius: 8,
    marginVertical: 6,
    margin: 8,
    elevation: 4,
  },
  languageText: {
    fontWeight: "bold",
  },
  textContainer: {
    margin: 16,
  },
  favoriteButton: {
    padding: 16,
    display: "flex",
    justifyContent: "center",
  },
});
