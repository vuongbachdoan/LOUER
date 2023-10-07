import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import { TermConfirm } from "./components/TermConfirm";




const Tab = createBottomTabNavigator();

export const renting = ({ navigation,route }) => {

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
            <Tab.Screen name="RentTermConfirm" component={RentTermConfirm} />
        </Tab.Navigator>
    );
};