import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native";
import { TranslateCard } from "../components/TranslateCard";
import { Colors } from "../constants/colors";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { swicthLanguage } from "../store/languages-context";

function TranslationScreen() {
  const [sentence, setSentence] = useState("Bonjour");
  const [source, setSource] = useState("fr");
  const [counter, setCounter] = useState(0);

  const languages = useSelector((state) => {
    return state.languages.languages;
  }).filter((item) => item.activated);

  function onModified(text, source) {
    setSource(source);
    setSentence(text);
  }

  const dispatcher = useDispatch();

  function deleteItem(languageCode) {
    dispatcher(swicthLanguage(languageCode));
    setCounter((cur) => cur + 1);
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
            deleteItem={deleteItem.bind(this, item.item.language)}
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
