import { Button, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native";
import { TranslateCard } from "../components/TranslateCard";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import AddButton from "../components/AddButton";
import { ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";

function getAllLanguages(token, setLanguages) {
  console.log(new Date());
  fetch(
    "https://translation.googleapis.com/v3beta1/projects/423797242227/supportedLanguages?displayLanguageCode=fr",
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((json) => {
      setLanguages(json.languages);
    })
    .catch((error) => {
      console.log(error);
    });
}

function TranslationScreen({ route, navigation }) {
  const [sentence, setSentence] = useState("Bonjour");
  const [source, setSource] = useState("fr");
  const [languages, setLanguages] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [modalOpened, setModalOpened] = useState(false);

  const token = useSelector((state) => {
    console.log(state);
    return state.token;
  });

  useEffect(() => {
    getAllLanguages(token, setLanguages);
  }, []);

  function onAdd() {
    setModalOpened(true);
  }

  function onAdded(i) {
    console.log(languages[i]);
    setSelectedLanguages((current) => [...current, languages[i]]);
    setModalOpened(false);
  }

  function onModified(text, source) {
    console.log(source, text);
    setSource(source);
    setSentence(text);
  }

  return (
    <View style={styles.container}>
      <Modal visible={modalOpened} style={styles.modal}>
        <FlatList
          contentContainerStyle={styles.modal}
          data={languages}
          renderItem={(item) => {
            return (
              <Pressable
                style={styles.languageButton}
                onPress={onAdded.bind(this, item.index)}
              >
                <Text style={styles.languageText}>{item.item.displayName}</Text>
              </Pressable>
            );
          }}
        />
        <Button
          title="Cancel"
          color={"#d83333"}
          onPress={setModalOpened.bind(this, false)}
        />
      </Modal>
      <FlatList
        contentContainerStyle={styles.list}
        style={{ width: "100%" }}
        data={selectedLanguages}
        renderItem={(item) => (
          <TranslateCard
            item={item.item}
            sourceSentence={sentence}
            sourceLanguage={source}
            token={route.params.token}
            onModified={onModified}
          />
        )}
      />
      <AddButton onPress={onAdd} />
    </View>
  );
}

export default TranslationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    justifyContent: "center",
    padding: 10,
  },
  modal: {
    backgroundColor: Colors.primary,
  },
  languageButton: {
    padding: 8,
    backgroundColor: Colors.secondary,
    borderRadius: 4,
    margin: 4,
  },
  languageText: {
    fontWeight: "bold",
    color: "white",
  },
});
