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
