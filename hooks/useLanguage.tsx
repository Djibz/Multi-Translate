import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { NativeModules } from "react-native";

const locale = NativeModules.I18nManager.localeIdentifier.split("_")[0];

function useLanguage() {
  const [storedLanguage, setStoredLanguage] = useState(locale);
  const [language, setLanguage] = useState({ code: locale });

  async function getStored() {
    setStoredLanguage((await AsyncStorage.getItem("mainLanguage")) ?? locale);
  }
  getStored();

  useEffect(() => {
    async function getL() {
      const l = storedLanguage ?? locale;

      setLanguage({
        code: l,
      });
    }

    getL();
  }, [storedLanguage]);

  return language;
}

export default useLanguage;
