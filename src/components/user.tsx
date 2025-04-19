import { Users } from "@models";
import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";

export function User({ props }: { props: Users }) {
  const navigation = useNavigation<any>();
  return (
<View
  className="p-2"
>
  <Pressable
    className="flex-row items-center p-3 rounded-lg border border-secondary bg-secondary/10"
    android_ripple={{ color: 'rgba(255, 255, 255, 0.7' }}

    onPress={() => navigation.navigate("UserProfile", { name: props.name, login: props.login })}
  >
    <Text
      className="text-secondary font-bold text-lg"
    >
      @{props.login} - {props.name}
    </Text>
  </Pressable>
</View>
  );
}