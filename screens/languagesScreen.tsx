import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { useContext, useState } from "react";
import LanguageCard from "../components/LanguageCard";
import ClearButton from "../components/Buttons/ClearButton";
import { ThemeContext } from "../Contexts/themeContext";
import { Language } from "../models/language";
import { languageMatch } from "../util/format";
import LanguagesContext from "../Contexts/languagesContext";

function LanguagesScreen({ route }) {
  const [lCount, setLCount] = useState(0);
  const [search, setSearch] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const { languages, select, favorite } = useContext(LanguagesContext);

  const theme = useContext(ThemeContext);

  const filteredFavorites = languages
    .filter((l: Language) => l.favorite && languageMatch(l, search))
    .sort((a, b) => a.name.localeCompare(b.name));

  const filteredOthers = languages
    .filter((l: Language) => !l.favorite && languageMatch(l, search))
    .sort((a, b) => a.name.localeCompare(b.name));

  const filteredLanguages = [...filteredFavorites, ...filteredOthers];

  function onClick(index: number) {
    if (filteredLanguages[index].activated) {
      setLCount((current) => current - 1);
      filteredLanguages[index].activated = false;
    } else {
      setLCount((current) => current + 1);
      filteredLanguages[index].activated = true;
    }
  }

  function onClickFavorite(index: number) {
    if (filteredLanguages[index].favorite) {
      setLCount((current) => current - 1);
      filteredLanguages[index].favorite = false;
    } else {
      setLCount((current) => current + 1);
      filteredLanguages[index].favorite = true;
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View
        style={[styles.inputContainer, { backgroundColor: theme.secondary }]}
      >
        <TextInput
          placeholder="Search here..."
          placeholderTextColor={theme.text}
          style={[
            styles.input,
            { backgroundColor: theme.thirdly, color: theme.text },
          ]}
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        <ClearButton
          style={styles.clearButton}
          size={24}
          onPress={() => setSearch("")}
          color={theme.text}
        />
      </View>
      <FlatList
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ alignItems: "stretch", paddingVertical: 8 }}
        style={styles.list}
        data={filteredLanguages}
        renderItem={(item) => (
          <>
            {item.index ===
              filteredLanguages.filter((l) => l.favorite).length &&
              item.index !== 0 && (
                <View style={[styles.separator, { borderColor: theme.text }]} />
              )}
            <LanguageCard
              item={item}
              onClick={() => select(item.item.language)}
              onFavorite={onClickFavorite.bind(this, item.index)}
            />
          </>
        )}
      />
    </View>
  );
}

export default LanguagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    width: "100%",
  },
  input: {
    width: "90%",
    height: 48,
    borderRadius: 4,
    // marginBottom: 8,
    paddingHorizontal: 16,
    elevation: 4,
  },
  inputContainer: {
    paddingTop: 30,
    flexDirection: "column-reverse",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 90,
    elevation: 4,
  },
  clearButton: {
    position: "absolute",
    alignSelf: "flex-end",
    marginRight: "5%",
    paddingRight: 16,
    paddingTop: 30,
  },
  separator: {
    borderTopWidth: 1,
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: 4,
  },
});
