import { useState } from 'react';
import { Alert, Image, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@contexts';
import { api } from '@services';
import { Button, Input } from '@components';

export function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { clear } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(prev => !prev);

  async function handlerChangePassoword() {
    try {
      if(!password.trim() || !confirmPassword.trim()){
        return Alert.alert("Alteração", "Preencha os campos da senha e da confirmação da senha.")
      }

      const storageUserId = await AsyncStorage.getItem('user_id');
      await api.patch(`/users/${storageUserId}`, { user: { password: password, password_confirmation: confirmPassword } });

      clear()
     
    } catch (error){
      Alert.alert("Conta", "Não foi possível alterar a senha.")
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
          <Input.Icon icon={MaterialIcons} name='password' />
          <Input.Content.Field placeholder='Senha' secureTextEntry={!showPassword} onChangeText={setPassword} />
          <Input.Actions icon={MaterialIcons} onShowAction={togglePasswordVisibility} name={showPassword ? "visibility-off": "visibility"} />
      </Input.Root.Field>

      <Input.Root.Field>
        <Input.Icon icon={MaterialIcons} name='password' />
        <Input.Content.Field placeholder='Confirmar a Senha' secureTextEntry={!showConfirmPassword} onChangeText={setConfirmPassword} />
        <Input.Actions icon={MaterialIcons} onShowAction={toggleConfirmPasswordVisibility} name={showConfirmPassword ? "visibility-off": "visibility"} />
      </Input.Root.Field>

      <Button.Root.Submit onPress={handlerChangePassoword} >
        <Button.Content.Submit title="Alterar a Senha" />
      </Button.Root.Submit>
    </View>
  </View>
  );
}