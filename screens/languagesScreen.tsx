import {
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import LanguageCard from "../components/LanguageCard";
import ClearButton from "../components/Buttons/ClearButton";
import { ThemeContext } from "../Contexts/themeContext";
import { Language } from "../models/language";
import { languageMatch } from "../util/format";
import LanguagesContext from "../Contexts/languagesContext";

function LanguagesScreen({ route, navigation }) {
  const [lCount, setLCount] = useState(0);
  const [search, setSearch] = useState("");
  const [_, r] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // The screen is focused
      // Call any action
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

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
      filteredLanguages[index].favorite = false;
    } else {
      filteredLanguages[index].favorite = true;
    }
  }

  function renderItem(item: Language, index: number) {
    return (
      <LanguageCard
        name={item.name}
        translated={item.nameInLanguage}
        activated={item.activated}
        isFavorite={item.favorite}
        inFavorite={false}
        onClick={select.bind(this, item.language)}
        onFavorite={favorite.bind(this, index)}
        key={index}
      />
    );
  }

  function renderItemFav(item: Language, index: number) {
    function onClick() {
      select(item.language);
    }

    return (
      <LanguageCard
        name={item.name}
        translated={item.nameInLanguage}
        activated={item.activated}
        isFavorite={item.favorite}
        inFavorite={true}
        onClick={onClick}
        onFavorite={onClickFavorite.bind(this, index)}
        key={index}
      />
    );
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
      <ScrollView
        keyboardShouldPersistTaps="always"
        removeClippedSubviews
        contentContainerStyle={{ alignItems: "stretch" }}
        style={styles.list}
      >
        {filteredLanguages.map(renderItemFav)}
        {filteredLanguages.map(renderItem)}
      </ScrollView>
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
