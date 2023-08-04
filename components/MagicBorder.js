import { StyleSheet, ImageBackground, View } from "react-native";
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
        style={[styles.border, style, { borderRadius: radius }]}
      >
        {
          <ProgressBar
            style={[styles.progressBar, { borderRadius: radius }]}
            progress={loading ? 1 : 0}
            indeterminate={false}
            color={"white"}
          />
        }
        <View style={{ margin: width }}>{children}</View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  border: {
    overflow: "hidden",
    height: 108,
  },
  progressBar: {
    height: 108,
    position: "absolute",
    backgroundColor: "#00000000",
  },
});
