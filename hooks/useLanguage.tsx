import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { NativeModules } from "react-native";

const locale = NativeModules.I18nManager.localeIdentifier.split("_")[0];

function useLanguage() {
  const [language, setLanguage] = useState({ code: locale });

  useEffect(() => {
    async function getL() {
      const l = (await AsyncStorage.getItem("mainLanguage")) ?? locale;

      setLanguage({
        code: l,
      });
    }

    getL();
  }, []);

  return language;
}

export default useLanguage;
