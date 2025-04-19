import { Image, View } from 'react-native';
import { Button } from '@components';
import { useAuth } from '@contexts';

export function SignOut() {
  const { signOut } = useAuth();

  function handleSignOut(){
    signOut();
  }

  return (
    <View className="flex-1 bg-primary items-center justify-center p-8">

    <Image
      source={require("@images/seed-eater.png")}
      className="h-44"
      resizeMode="contain"
    />

    <View className="w-full mt-2 gap-5">
      <Button.Root.Submit onPress={handleSignOut} >
        <Button.Content.Submit title="Sair" />
      </Button.Root.Submit>      
    </View>
  </View>
  );
}