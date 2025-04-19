import { colors } from "@constants";
import { api } from "@services";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { Button, Input } from "@components";

export function NewPost() {
  const navigation = useNavigation<any>();
  const [message, setMessage] = useState("");

  async function handlerNewPost() {
    try {
      if (!message.trim()) {
        return Alert.alert("Publicação", "Preencha o campo com a sua postagem.");
      }

      const response = await api.post(`/posts`, { post: { message: message } });

      if (response.status == 201) {
        Alert.alert("Publicação", "Publicação realizada com sucesso!", [
          { text: "OK", onPress: () => {
              setMessage("");
              navigation.navigate("Feed");
            }
          },
        ]);
      }
     
    } catch (error) {
      Alert.alert("Publicação", "Não foi possível realizar a sua publicação.");
    }
  }

  return (
    <View className="flex-1 bg-primary p-4 pt-9">
      <View className="flex-row my-4 justify-between items-center">
        <Pressable
          onPress={() => navigation.navigate("PrivateDrawerRoutes")}
        >
          <Text className="text-lg text-secondary">Cancelar</Text>
        </Pressable>

        <Button.Root.Redirect onPress={handlerNewPost} >
          <Button.Content.Redirect title="Postar" />
        </Button.Root.Redirect>
      </View>

      <View className="flex-row items-center">
        <Input.Content.Field
          placeholder="O que está na sua mente ?"
          multiline
          numberOfLines={5}
          value={message}
          onChangeText={setMessage}
        />
      </View>
    </View>
  );
}
