import { StyleSheet, Text, TextInput, View } from "react-native";
import { MagicBorder } from "./MagicBorder";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { translate } from "../util/http";
import { IconButton, ProgressBar } from "react-native-paper";
import RoundIconButton from "./RoundIconButton";

let wait = null;

export function TranslateCard({
  item,
  sourceSentence,
  sourceLanguage,
  onModified,
  deleteItem,
}) {
  const [loading, setLoading] = useState(false);
  const [passed, setPassed] = useState(false);
  const [sentence, setSentence] = useState("");

  if (passed) {
    setPassed(false);
    onModified(sentence, item.language);
  }

  function onChange(text) {
    clearTimeout(wait);
    setSentence(text);
    setPassed(false);

    wait = setTimeout(() => {
      setPassed(true);
    }, 500);
  }

  useEffect(() => {
    async function translateText() {
      if (sourceLanguage === item.language) return;

      setLoading(true);
      try {
        const text = await translate(
          sourceSentence,
          sourceLanguage,
          item.language
        );
        setSentence(text);
      } catch (error) {
        // console.log(error.toJSON());
      }

      setLoading(false);
    }

    translateText();
  }, [sourceSentence, sourceLanguage]);

  return (
    <View style={styles.mainContainer}>
      <MagicBorder
        radius={4}
        width={4}
        image={{
          uri: `https://flagcdn.com/h240/${
            item.language === "en" ? "gb" : item.language
          }.png`,
        }}
        loading={loading}
      >
        <View style={styles.card}>
          <View style={styles.topContainer}>
            <Text style={styles.text}>{item.name}</Text>
            <RoundIconButton
              name="close"
              color={Colors.thirdly}
              iconColor={Colors.secondary}
              style={styles.button}
              onPress={deleteItem}
            />
          </View>
          <TextInput
            removeClippedSubviews={true}
            style={styles.input}
            onChangeText={onChange}
            value={sentence}
            disableFullscreenUI={true}
            autoFocus={true}
            showSoftInputOnFocus={false}
          />
        </View>
      </MagicBorder>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 10,
    elevation: 7,
  },
  card: {
    backgroundColor: Colors.secondary,
    padding: 8,
    height: 100,
    width: "100%",
    borderRadius: 4,
  },
  text: {
    flex: 1,
    color: "white",
    fontWeight: "bold",
  },
  input: {
    borderRadius: 4,
    padding: 4,
    overflow: "hidden",
    // backgroundColor: "#40444b",
    backgroundColor: Colors.thirdly,
    color: "white",
  },
  topContainer: {
    flex: 1,
    flexDirection: "row",
  },
});
