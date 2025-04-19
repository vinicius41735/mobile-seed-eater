import { useState } from 'react';
import { Alert, Image, Pressable, Text, View } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Input, Button  } from '@components';
import { useAuth } from '@contexts';

export function SignIn({ navigation }: any) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  async function handlerSignIn() {
    try {
      if(!userName.trim() || !password.trim()){
        return Alert.alert("Conta", "Preencha todos os campos!")
      }

      await signIn(userName, password)
     
    } catch (error){
      Alert.alert("Conta", "Não foi possível acessar a conta.")
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
        <Input.Icon icon={FontAwesome} name='at' />
        <Input.Content.Field placeholder='Nome de Usuário' onChangeText={setUserName} />
      </Input.Root.Field>

      <Input.Root.Field>
        <Input.Icon icon={MaterialIcons} name='password' />
        <Input.Content.Field placeholder='Senha' secureTextEntry={!showPassword} onChangeText={setPassword} />
        <Input.Actions icon={MaterialIcons} onShowAction={togglePasswordVisibility} name={showPassword ? "visibility-off": "visibility"} />
      </Input.Root.Field>

      <Button.Root.Submit onPress={handlerSignIn} >
        <Button.Content.Submit title="Acessar Conta" />
      </Button.Root.Submit>

      <Button.Root.Link onPress={() => navigation.navigate('SignUp')} >
        <Button.Content.Link title="Ainda não tem uma conta ?" />
      </Button.Root.Link>
    </View>
  </View>
  );
}