import { StyleSheet, Text, View } from "react-native";
import Switch from "../components/Switch";
import { useContext, useState } from "react";
import { ThemeContext } from "../store/themeContext";
import CustomButton from "../components/Buttons/CustomButton";
import useLanguage from "../hooks/useLanguage";
import { useLanguages } from "../hooks/useLanguages";
import LanguagesModal from "../components/Modal/LanguagesModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

function SettingsScreen({ navigation }) {
  console.log("render settings");
  const theme = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);

  const mainLanguage = useLanguage();
  const languages = useLanguages();

  const currentLanguage = languages.find(
    (l: any) => l.language === mainLanguage.code
  )?.name;

  function setMainLanguage(language: string) {
    AsyncStorage.setItem("mainLanguage", language);
    setModalVisible(false);
    navigation.navigate("Languages", { reload: true });
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
