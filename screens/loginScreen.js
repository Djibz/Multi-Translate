import { Button, StyleSheet, View } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { Colors } from "../constants/colors";
import React, { useState } from "react";
import { set } from "../store/token-context";
import { useDispatch } from "react-redux";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { Text } from "react-native";

function LoginScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  const [request, response, prompAsync] = Google.useAuthRequest({
    androidClientId:
      "423797242227-il4co01numtjcj6tilb0vt66va6bp2qb.apps.googleusercontent.com",
    expoClientId:
      "423797242227-dfp9ujma0g4t0k6ru9l2n6oh7gm8i393.apps.googleusercontent.com",
    scopes: ["https://www.googleapis.com/auth/cloud-translation"],
    // redirectUri: `${AuthSession.makeRedirectUri({ useProxy: true })}`,
  });

  async function login() {
    setIsLoading(true);
    await prompAsync();
    setIsLoading(false);
  }

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (response && response.type === "success") {
      dispatch(set(response.authentication.accessToken));
      navigation.navigate("Translator");
    }
  }, [response]);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>Multi Translate</Text>
      <Text style={styles.text}>Login to use the Google Translate API</Text>
      <Button title="Sign in with google" onPress={login} />
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "space-around",
  },
  text: {
    color: "white",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
});
