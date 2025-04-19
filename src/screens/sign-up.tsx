import { useState } from 'react';
import { Alert, Image, Pressable, Text, View } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { api } from '@services';
import { Button, Input } from '@components';

export function SignUp({ navigation }: any) {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(prev => !prev);

  async function handlerSignUp() {
    try {
      if(!name.trim() || !userName.trim() || !password.trim() || !confirmPassword.trim()){
        return Alert.alert("Conta", "Preencha todos os campos!")
      }

      const response = await api.post("/users", { user: { login: userName, name: name, password: password, password_confirmation: confirmPassword } })
      
      if(response.data.status == 201){
        return Alert.alert("Conta", "Usuário cadastrado com sucesso!", [
          { text: "OK", onPress: () => navigation.navigate("SignIn") },
        ])
      }

    } catch (error){
      Alert.alert("Conta", "Não foi possível cadastrar a conta.")
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

      <Input.Root.Field>
        <Input.Icon icon={FontAwesome} name='at' />
        <Input.Content.Field placeholder='Nome de Usuário' onChangeText={setUserName} />
      </Input.Root.Field>

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

      <Button.Root.Submit onPress={handlerSignUp} >
        <Button.Content.Submit title="Realizar Cadastro" />
      </Button.Root.Submit>

      <Button.Root.Link onPress={() => navigation.navigate('SignIn')} >
        <Button.Content.Link title="Já tem uma conta ?" />
      </Button.Root.Link>
    </View>
  </View>
  );
}