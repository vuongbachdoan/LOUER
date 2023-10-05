import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Wellcome } from '../screens/Wellcome';
import { Home } from '../screens/Lessor/Home';
import { Chat } from '../screens/Lessor/Chat';
import { Notification } from '../screens/Lessor/Notification';
import { Profile } from '../screens/Lessor/Profile';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const MainNavLessor = () => {
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