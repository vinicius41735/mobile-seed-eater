import { useState } from 'react';
import { Alert, Image, View } from 'react-native';
import { FontAwesome} from '@expo/vector-icons';
import { Button, Input } from '@components';
import { useAuth } from '@contexts';
import { api } from '@services';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function ChangeName() {
  const [name, setName] = useState("");
  const { clear } = useAuth();

  async function handlerChangeName() {
    try {
      if(!name.trim()){
        return Alert.alert("Alteração", "Preencha o campo do nome.")
      }

      const storageUserId = await AsyncStorage.getItem('user_id');
      await api.patch(`/users/${storageUserId}`, { user: { name: name } });

      clear()
     
    } catch (error){
      Alert.alert("Conta", "Não foi possível alterar o nome.")
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
        <Input.Content.Field placeholder='Nome' onChangeText={setName} />
      </Input.Root.Field>

      <Button.Root.Submit onPress={handlerChangeName} >
        <Button.Content.Submit title="Alterar Nome" />
      </Button.Root.Submit>
    </View>

  </View>
  );
}