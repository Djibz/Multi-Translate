import { useEffect, useState } from "react";
import { getAllLanguages } from "../util/http";

export function useLanguages(code: string) {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    async function getLs() {
      getAllLanguages(code)
        .then((resp) => setLanguages(resp))
        .catch((err) => console.error(err.request));
    }
    if (code !== null) getLs();
  }, [code]);

  return languages;
}
