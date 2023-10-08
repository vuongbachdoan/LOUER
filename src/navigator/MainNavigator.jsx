import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Wellcome } from '../screens/Wellcome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/Home';
import { Chat } from '../screens/Chat';
import { Profile } from '../screens/Profile';
import { Notification } from '../screens/Notification';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const MainNavigator = () => {
  return (
    <NavigationContainer theme={{
      colors: {
        background: 'transparent'
      }
    }}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FAFAFA',
          },
          headerTintColor: '#FAFAFA',
        }}
      >
        <Stack.Screen
          name="Wellcome"
          component={Wellcome}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};