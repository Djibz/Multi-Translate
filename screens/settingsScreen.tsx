import { StyleSheet, Text, View } from "react-native";
import Switch from "../components/Switch";
import { useContext } from "react";
import { ThemeContext } from "../store/themeContext";
import CustomButton from "../components/Buttons/CustomButton";
import useLanguage from "../hooks/useLanguage";
import { useLanguages } from "../hooks/useLanguages";

function SettingsScreen() {
  const theme = useContext(ThemeContext);

  const mainLanguage = useLanguage();
  const languages = useLanguages(mainLanguage.code);

  const currentLanguage = languages.find(
    (l: any) => l.language === mainLanguage.code
  )?.name;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={{ color: theme.text, fontWeight: "bold" }}>
        Main Language
      </Text>
      <Text style={{ color: theme.text }}>
        {currentLanguage && currentLanguage}
      </Text>
      <CustomButton style={styles.button} text="Change Language" />
      <Text style={{ color: theme.text, fontWeight: "bold" }}>Theme</Text>
      <Switch />
    </View>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    paddingHorizontal: "10%",
  },
  button: {
    marginVertical: 8,
    height: 64,
    marginBottom: 32,
  },
});
