import axios from "axios";

const baseUrl = "https://translation.googleapis.com/language/translate/v2";
const apiKey = "AIzaSyDrEee87JWu9LdRwCTLjvnUWuRhJasdqtM";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

async function getAllLanguages(mainLanguage: String) {
  return axios
    .get(`${baseUrl}/languages?target=${mainLanguage}&key=${apiKey}`, {
      headers,
    })
    .then((response) => {
      return response.data.data.languages;
    });
}

async function translate(
  text: string,
  source: string,
  target: string
): Promise<string> {
  if (source === target) return text;
  if (text === "") return text;

  const body = {
    q: [text],
    source: source,
    target: target,
    format: "text",
  };

  return axios
    .post(`${baseUrl}?key=${apiKey}`, body, { headers })
    .then((response) => {
      return response.data.data.translations[0].translatedText;
    });
}

async function getAudio(text: string, languageCode: string): Promise<string> {
  if (text === "") return text;

  const body = {
    input: { text },
    audioConfig: {
      audioEncoding: "MP3",
    },
    voice: { languageCode },
  };

  return axios
    .post(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
      body,
      { headers }
    )
    .then((response) => response)
    .then((error) => {
      console.error(error);
      return "";
    });
}

export { getAllLanguages, translate, getAudio };
