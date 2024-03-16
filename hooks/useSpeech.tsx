import { useEffect, useState } from "react";
import { getAudio } from "../util/http";
import { Audio } from "expo-av";

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

    return getAudio(text, language)
      .then(async (resp) => {
        return Audio.Sound.createAsync({
          uri: `data:audio/wav;base64,${resp}`,
        })
          .then((sound) =>
            sound.sound
              .playAsync()
              .then(() => {
                console.log(`Playing in '${language}'.`);
              })
              .catch(() => {})
          )
          .catch(() => {});
      })
      .catch((err) => console.error(err));
  };
}
