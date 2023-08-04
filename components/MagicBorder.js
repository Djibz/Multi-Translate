import { StyleSheet, ImageBackground } from "react-native";
import { ProgressBar } from "react-native-paper";
import { Colors } from "../constants/colors";
import { useEffect, useRef } from "react";

export function MagicBorder({
  children,
  width,
  radius,
  image,
  style,
  loading,
}) {
  return (
    <>
      <ImageBackground
        resizeMode="stretch"
        source={image}
        style={[
          styles.border,
          style,
          {
            borderRadius: radius,
            padding: width,
          },
        ]}
      >
        {children}
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  border: {
    overflow: "hidden",
  },
  progressBar: {},
});
