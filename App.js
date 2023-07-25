// Google Certificate Fingerprint:     03:8C:32:E9:73:CA:77:8D:40:B6:1A:86:05:C5:6D:74:05:FF:BF:38
//     Google Certificate Hash (SHA-1):    038C32E973CA778D40B61A8605C56D7405FFBF38
//     Google Certificate Hash (SHA-256):  223018D6040601BCCCC36F8DB776CB4BCAAB918953481B32CAFF1D85EF315037
//     Facebook Key Hash:                  A4wy6XPKd41AthqGBcVtdAX/vzg=

import { StatusBar } from "expo-status-bar";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TranslateCard } from "./components/TranslateCard";

import { GoogleSigninButton } from "@react-native-google-signin/google-signin";

const LANGUAGES = [
  { name: "français", code: "fr" },
  { name: "anglais", code: "gb" },
  { name: "portugais", code: "pt" },
];

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={this._signIn}
        disabled={this.state.isSigninInProgress}
      />
      <StatusBar style="light" />
      <FlatList
        contentContainerStyle={styles.list}
        style={{ width: "100%" }}
        data={LANGUAGES}
        renderItem={(item) => <TranslateCard item={item.item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
