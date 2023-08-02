import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../constants/colors";

function LanguageCard({ item, onClick }) {
  return (
    <Pressable
      style={[
        styles.languageButton,
        { backgroundColor: item.item.activated ? "green" : Colors.secondary },
      ]}
      onPress={onClick}
    >
      <Text style={styles.languageText}>{item.item.displayName}</Text>
    </Pressable>
  );
}

export default LanguageCard;

const styles = StyleSheet.create({
  languageButton: {
    padding: 8,
    backgroundColor: Colors.secondary,
    borderRadius: 4,
    margin: 4,
  },
  languageText: {
    fontWeight: "bold",
    color: "white",
  },
});
