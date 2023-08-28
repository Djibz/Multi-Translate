import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLanguages } from "../store/languages-context";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import LanguageCard from "../components/LanguageCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ClearButton from "../components/Buttons/ClearButton";
import { ThemeContext } from "../store/themeContext";
import useLanguage from "../hooks/useLanguage";
import { useLanguages } from "../hooks/useLanguages";
import { Language } from "../models/language";
import { translate } from "../util/http";

function LanguagesScreen({ route }) {
  const [isLoading, setIsLoading] = useState(false);
  const [lCount, setLCount] = useState(0);
  const [search, setSearch] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const mainLanguage = useLanguage();
  const allLanguages = useLanguages();

  const dispatcher = useDispatch();

  const theme = useContext(ThemeContext);

  useEffect(() => {
    async function getL() {
      setIsLoading(true);
      let saved = false;

      try {
        const languages = allLanguages;

        const activated = (await AsyncStorage.getItem("activated")) ?? "";
        const favorites = (await AsyncStorage.getItem("favorites")) ?? "";
        languages.forEach((element) => {
          if (activated.split(",").includes(element.language)) {
            element["activated"] = true;
          }
          if (favorites.split(",").includes(element.language)) {
            element["favorite"] = true;
          }
        });

        saved = activated !== "";

        await Promise.all(languages.map( async (language: Language) => {
          const translated = await translate(language.name, mainLanguage.code, language.language);
          language['nameInLanguage'] = translated;
        }))

        console.log(languages);

        dispatcher(setLanguages(languages));
      } catch (error) {
        setErrorMsg(error);
      }
      setIsLoading(false);
      if (saved) {
        // navigation.navigate("Translators");
      }
    }

    getL();
  }, [allLanguages]);

  let regex = new RegExp(search, "i");

  const languages = useSelector((state: { languages: any }) => {
    return state.languages.languages;
  });

  if (isLoading || mainLanguage === null) {
    return <LoadingOverlay />;
  }

  const filteredLanguages = languages
    .filter((item: Language) => (search === "" ? true : item.name.search(regex) >= 0))
    .sort((a: Language, b: Language) => {
      if (a.favorite === b.favorite) return 0;
      if (a.favorite) return -1;
      return 1;
    });

  function saveLanguages() {
    try {
      AsyncStorage.setItem(
        "activated",
        languages
          .filter((l: Language) => l.activated)
          .map((l: Language) => l.language)
          .toString()
      );
    } catch (err) {
      console.error(err);
    }

    try {
      AsyncStorage.setItem(
        "favorites",
        languages
          .filter((l: Language) => l.favorite)
          .map((l: Language) => l.language)
          .toString()
      );
    } catch (err) {
      console.log(err);
    }
  }

  function onClick(index: number) {
    if (filteredLanguages[index].activated) {
      setLCount((current) => current - 1);
      filteredLanguages[index].activated = false;
    } else {
      setLCount((current) => current + 1);
      filteredLanguages[index].activated = true;
    }
    saveLanguages();
  }

  function onClickFavorite(index: number) {
    if (filteredLanguages[index].favorite) {
      setLCount((current) => current - 1);
      filteredLanguages[index].favorite = false;
    } else {
      setLCount((current) => current + 1);
      filteredLanguages[index].favorite = true;
    }
    saveLanguages();
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
      {/* {errorMsg && <Text style={{ color: theme.text }}>{errorMsg}</Text>} */}
      <FlatList
        keyboardShouldPersistTaps="always"
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
              onClick={onClick.bind(this, item.index)}
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
  },
});
