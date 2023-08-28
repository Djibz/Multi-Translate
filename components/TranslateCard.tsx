import { StyleSheet, Text, TextInput, View } from "react-native";
import { MagicBorder } from "./MagicBorder";
import { useContext, useEffect, useState } from "react";
import { translate } from "../util/http";
import RoundIconButton from "./Buttons/RoundIconButton";
import ClearButton from "./Buttons/ClearButton";
import { ThemeContext } from "../store/themeContext";

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

  const theme = useContext(ThemeContext);

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
        <View style={[styles.card, { backgroundColor: theme.secondary }]}>
          <View style={styles.topContainer}>
            <Text style={[styles.text, { color: theme.text }]}>
              {item.name}
            </Text>
            <RoundIconButton
              name="trash"
              color="#00000000"
              iconColor={theme.delete}
              onPress={deleteItem}
            />
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
              autoFocus={true}
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
    height: 100,
    width: "100%",
    borderRadius: 4,
    elevation: 1,
  },
  text: {
    flex: 1,
    fontWeight: "bold",
  },
  inputContainer: {
    width: "100%",
    justifyContent: "center",
  },
  input: {
    borderRadius: 4,
    padding: 4,
    paddingHorizontal: 8,
    overflow: "hidden",
    minHeight: 48,
    paddingRight: 48,
    elevation: 2,
  },
  topContainer: {
    flex: 1,
    flexDirection: "row",
  },
  clearButton: {
    position: "absolute",
    alignSelf: "flex-end",
    padding: 12,
  },
});
