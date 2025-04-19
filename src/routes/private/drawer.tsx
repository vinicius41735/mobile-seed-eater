import { createDrawerNavigator } from "@react-navigation/drawer";
import {PrivateTabRoutes} from "./tab";
import { SignOut, ChangeName, ChangeUserName, ChangePassword, DeleteAccount } from "@screens";
import { colors } from "@constants";
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

export function PrivateDrawerRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: colors.primary
        },
        drawerLabelStyle: {
          color: colors.secondary
        },
        drawerActiveBackgroundColor: colors.tertiary,
        drawerActiveTintColor: colors.secondary,
        headerStyle: {
          backgroundColor: colors.primary
        },
        headerTintColor: colors.secondary
      }}
    >
      <Drawer.Screen
        name="Seed Eater"
        component={PrivateTabRoutes}
        options={{
          drawerIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={colors.secondary}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Alterar Nome"
        component={ChangeName}
        options={{
          drawerIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={24}
              color={colors.secondary}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Alterar Nome do Usuário"
        component={ChangeUserName}
        options={{
          drawerIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'person-circle' : 'person-circle-outline'}
              size={24}
              color={colors.secondary}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Alterar a Senha"
        component={ChangePassword}
        options={{
          drawerIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'key' : 'key-outline'}
              size={24}
              color={colors.secondary}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Deletar a Conta"
        component={DeleteAccount}
        options={{
          drawerIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'trash' : 'trash-outline'}
              size={24}
              color={colors.secondary}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Sair da Conta"
        component={SignOut}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? 'exit' : 'exit-outline'}
              size={size}
              color={colors.secondary}
            />
          ),
        }}
      />
  </Drawer.Navigator>

  );
}

