import { Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

function ClearButton({ size, ...props }) {
  return (
    <Pressable {...props}>
      <Icon name="close-outline" color="white" size={size} />
    </Pressable>
  );
}

export default ClearButton;
