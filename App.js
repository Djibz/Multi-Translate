import * as React from "react";

import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TranslationScreen from "./screens/translationScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Provider } from "react-redux";
import LanguagesScreen from "./screens/languagesScreen";
import { store } from "./store/store";
import { DarkTheme, LightTheme } from "./constants/colors";

import Icon from "react-native-vector-icons/Ionicons";
import SettingsScreen from "./screens/settingsScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingOverlay from "./components/UI/LoadingOverlay";
import { useColorScheme } from "react-native";
import { ThemeContext } from "./store/themeContext";
import { SetThemeContext } from "./store/setThemeContext";

export default function App() {
  const [theme, setTheme] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  let count = 0;

  const Stack = createNativeStackNavigator();

  const t = useColorScheme();
  let currentTheme = theme === "auto" ? t : theme;
  const myTheme = currentTheme === "light" ? LightTheme : DarkTheme;

  function Mains() {
    const Tab = createMaterialBottomTabNavigator();
    return (
      <ThemeContext.Provider value={myTheme}>
        <SetThemeContext.Provider value={setTheme}>
          <Provider store={store}>
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
                    />
                  ),
                }}
              />
            </Tab.Navigator>
          </Provider>
        </SetThemeContext.Provider>
      </ThemeContext.Provider>
    );
  }

  React.useEffect(() => {
    async function getTheme() {
      setLoading(true);
      try {
        const t = await AsyncStorage.getItem("theme");

        if (!t) {
          AsyncStorage.setItem("theme", "auto");
          t = "auto";
        }

        setTheme(t);
      } catch (err) {
        console.log(err);
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

  return (
    <>
      <StatusBar style={barTheme[theme]} />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
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
