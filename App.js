// Google Certificate Fingerprint:     03:8C:32:E9:73:CA:77:8D:40:B6:1A:86:05:C5:6D:74:05:FF:BF:38
//     Google Certificate Hash (SHA-1):    038C32E973CA778D40B61A8605C56D7405FFBF38
//     Google Certificate Hash (SHA-256):  223018D6040601BCCCC36F8DB776CB4BCAAB918953481B32CAFF1D85EF315037
//     Facebook Key Hash:                  A4wy6XPKd41AthqGBcVtdAX/vzg=

// ID : 423797242227-il4co01numtjcj6tilb0vt66va6bp2qb.apps.googleusercontent.com

import * as React from "react";

import { StatusBar } from "expo-status-bar";
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TranslateCard } from "./components/TranslateCard";

import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LANGUAGES = [
  { name: "français", code: "fr" },
  { name: "anglais", code: "gb" },
  { name: "portugais", code: "pt" },
];

export default function App() {
  const [userInfo, setUserInfo] = React.useState(null);
  const [request, response, prompAsync] = Google.useAuthRequest({
    androidClientId:
      "423797242227-il4co01numtjcj6tilb0vt66va6bp2qb.apps.googleusercontent.com",
    expoClientId:
      "423797242227-dfp9ujma0g4t0k6ru9l2n6oh7gm8i393.apps.googleusercontent.com",
    scopes: ["https://www.googleapis.com/auth/cloud-translation"]
  });

  function okdac() {
    prompAsync();
    
  }

  React.useEffect(() => {
    console.log("Google Sign In request:", request);
    console.log("Google Sign In Response:", response);
  }, [response, request]);

  function translate(text, source, target) {
    console.log(response.authentication.accessToken);
    fetch("https://translation.googleapis.com/v3beta1/projects/423797242227:translateText", {
      method: "POST",
      headers: {
        Authorization: 'Bearer ' + response.authentication.accessToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          text
        ],
        sourceLanguageCode: source,
        targetLanguageCode: target
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Button title="Sign in with google" onPress={okdac} />
      <FlatList
        contentContainerStyle={styles.list}
        style={{ width: "100%" }}
        data={LANGUAGES}
        renderItem={(item) => <TranslateCard item={item.item} />}
      />
      <Button title='translate' onPress={translate.bind(this, 'bonjour', 'fr', 'pt')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: "#292b2f",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
});
