import axios from "axios";

const baseUrl =
  "https://translation.googleapis.com/v3beta1/projects/423797242227";

export async function getAllLanguages(token) {
  console.log(`${new Date()} : Getting all Languages`);

  return axios
    .get(`${baseUrl}/supportedLanguages?displayLanguageCode=fr`, {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data.languages);

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
