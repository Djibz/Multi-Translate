import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../constants/colors";

function LanguageCard({ item, onClick }) {
  return (
    <Pressable
      style={[
        styles.languageButton,
        { backgroundColor: item.item.activated ? "#339626" : Colors.secondary },
      ]}
      onPress={onClick}
    >
      <Text style={styles.languageText}>{item.item.name}</Text>
    </Pressable>
  );
}

export default LanguageCard;

const styles = StyleSheet.create({
  languageButton: {
    padding: 16,
    backgroundColor: Colors.secondary,
    borderRadius: 4,
    marginVertical: 6,
    margin: "5%",
  },
  languageText: {
    fontWeight: "bold",
    color: "white",
  },
});
