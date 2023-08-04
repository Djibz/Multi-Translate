import { StyleSheet, Text, TextInput, View } from "react-native";
import { MagicBorder } from "./MagicBorder";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";

export function TranslateCard({
  item,
  sourceSentence,
  sourceLanguage,
  token,
  onModified,
}) {
  const [loading, setLoading] = useState(true);
  const [passed, setPassed] = useState(false);
  const [sentence, setSentence] = useState("");
  const [wait, setWait] = useState(null);

  if (passed) {
    setPassed(false);
    onModified(sentence, item.language);
  }

  function onChange(text) {
    clearTimeout(wait);
    setSentence(text);
    setPassed(false);

    setWait(
      setTimeout(() => {
        console.log(sentence);
        setPassed(true);
      }, 1500)
    );
  }

  useEffect(() => {
    async function translate(text, source, target, token) {
      if (source === target) {
        setSentence(text);
        return;
      }

      return await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=AIzaSyAGGja7ddfN6KLXwIQWO1A1b41ruRWDF-4&target=${target}&source=${source}`,
        {
          method: "POST",
          headers: {
            // Authorization: "Bearer " + token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            q: [text, "Monsieur"],
            source: source,
            target: target,
            format: "text",
          }),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          console.log(json.data);
          setSentence(json.data.translations[0].translatedText);
        })
        .catch((error) => {
          setSentence("");
        });
    }

    setLoading(true);
    translate(sourceSentence, sourceLanguage, item.language, token);
    setLoading(false);
  }, [sourceSentence, sourceLanguage]);

  if (loading) {
    return <></>;
  }

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
