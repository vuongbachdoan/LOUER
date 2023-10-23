import React from "react";
import { Wellcome1 } from "./components/Wellcome1";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Wellcome2 } from "./components/Wellcome2";
import { SignedIn } from "./components/SignedIn";

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
            <Tab.Screen name="SignedIn" component={SignedIn} />
        </Tab.Navigator>
    );
};