import { useEffect, useState } from "react";
import { getVoices } from "../util/http";

export function useVoices() {
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    async function getVs() {
      console.log(`${new Date()} : Getting all Voices`);

      getVoices()
        .then((resp) => setVoices(resp))
        .catch((err) => console.error(err.request));
    }
    getVs();
  }, []);

  return voices;
}
