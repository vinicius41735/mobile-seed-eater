import { Alert, Image, View } from 'react-native';
import { Button } from '@components';
import { useAuth } from '@contexts';
import { api } from '@services';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function DeleteAccount() {
  const { clear } = useAuth();

  async function handlerDeleteAccount() {
    try {
      const storageUserId = await AsyncStorage.getItem('user_id');
      await api.delete(`/users/${storageUserId}`);
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
      <Button.Root.Submit onPress={handlerDeleteAccount} >
        <Button.Content.Submit title="Deletar Conta" />
      </Button.Root.Submit>
    </View>
  </View>
  );
}