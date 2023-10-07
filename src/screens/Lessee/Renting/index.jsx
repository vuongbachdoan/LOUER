import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { TermConfirm } from "./components/TermConfirm";

const Tab = createBottomTabNavigator();

export const Renting = ({ navigation }) => {

    return (
        <Tab.Navigator
            sceneContainerStyle={{backgroundColor: '#FAFAFA'}}
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    display: 'none',
                },
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                swipeEnabled: true
            }}

        >
            <Tab.Screen name="TermConfirm" component={TermConfirm} />
        </Tab.Navigator>
    );
};