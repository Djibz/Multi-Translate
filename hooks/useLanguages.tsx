import { useEffect, useState } from "react";
import { getAllLanguages } from "../util/http";

export function useLanguages(language: string) {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    async function getLs() {
      console.log(`${new Date()} : Getting all ${language} Languages`);

      getAllLanguages(language)
        .then((resp) => setLanguages(resp))
        .catch((err) => console.error(err.request));
    }
    if (language) getLs();
  }, [language]);

  return languages;
}
