// Google Certificate Fingerprint:     03:8C:32:E9:73:CA:77:8D:40:B6:1A:86:05:C5:6D:74:05:FF:BF:38
//     Google Certificate Hash (SHA-1):    038C32E973CA778D40B61A8605C56D7405FFBF38
//     Google Certificate Hash (SHA-256):  223018D6040601BCCCC36F8DB776CB4BCAAB918953481B32CAFF1D85EF315037
//     Facebook Key Hash:                  A4wy6XPKd41AthqGBcVtdAX/vzg=

// ID : 423797242227-il4co01numtjcj6tilb0vt66va6bp2qb.apps.googleusercontent.com

import * as React from "react";

import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AsyncStorage from "@react-native-async-storage/async-storage";
import TranslationScreen from "./screens/translationScreen";
import LoginScreen from "./screens/loginScreen";

const LANGUAGES = [
  { name: "français", code: "fr" },
  { name: "anglais", code: "gb" },
  { name: "portugais", code: "pt" },
];

export default function App() {
  const [userInfo, setUserInfo] = React.useState(null);

  const Stack = createNativeStackNavigator();

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Translator"
            component={TranslationScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
