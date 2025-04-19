import { View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

export function Icon({ icon, color }: any){
  return (
    <View className="flex-row items-center" >
      <FontAwesome
        name={icon}
        size={32}
        color={color}
        className="ml-auto"
      />
    </View>
  );
}