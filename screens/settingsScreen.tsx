import { StyleSheet, Text, View } from "react-native";
import Switch from "../components/Switch";
import { useContext, useState } from "react";
import { ThemeContext } from "../Contexts/themeContext";
import CustomButton from "../components/Buttons/CustomButton";
import LanguagesModal from "../components/Modal/LanguagesModal";
import { LanguageContext } from "../Contexts/languageContext";
import LanguagesContext from "../Contexts/languagesContext";

function SettingsScreen({ navigation }) {
  const theme = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);

  const lContext = useContext(LanguageContext);
  const { languages } = useContext(LanguagesContext);
  const mainLanguage = lContext.language;

  const currentLanguage = languages.find(
    (l: any) => l.language === mainLanguage
  )?.name;

  function setMainLanguage(language: string) {
    lContext.setLanguage(language);
    setModalVisible(false);
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <LanguagesModal
        visible={modalVisible}
        languages={languages}
        onPress={setMainLanguage}
        current={mainLanguage}
      />
      <Text style={{ color: theme.text, fontWeight: "bold" }}>
        Main Language
      </Text>
      <Text style={{ color: theme.text }}>
        {currentLanguage && currentLanguage}
      </Text>
      <CustomButton
        style={styles.button}
        text="Change Language"
        onPress={() => setModalVisible(true)}
      />
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
