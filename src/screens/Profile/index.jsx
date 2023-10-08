import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { EditInfo } from "./components/EditInfo";
import { ProfileView } from "./components/ProfileView";

const Tab = createBottomTabNavigator();

export const Profile = ({ navigation }) => {

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
            <Tab.Screen name="EditInfo" component={EditInfo} options={{ tabBarLabel: '', tabBarLabelStyle: { fontWeight: 'bold', bottom: 5 } }}/>
            <Tab.Screen name="Profile" component={ProfileView} options={{ tabBarLabel: '', tabBarLabelStyle: { display: 'none' } }}/>
        </Tab.Navigator>
    );
};