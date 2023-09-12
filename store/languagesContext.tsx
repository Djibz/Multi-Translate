import { createContext, useContext, useEffect, useState } from "react";
import { Language } from "../models/language";
import { LanguageContext } from "./languageContext";
import { useLanguages } from "../hooks/useLanguages";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { translate } from "../util/http";
import LoadingScreen from "../screens/loadingScreen";

const LanguagesContext = createContext<{
  languages: Language[];
  favorite: (language: string) => void;
  select: (language: string) => void;
}>(null);

function LanguagesProvider({ children }) {
  const { language } = useContext(LanguageContext);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const baseLanguages = useLanguages(language);

  useEffect(() => {
    async function process() {
      setLoading(true);
      const activated = (await AsyncStorage.getItem("activated")) ?? "";
      const favorites = (await AsyncStorage.getItem("favorites")) ?? "";

      const languages = [...baseLanguages];

      languages.map((element) => {
        if (activated.split(",").includes(element.language)) {
          element["activated"] = true;
        }
        if (favorites.split(",").includes(element.language)) {
          element["favorite"] = true;
        }
      });

      await Promise.all(
        languages.map(async (l: Language) => {
          const translated = await translate(l.name, language, l.language);
          l["nameInLanguage"] = translated;
        })
      );

      setLanguages(languages);
      setLoading(false);
    }

    process();
  }, [baseLanguages]);

  function favorite(languageCode: string) {
    const found = languages.find((l) => l.language === languageCode);
    found.favorite = !found.favorite;
    setFavorites((curr) => {
      if (found.favorite) {
        return [...curr, found.language];
      } else {
        return curr.filter((code) => code !== found.language);
      }
    });

    AsyncStorage.setItem(
      "favorites",
      languages
        .filter((l: Language) => l.favorite)
        .map((l: Language) => l.language)
        .toString()
    );
  }

  function select(languageCode: string) {
    const found = languages.find((l) => l.language === languageCode);
    found.activated = !found.activated;

    AsyncStorage.setItem(
      "activated",
      languages
        .filter((l: Language) => l.activated)
        .map((l: Language) => l.language)
        .toString()
    );
  }

  const values = {
    languages,
    favorite,
    select,
  };

  if (loading || !baseLanguages) {
    return <LoadingScreen message="Loading Languages" />;
  }

  console.log(languages.length);

  return (
    <LanguagesContext.Provider value={values}>
      {children}
    </LanguagesContext.Provider>
  );
}

export default LanguagesContext;
export { LanguagesProvider };
