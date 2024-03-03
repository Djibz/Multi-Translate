import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native";
import { TranslateCard } from "../components/TranslateCard";
import { useContext, useEffect, useState } from "react";
import CustomButton from "../components/Buttons/CustomButton";
import { ThemeContext } from "../Contexts/themeContext";
import LanguagesContext from "../Contexts/languagesContext";
import React from "react";
import { useIsFocused } from "@react-navigation/native";

function TranslationScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [sentence, setSentence] = useState("Hello");
  const [source, setSource] = useState("en");
  const [randomNumber, setRandomNumber] = useState(0);

  useEffect(() => {
    setRandomNumber((n) => n + 1);
  }, [isFocused]);

  const theme = useContext(ThemeContext);

  const { select, languages: allLanguages } = useContext(LanguagesContext);

  const languages = allLanguages.filter((item) => item.activated);

  function onModified(text, source) {
    setSource(source);
    setSentence(text);
  }

  function deleteItem(languageCode: string) {
    select(languageCode);
    setRandomNumber((n) => n + 1);
  }

  if (!languages.length) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <CustomButton
          text="Select languages"
          onPress={() => navigation.navigate("Languages")}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        keyboardShouldPersistTaps="always"
        removeClippedSubviews={false}
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
            counter={randomNumber}
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
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    justifyContent: "center",
    padding: 10,
    paddingTop: 30,
  },
});
