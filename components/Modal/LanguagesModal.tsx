import { FlatList, Modal, StyleSheet, Text, View } from "react-native";
import CustomButton from "../Buttons/CustomButton";
import { useContext } from "react";
import { ThemeContext } from "../../Contexts/themeContext";
import RoundIconButton from "../Buttons/RoundIconButton";

function LanguagesModal({ visible, languages, onPress, current }) {
  const theme = useContext(ThemeContext);

  return (
    <Modal visible={visible} animationType="slide">
      <View style={[styles.header, { backgroundColor: theme.secondary }]}>
        <RoundIconButton
          size={40}
          name="arrow-back-outline"
          color="#00000000"
          iconColor={theme.text}
          onPress={() => {
            onPress(current);
          }}
        />
        <Text style={{ color: theme.text, marginLeft: 32 }}>
          Pick your Language
        </Text>
      </View>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <FlatList
          data={languages}
          renderItem={(item) => (
            <CustomButton
              style={styles.button}
              text={`${item.item.name}\n${item.item.nameInLanguage}`}
              activated={item.item.language === current}
              onPress={() => onPress(item.item.language)}
            />
          )}
          style={{ marginBottom: 16 }}
          contentContainerStyle={{ marginTop: 4 }}
        />
      </View>
    </Modal>
  );
}

export default LanguagesModal;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  header: {
    height: 56,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  button: {
    marginVertical: 4,
  },
});
