import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLanguages } from "../util/http";
import { setLanguages } from "../store/languages-context";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import LanguageCard from "../components/LanguageCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ClearButton from "../components/Buttons/ClearButton";
import { ThemeContext } from "../store/themeContext";

function LanguagesScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [lCount, setLCount] = useState(0);
  const [search, setSearch] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const dispatcher = useDispatch();

  const theme = useContext(ThemeContext);

  useEffect(() => {
    async function getL() {
      setIsLoading(true);
      let saved = false;

      try {
        const languages = await getAllLanguages();

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

        dispatcher(setLanguages(languages));
      } catch (error) {
        setErrorMsg(error);
      }
      setIsLoading(false);
      if (saved) {
        navigation.navigate("Translators");
      }
    }

    getL();
  }, []);

  let regex = new RegExp(search, "i");

  const languages = useSelector((state: { languages: any }) => {
    return state.languages.languages;
  });

  if (isLoading) {
    return <LoadingOverlay />;
  }

  const filteredLanguages = languages
    .filter((item) => (search === "" ? true : item.name.search(regex) >= 0))
    .sort((a, b) => {
      if (a.favorite === b.favorite) return 0;
      if (a.favorite) return -1;
      return 1;
    });

  function saveLanguages() {
    try {
      AsyncStorage.setItem(
        "activated",
        languages
          .filter((l) => l.activated)
          .map((l) => l.language)
          .toString()
      );
    } catch (err) {
      console.log(err);
    }

    try {
      AsyncStorage.setItem(
        "favorites",
        languages
          .filter((l) => l.favorite)
          .map((l) => l.language)
          .toString()
      );
    } catch (err) {
      console.log(err);
    }
  }

  function onClick(index) {
    if (filteredLanguages[index].activated) {
      setLCount((current) => current - 1);
      filteredLanguages[index].activated = false;
    } else {
      setLCount((current) => current + 1);
      filteredLanguages[index].activated = true;
    }
    saveLanguages();
  }

  function onClickFavorite(index) {
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
