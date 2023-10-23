import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ChatList } from "./components/ChatList";

const Tab = createBottomTabNavigator();

export const Chat = ({ navigation }) => {

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
            <Tab.Screen name="Chat" component={ChatList} options={{ tabBarLabel: '', tabBarLabelStyle: { fontWeight: 'bold', bottom: 5 } }}/>
        </Tab.Navigator>
    );
};