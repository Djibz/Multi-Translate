import { StyleSheet, Text, TextInput, View } from "react-native";
import { MagicBorder } from "./MagicBorder";

export function TranslateCard({ item }) {
  return (
    <View style={styles.mainContainer}>
      <MagicBorder
        radius={4}
        width={4}
        image={{ uri: `https://flagcdn.com/h240/${item.code}.png` }}
      >
        <View style={styles.card}>
          <Text style={styles.text}>{item.name}</Text>
          <TextInput style={styles.input}>ouais super</TextInput>
        </View>
      </MagicBorder>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 10,
    elevation: 7,
  },
  card: {
    backgroundColor: "#2f3136",
    padding: 10,
    height: 100,
    width: "100%",
    borderRadius: 4,
  },
  text: {
    flex: 1,
    color: "white",
  },
  input: {
    borderRadius: 4,
    padding: 4,
    overflow: "hidden",
    backgroundColor: "#40444b",
    color: "white",
  },
});
