import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Wellcome } from '../screens/Wellcome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MainNavLessor } from "./MainNavLessor";
import { MainNavLessee } from "./MainNavLessee";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const WelcomeNav = () => {
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
                    name='MainNavLessor'
                    component={MainNavLessor}
                    options={{
                        headerShown: false
                    }}
                />
                 <Stack.Screen
                    name='MainNavLessor'
                    component={MainNavLessee}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};