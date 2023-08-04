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
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Provider } from "react-redux";
import LanguagesScreen from "./screens/languagesScreen";
import { store } from "./store/store";
import { Colors } from "./constants/colors";

import Icon from "react-native-vector-icons/Ionicons";

export default function App() {
  const [userInfo, setUserInfo] = React.useState(null);

  let count = 0;

  const Stack = createNativeStackNavigator();
  const Tab = createMaterialBottomTabNavigator();

  function Mains() {
    return (
      <Provider store={store}>
        <Tab.Navigator
          activeColor="white"
          shifting={true}
          barStyle={{ backgroundColor: Colors.secondary }}
        >
          <Tab.Screen
            name="Languages"
            component={LanguagesScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <Icon
                  name="planet-outline"
                  color={focused ? "black" : "white"}
                  size={26}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Translators"
            component={TranslationScreen}
            initialParams={{ count: count }}
            options={{
              tabBarIcon: ({ focused }) => (
                <Icon
                  name="language-outline"
                  color={focused ? "black" : "white"}
                  size={26}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </Provider>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            {/* <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            /> */}

            <Stack.Screen
              name="Translator"
              component={Mains}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}
