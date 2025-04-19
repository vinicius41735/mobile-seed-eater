import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feed, UsersList, Profile } from "@screens";
import { colors } from "@constants";
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export function PrivateTabRoutes() {
  return (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: colors.secondary,
      tabBarStyle: {
        backgroundColor: colors.primary,
      },
      tabBarActiveTintColor: colors.tertiary,
      tabBarInactiveTintColor: colors.secondary, 
    }}
  >
    <Tab.Screen
      name="Feed"
      component={Feed}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={focused ? 'home' : 'home-outline'}
            size={size}
            color={color}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Users"
      component={UsersList}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={focused ? 'people' : 'people-outline'}
            size={size}
            color={color}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={focused ? 'person' : 'person-outline'}
            size={size}
            color={color}
          />
        ),
      }}
    />
  </Tab.Navigator>
  );
}