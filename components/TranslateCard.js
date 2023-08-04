import { StyleSheet, Text, TextInput, View } from "react-native";
import { MagicBorder } from "./MagicBorder";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { translate } from "../util/http";
import { ProgressBar } from "react-native-paper";

let wait = null;

export function TranslateCard({
  item,
  sourceSentence,
  sourceLanguage,
  onModified,
}) {
  const [loading, setLoading] = useState(true);
  const [passed, setPassed] = useState(false);
  const [sentence, setSentence] = useState("");
  // const [wait, setWait] = useState(null);

  console.log(`Rendering ${item.name}`);

  if (passed) {
    setPassed(false);
    onModified(sentence, item.language);
  }

  function onChange(text) {
    clearTimeout(wait);
    setSentence(text);
    setPassed(false);

    wait = setTimeout(() => {
      console.log(sentence);
      setPassed(true);
    }, 500);
  }

  useEffect(() => {
    async function translateText() {
      if (sourceLanguage === item.language) return;
      console.log(`Translating ${item.name}`);

      setLoading(true);
      try {
        const text = await translate(
          sourceSentence,
          sourceLanguage,
          item.language
        );
        setSentence(text);
      } catch (error) {
        console.log(error.toJSON());
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
      >
        <View style={styles.card}>
          <Text style={styles.text}>{item.name}</Text>
          {loading && (
            <ProgressBar
              style={[{ borderRadius: 4 }]}
              styleAttr="Horizontal"
              indeterminate={true}
              color={Colors.thirdly}
            />
          )}
          <TextInput
            removeClippedSubviews={true}
            style={styles.input}
            onChangeText={onChange}
            value={sentence}
            disableFullscreenUI={true}
            autoFocus={true}
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
    padding: 10,
    height: 100,
    width: "100%",
    borderRadius: 4,
  },
  text: {
    flex: 1,
    color: "white",
  },
  input: {
    borderRadius: 4,
    padding: 4,
    overflow: "hidden",
    backgroundColor: "#40444b",
    color: "white",
  },
});
