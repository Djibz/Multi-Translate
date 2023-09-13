import { useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import { ThemeContext } from "../Contexts/themeContext";

function LoadingScreen({ message }) {
  const theme = useContext(ThemeContext);

  const white = require("../logo/white/white.png");
  const black = require("../logo/black/png.png");

  return (
    <View style={{ ...styles.container, backgroundColor: theme.background }}>
      <Image
        source={theme.text === "#ffffff" ? white : black}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={{ ...styles.message, color: theme.text }}>{message}</Text>
      <ActivityIndicator size="large" color={theme.text} />
    </View>
  );
}

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  message: {
    color: "white",
    marginVertical: 24,
  },
  logo: {
    height: 100,
  },
});
