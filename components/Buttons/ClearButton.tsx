import { Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

function ClearButton({ size, color, ...props }) {
  return (
    <Pressable {...props}>
      <Icon name="close-outline" color={color} size={size} />
    </Pressable>
  );
}

export default ClearButton;
