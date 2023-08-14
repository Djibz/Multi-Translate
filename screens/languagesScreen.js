import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLanguages } from "../util/http";
import { setLanguages } from "../store/languages-context";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import LanguageCard from "../components/LanguageCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

function LanguagesScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [lCount, setLCount] = useState(0);
  const [search, setSearch] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const dispatcher = useDispatch();

  useEffect(() => {
    async function getL() {
      setIsLoading(true);
      try {
        const languages = await getAllLanguages();
        const activated = (
          (await AsyncStorage.getItem("activated")) ?? ""
        ).split(",");
        console.log(activated);
        setErrorMsg(activated);
        languages.forEach((element) => {
          if (activated.includes(element.language)) {
            element["activated"] = true;
          }
        });
        dispatcher(setLanguages(languages));
      } catch (error) {
        setErrorMsg(error);
      }
      setIsLoading(false);
    }

    getL();
  }, []);

  async function onRender() {
    try {
      const activated = await AsyncStorage.getItem("activated");
      setErrorMsg(activated);
    } catch (err) {
      console.log(err);
    }
  }

  // onRender();

  let regex = new RegExp(search, "i");

  const languages = useSelector((state) => {
    return state.languages.languages;
  }).filter((item) => (search === "" ? true : item.name.search(regex) >= 0));

  if (isLoading) {
    return <LoadingOverlay />;
  }

  function saveLanguages() {
    const ls = useSelector((state) => {
      return state.languages.languages;
    });
    try {
      AsyncStorage.setItem(
        "activated",
        ls
          .filter((l) => l.activated)
          .map((l) => l.language)
          .toString()
      );
    } catch (err) {
      console.log(err);
    }
  }

  function onClick(index) {
    if (languages[index].activated) {
      setLCount((current) => current - 1);
      languages[index].activated = false;
    } else {
      setLCount((current) => current + 1);
      languages[index].activated = true;
    }
    saveLanguages();
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Search here..."
          placeholderTextColor="#948c8c"
          style={styles.input}
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      {errorMsg && <Text style={{ color: "white" }}>{errorMsg}</Text>}
      <FlatList
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ alignItems: "stretch" }}
        style={styles.list}
        data={languages}
        renderItem={(item) => (
          <LanguageCard item={item} onClick={onClick.bind(this, item.index)} />
        )}
      />
    </View>
  );
}

export default LanguagesScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    width: "100%",
  },
  input: {
    width: "90%",
    backgroundColor: Colors.thirdly,
    color: "white",
    height: 40,
    borderRadius: 4,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flexDirection: "column-reverse",
    backgroundColor: Colors.secondary,
    width: "100%",
    alignItems: "center",
    height: 60,
  },
});
