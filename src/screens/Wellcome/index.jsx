import React from "react";
import { Wellcome1 } from "./components/Wellcome1";
import { Wellcome2 } from "./components/Wellcome2";
import { Wellcome3 } from "./components/Wellcome3";
import { Wellcome4 } from "./components/Wellcome4";
import { Wellcome5 } from "./components/Wellcome5";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export const Wellcome = ({ navigation }) => {

    return (
        <Tab.Navigator
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
            <Tab.Screen name="Wellcome3" component={Wellcome3} />
            <Tab.Screen name="Wellcome4" component={Wellcome4} />
            <Tab.Screen name="Wellcome5" component={Wellcome5} />
        </Tab.Navigator>
    );
};