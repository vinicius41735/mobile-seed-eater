import { NewPost, UserProfile, Post } from "@screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PrivateDrawerRoutes } from "./drawer";

const Stack = createNativeStackNavigator();

export function PrivateStackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="PrivateDrawerRoutes"
        component={PrivateDrawerRoutes}
      />            
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
      />
      <Stack.Screen
        name="NewPost"
        component={NewPost}
      />
      <Stack.Screen
        name="Post"
        component={Post}
      />      
  </Stack.Navigator>

  );
}

