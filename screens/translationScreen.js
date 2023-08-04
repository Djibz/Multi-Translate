import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native";
import { TranslateCard } from "../components/TranslateCard";
import { Colors } from "../constants/colors";
import { useState } from "react";
import { useSelector } from "react-redux";

function TranslationScreen() {
  const [sentence, setSentence] = useState("Bonjour");
  const [source, setSource] = useState("fr");

  const languages = useSelector((state) => {
    return state.languages.languages;
  }).filter((item) => item.activated);

  function onModified(text, source) {
    setSource(source);
    setSentence(text);
  }

  return (
    <View style={styles.container}>
      <FlatList
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={styles.list}
        style={{ width: "100%" }}
        data={languages}
        renderItem={(item) => (
          <TranslateCard
            item={item.item}
            sourceSentence={sentence}
            sourceLanguage={source}
            onModified={onModified}
          />
        )}
      />
    </View>
  );
}

export default TranslationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    justifyContent: "center",
    padding: 10,
    paddingTop: 60,
    paddingBottom: 500,
  },
});
