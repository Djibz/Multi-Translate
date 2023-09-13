import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native";
import { TranslateCard } from "../components/TranslateCard";
import { useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../components/Buttons/CustomButton";
import { ThemeContext } from "../Contexts/themeContext";
import LanguagesContext from "../Contexts/languagesContext";

function TranslationScreen({ navigation }) {
  const [sentence, setSentence] = useState("Bonjour");
  const [source, setSource] = useState("fr");

  const theme = useContext(ThemeContext);

  const { select, languages: allLanguages } = useContext(LanguagesContext);

  const languages = allLanguages.filter((item) => item.activated);

  function onModified(text, source) {
    setSource(source);
    setSentence(text);
  }

  function deleteItem(languageCode: string) {
    select(languageCode);
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
