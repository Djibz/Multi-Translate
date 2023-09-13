import * as React from "react";

import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TranslationScreen from "./screens/translationScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import LanguagesScreen from "./screens/languagesScreen";
import { DarkTheme, LightTheme } from "./constants/colors";

import Icon from "react-native-vector-icons/Ionicons";
import SettingsScreen from "./screens/settingsScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingOverlay from "./components/UI/LoadingOverlay";
import { StyleSheet, useColorScheme } from "react-native";
import { ThemeContext } from "./Contexts/themeContext";
import { SetThemeContext } from "./Contexts/setThemeContext";
import { LanguageContext } from "./Contexts/languageContext";
import { NativeModules } from "react-native";
import { LanguagesProvider } from "./Contexts/languagesContext";

const locale = NativeModules.I18nManager.localeIdentifier.split("_")[0];

export default function App() {
  const [theme, setTheme] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [language, setLanguage] = React.useState("");

  let count = 0;

  const Stack = createNativeStackNavigator();

  const t = useColorScheme();
  let currentTheme = theme === "auto" ? t : theme;
  const myTheme = currentTheme === "light" ? LightTheme : DarkTheme;

  function Mains() {
    const Tab = createMaterialBottomTabNavigator();
    return (
      <Tab.Navigator
        activeColor={myTheme.text}
        shifting={true}
        barStyle={{ backgroundColor: myTheme.secondary, elevation: 4 }}
      >
        <Tab.Screen
          name="Languages"
          component={LanguagesScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon
                name="planet-outline"
                color={focused ? myTheme.focused : myTheme.text}
                size={26}
                style={styles.tabIcon}
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
                color={focused ? myTheme.focused : myTheme.text}
                size={26}
                style={styles.tabIcon}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon
                name="settings-outline"
                color={focused ? myTheme.focused : myTheme.text}
                size={26}
                style={styles.tabIcon}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  React.useEffect(() => {
    async function getTheme() {
      setLoading(true);
      try {
        let t = await AsyncStorage.getItem("theme");
        let l = (await AsyncStorage.getItem("mainLanguage")) ?? locale;

        if (!t) {
          AsyncStorage.setItem("theme", "auto");
          t = "auto";
        }

        if (!l) {
          AsyncStorage.setItem("mainLanguage", locale);
          l = locale;
        }

        setLanguage(l);
        setTheme(t);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }

    getTheme();
  }, []);

  if (loading) {
    return <LoadingOverlay />;
  }

  const barTheme = {
    dark: "light",
    light: "dark",
    auto: "auto",
  };

  async function onChangeLanguage(language: string) {
    setLanguage(language);
    AsyncStorage.setItem("mainLanguage", language);
  }

  return (
    <>
      <StatusBar style={barTheme[theme]} />
      <LanguageContext.Provider
        value={{ language, setLanguage: onChangeLanguage }}
      >
        <ThemeContext.Provider value={myTheme}>
          <SetThemeContext.Provider value={setTheme}>
            <LanguagesProvider>
              <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen
                    name="Translator"
                    component={Mains}
                    options={{ headerShown: false }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </LanguagesProvider>
          </SetThemeContext.Provider>
        </ThemeContext.Provider>
      </LanguageContext.Provider>
    </>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: -1.5,
  },
});
