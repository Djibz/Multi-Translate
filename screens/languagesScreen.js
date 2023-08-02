import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLanguages } from "../util/http";
import { setLanguages } from "../store/languages-context";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import LanguageCard from "../components/LanguageCard";
import { current } from "@reduxjs/toolkit";

function LanguagesScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [lCount, setLCount] = useState(0);
  // const { setCount } = route.params;

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

  const languages = useSelector((state) => {
    return state.languages.languages;
  });

  if (isLoading) {
    return <LoadingOverlay />;
  }

  function onClick(index) {
    if (languages[index].activated) {
      // setCount();
      setLCount((current) => current - 1);
      languages[index].activated = false;
    } else {
      // setCount();
      setLCount((current) => current + 1);
      languages[index].activated = true;
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.modal}
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
