import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../constants/colors";
import { useContext } from "react";
import { ThemeContext } from "../store/themeContext";

function LanguageCard({ item, onClick }) {
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
      <Text style={[styles.languageText, { color: theme.text }]}>
        {item.item.name}
      </Text>
    </Pressable>
  );
}

export default LanguageCard;

const styles = StyleSheet.create({
  languageButton: {
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
