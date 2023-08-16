import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native";
import { TranslateCard } from "../components/TranslateCard";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { swicthLanguage } from "../store/languages-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../components/Buttons/CustomButton";
import { ThemeContext } from "../store/themeContext";

function TranslationScreen({ navigation }) {
  const [sentence, setSentence] = useState("Bonjour");
  const [source, setSource] = useState("fr");
  const [counter, setCounter] = useState(0);

  const theme = useContext(ThemeContext);

  const languages = useSelector((state) => {
    return state.languages.languages;
  }).filter((item) => item.activated);

  async function saveLanguages() {
    try {
      await AsyncStorage.setItem(
        "activated",
        languages.map((l) => l.language).toString()
      );
    } catch (err) {
      console.log(err);
    }
  }
  saveLanguages();

  function onModified(text, source) {
    setSource(source);
    setSentence(text);
  }

  const dispatcher = useDispatch();

  function deleteItem(languageCode) {
    dispatcher(swicthLanguage(languageCode));
    setCounter((cur) => cur + 1);
  }

  if (!languages.length) {
    return (
      <View style={styles.container}>
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
