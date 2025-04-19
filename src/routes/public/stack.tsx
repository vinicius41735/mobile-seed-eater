import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignIn, SignUp } from "@screens";

const Stack = createNativeStackNavigator();

export function PublicStackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }} 
    >
      <Stack.Screen
        name="SignIn"
        component={SignIn}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
      />      
    </Stack.Navigator>
  );
}