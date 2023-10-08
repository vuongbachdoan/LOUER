import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { EditInfo } from "./EditInfo";
import { Profile } from "./ProfileView";

const Tab = createBottomTabNavigator();

export const ProfileRouting = ({ navigation }) => {

    return (
        <Tab.Navigator
            sceneContainerStyle={{ height: 60, backgroundColor: '#AEAEB710' }}
            screenOptions={({ route }) => ({
                headerShown: false,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                swipeEnabled: true,
                tabBarStyle: {
                    display: 'none',
                    height: 0
                },
            })}
        >
            <Tab.Screen name="ProfileView" component={Profile} options={{ tabBarLabel: '', tabBarLabelStyle: { fontWeight: 'bold', bottom: 5 } }}/>
            <Tab.Screen name="EditInfo" component={EditInfo} options={{ tabBarLabel: '', tabBarLabelStyle: { display: 'none' } }}/>
        </Tab.Navigator>
    );
};