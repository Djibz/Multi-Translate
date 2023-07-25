import { StyleSheet, ImageBackground } from "react-native";

export function MagicBorder({ children, width, radius, image, style }) {
  return (
    <ImageBackground
      resizeMode="stretch"
      source={image}
      style={[styles.border, style, { borderRadius: radius, padding: width }]}
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  border: {
    overflow: "hidden",
  },
});
