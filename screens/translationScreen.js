import { Button, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native";
import { TranslateCard } from "../components/TranslateCard";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function TranslationScreen({ route, navigation }) {
  const [sentence, setSentence] = useState("Bonjour");
  const [source, setSource] = useState("fr");

  const languages = useSelector((state) => {
    return state.languages.languages;
  }).filter((item) => item.activated);

  const token = useSelector((state) => {
    return state.token.token;
  });

  function onModified(text, source) {
    console.log(source, text);
    setSource(source);
    setSentence(text);
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        style={{ width: "100%" }}
        data={languages}
        renderItem={(item) => (
          <TranslateCard
            item={item.item}
            sourceSentence={sentence}
            sourceLanguage={source}
            token={token}
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
  },
});
