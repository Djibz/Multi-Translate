import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { useCallback, useContext, useState } from "react";
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

  const filteredLanguages = languages
    .filter((item: Language) => languageMatch(item, search))
    .sort((a: Language, b: Language) => {
      if (a.favorite === b.favorite) return 0;
      if (a.favorite) return -1;
      return 1;
    });

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

  const renderFavorite = useCallback(({ item }: { item: Language }) => {
    if (!item.favorite) {
      return <></>;
    }
    return (
      <LanguageCard
        item={item}
        onClick={() => select(item.language)}
        onFavorite={() => favorite(item.language)}
      />
    );
  }, []);

  const renderItem = useCallback(({ item }: { item: Language }) => {
    if (item.favorite) {
      return <></>;
    }
    return (
      <LanguageCard
        item={item}
        onClick={() => select(item.language)}
        onFavorite={() => favorite(item.language)}
      />
    );
  }, []);

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
      {/* {errorMsg && <Text style={{ color: theme.text }}>{errorMsg}</Text>} */}
      <FlatList
        keyboardShouldPersistTaps="always"
        removeClippedSubviews
        contentContainerStyle={{ alignItems: "stretch" }}
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
        keyExtractor={(item, index) => index.toString()}
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
