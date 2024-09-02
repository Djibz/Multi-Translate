import { StyleSheet, Text, TextInput, ToastAndroid, View } from "react-native";
import { MagicBorder } from "./MagicBorder";
import { useContext, useEffect, useState } from "react";
import { translate } from "../util/http";
import ClearButton from "./Buttons/ClearButton";
import { ThemeContext } from "../Contexts/themeContext";
import { useSpeech } from "../hooks/useSpeech";
import IconTextButton from "./Buttons/IconTextButton";
import * as Clipboard from "expo-clipboard";
import LanguageFlagMap from '../constants/LanguageFlagMap'

let wait = null;

export function TranslateCard({
  item,
  sourceSentence,
  sourceLanguage,
  onModified,
  deleteItem,
  counter,
}) {
  const [loading, setLoading] = useState(false);
  const [passed, setPassed] = useState(false);
  const [sentence, setSentence] = useState("");

  const theme = useContext(ThemeContext);

  const playAudio = useSpeech(sentence, item.language);

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

  async function toClipBoard() {
    return Clipboard.setStringAsync(sentence);
  }

  useEffect(() => {
    async function translateText() {
      if (sourceLanguage === item.language) {
        setSentence(sourceSentence);
        return;
      }

      setLoading(true);
      try {
        const text = await translate(
          sourceSentence,
          sourceLanguage,
          item.language
        );
        setSentence(text);
      } catch (error) {
        console.error(error.toJSON());
      }

      setLoading(false);
    }

    translateText();
  }, [sourceSentence, sourceLanguage, counter]);

  const flag_code = LanguageFlagMap[item.language] ?? item.language;

  return (
    <View style={styles.mainContainer}>
      <MagicBorder
        radius={8}
        width={4}
        image={{
          uri: `https://flagcdn.com/h240/${
            flag_code
          }.png`,
        }}
        loading={loading}
      >
        <View style={[styles.card, { backgroundColor: theme.secondary }]}>
          <View style={styles.topContainer}>
            <Text style={[styles.text, { color: theme.text }]}>
              {item.name}
            </Text>
            <View style={styles.buttonsContainer}>
              <IconTextButton
                name="volume-high"
                onPress={playAudio}
                onDone={() => ToastAndroid.show("Playing", ToastAndroid.LONG)}
                doneDuration={1500}
                disabled={!item.speech}
              />
              <IconTextButton
                name="copy"
                onPress={toClipBoard}
                onDone={() => ToastAndroid.show("Copied", ToastAndroid.SHORT)}
                doneDuration={1000}
                style={{ marginHorizontal: 4 }}
              />
              <IconTextButton
                name="trash"
                color="#eb4034"
                onPress={deleteItem}
                onDone={() =>
                  ToastAndroid.show("Deleted language", ToastAndroid.SHORT)
                }
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Type here..."
              placeholderTextColor="#777777"
              removeClippedSubviews={true}
              style={[
                styles.input,
                { backgroundColor: theme.thirdly, color: theme.text },
              ]}
              onChangeText={onChange}
              value={sentence}
              disableFullscreenUI={true}
            />
            <ClearButton
              style={styles.clearButton}
              size={24}
              onPress={() => onChange("")}
              color={theme.text}
            />
          </View>
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
    padding: 8,
    height: 104,
    width: "100%",
    borderRadius: 8,
    elevation: 1,
  },
  text: {
    fontWeight: "bold",
  },
  inputContainer: {
    width: "100%",
    justifyContent: "center",
  },
  input: {
    borderRadius: 8,
    padding: 8,
    paddingHorizontal: 8,
    overflow: "hidden",
    minHeight: 48,
    paddingRight: 48,
    elevation: 4,
  },
  topContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  clearButton: {
    position: "absolute",
    alignSelf: "flex-end",
    padding: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});
