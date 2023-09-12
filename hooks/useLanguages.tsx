import { useEffect, useState } from "react";
import { getAllLanguages } from "../util/http";
import useLanguage from "./useLanguage";

export function useLanguages() {
  const [languages, setLanguages] = useState([]);

  const { code } = useLanguage();

  useEffect(() => {
    async function getLs() {
      console.log(`${new Date()} : Getting all ${code} Languages`);

      getAllLanguages(code)
        .then((resp) => setLanguages(resp))
        .catch((err) => console.error(err.request));
    }
    if (code !== null) getLs();
  }, [code]);

  return languages;
}
