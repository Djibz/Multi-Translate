import axios from "axios";

const baseUrl = "https://translation.googleapis.com/language/translate/v2";
const apiKey = "AIzaSyDrEee87JWu9LdRwCTLjvnUWuRhJasdqtM";

export async function getAllLanguages() {
  // console.log(`${new Date()} : Getting all Languages`);

  return axios
    .get(`${baseUrl}/languages?target=en&key=${apiKey}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data.data.languages;
    });
}

export async function translate(text, source, target) {
  if (source === target) {
    return text;
  }

  if (text === "") {
    return text;
  }

  return axios
    .post(
      `${baseUrl}?key=${apiKey}`,
      {
        q: [text, "Monsieur"],
        source: source,
        target: target,
        format: "text",
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      return response.data.data.translations[0].translatedText;
    });
}