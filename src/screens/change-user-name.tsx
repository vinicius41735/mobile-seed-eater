import { useState } from 'react';
import { Alert, Image, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Button, Input } from '@components';
import { useAuth } from '@contexts';
import { api } from '@services';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function ChangeUserName() {
  const [userName, setUserName] = useState("");
  const { clear } = useAuth();

  async function handlerChangeUserName() {
    try {
      if(!userName.trim()){
        return Alert.alert("Alteração", "Preencha o campo do nome do usuário.")
      }

      const storageUserId = await AsyncStorage.getItem('user_id');
      await api.patch(`/users/${storageUserId}`, { user: { login: userName } });

      clear()
     
    } catch (error){
      Alert.alert("Conta", "Não foi possível alterar o nome do usuário.")
    }
  }
  
  return (
    <View className="flex-1 bg-primary items-center justify-center p-8">

    <Image
      source={require("@images/seed-eater.png")}
      className="h-44"
      resizeMode="contain"
    />

    <View className="w-full mt-2 gap-5">
      <Input.Root.Field>
        <Input.Icon icon={FontAwesome} name='user-circle-o' />
        <Input.Content.Field placeholder='Nome de Usuário' onChangeText={setUserName} />
      </Input.Root.Field>

      <Button.Root.Submit onPress={handlerChangeUserName} >
        <Button.Content.Submit title="Alterar Nome do Usuário" />
      </Button.Root.Submit>
    </View>
  </View>
  );
}