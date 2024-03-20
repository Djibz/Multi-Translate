import { StyleSheet, ImageBackground, View } from "react-native";
import { ProgressBar } from "react-native-paper";

export function MagicBorder({
  children,
  width,
  radius,
  image,
  style = null,
  loading = false,
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
            color={"#ffffff70"}
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
    height: 148,
  },
  progressBar: {
    height: 148,
    position: "absolute",
    backgroundColor: "#00000000",
  },
});
