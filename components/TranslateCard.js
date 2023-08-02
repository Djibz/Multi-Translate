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
    onModified(sentence, item.languageCode);
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
        "https://translation.googleapis.com/v3beta1/projects/423797242227:translateText",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [text],
            sourceLanguageCode: source,
            targetLanguageCode: target,
          }),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          setSentence(json.translations[0].translatedText);
        })
        .catch((error) => {
          setSentence("");
        });
    }

    setLoading(true);
    translate(sourceSentence, sourceLanguage, item.languageCode, token);
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
        image={{ uri: `https://flagcdn.com/h240/${item.languageCode}.png` }}
      >
        <View style={styles.card}>
          <Text style={styles.text}>{item.displayName}</Text>
          <TextInput
            removeClippedSubviews={false}
            style={styles.input}
            onChangeText={onChange}
            value={sentence}
            disableFullscreenUI={true}
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
