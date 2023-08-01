import { Button, StyleSheet, View } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { Colors } from "../constants/colors";
import React from "react";
import { set } from "../store/token-context";
import { useDispatch } from "react-redux";

function LoginScreen({ route, navigation }) {
  const [request, response, prompAsync] = Google.useAuthRequest({
    androidClientId:
      "423797242227-il4co01numtjcj6tilb0vt66va6bp2qb.apps.googleusercontent.com",
    expoClientId:
      "423797242227-dfp9ujma0g4t0k6ru9l2n6oh7gm8i393.apps.googleusercontent.com",
    scopes: ["https://www.googleapis.com/auth/cloud-translation"],
  });

  function login() {
    prompAsync();
  }

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (response?.type === "success") {
      console.log(response.authentication.accessToken);
      dispatch(set(response.authentication.accessToken));
      navigation.navigate("Translator", {
        token: response.authentication.accessToken,
      });
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Button title="Sign in with google" onPress={login} />

      {/* <Button
        title="translate"
        onPress={translate.bind(this, "bonjour", "fr", "pt")}
      /> */}
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
    justifyContent: "center",
  },
});
