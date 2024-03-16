import { useEffect, useState } from "react";
import { getAudio } from "../util/http";
import { Audio } from "expo-av";
import { Asset } from "expo-asset";

export function useSpeech(text: string, language: string) {
  const [mp3, setMp3] = useState([]);

  useEffect(() => {
    async function getLs() {}
    if (language) getLs();
  }, [language, text]);

  return async () => {
    if (!text || !language) {
      return;
    }

    getAudio(text, language)
      .then(async (resp) => {
        const { sound } = await Audio.Sound.createAsync({
          uri: `data:audio/wav;base64,${resp}`,
        });

        sound
          .playAsync()
          .then(() => console.log(`Playing in ${language}."`))
          .catch(() => {});
        sound.unloadAsync().catch(() => {});
      })
      .catch((err) => console.error(err));
  };
}
