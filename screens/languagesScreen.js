import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLanguages } from "../util/http";
import { setLanguages } from "../store/languages-context";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import LanguageCard from "../components/LanguageCard";

function LanguagesScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [lCount, setLCount] = useState(0);
  const [search, setSearch] = useState("");

  const dispatcher = useDispatch();

  const token = useSelector((state) => {
    return state.token.token;
  });

  useEffect(() => {
    async function getL() {
      setIsLoading(true);
      try {
        const languages = await getAllLanguages(token);
        dispatcher(setLanguages(languages));
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    }

    getL();
  }, []);

  let regex = new RegExp(search, "i");
  console.log(regex);

  const languages = useSelector((state) => {
    return state.languages.languages;
  }).filter((item) =>
    search === "" ? true : item.displayName.search(regex) >= 0
  );

  if (isLoading) {
    return <LoadingOverlay />;
  }

  function onClick(index) {
    if (languages[index].activated) {
      setLCount((current) => current - 1);
      languages[index].activated = false;
    } else {
      setLCount((current) => current + 1);
      languages[index].activated = true;
    }
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
      <FlatList
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
