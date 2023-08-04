import axios from "axios";

const baseUrl = "https://translation.googleapis.com/language/translate/v2";

export async function getAllLanguages(token) {
  console.log(`${new Date()} : Getting all Languages`);

  return axios
    .get(
      `${baseUrl}/languages?target=fr&key=AIzaSyAGGja7ddfN6KLXwIQWO1A1b41ruRWDF-4`,
      {
        headers: {
          // Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      return response.data.data.languages;
    });

  return fetch(baseUrl + "/supportedLanguages?displayLanguageCode=fr", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((json) => {
      return json.languages;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}
