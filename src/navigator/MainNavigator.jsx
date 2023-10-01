import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Wellcome } from '../screens/Wellcome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ImportFromSeed } from '../screens/ImportFromSeed';
import { Home } from '../screens/Home';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const MainNavigator = () => {
  return (
    <NavigationContainer theme={{colors: {
      background: 'transparent'
    }}}>
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
          name="Import From Seed"
          component={ImportFromSeed}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};