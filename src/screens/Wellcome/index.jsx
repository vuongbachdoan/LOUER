import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import { Wellcome1 } from "./components/Wellcome1";
import { Wellcome2 } from "./components/Wellcome2";
import { LoggedIn } from "./components/LoggedIn";



const Tab = createBottomTabNavigator();

export const Wellcome = ({ navigation }) => {

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
            <Tab.Screen name="Wellcome1" component={Wellcome1} />
            <Tab.Screen name="Wellcome2" component={Wellcome2} />
            <Tab.Screen name="LoggedIn"  component={LoggedIn} />
        </Tab.Navigator>
    );
};