import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ChatList } from "./components/ChatList";
import { ChatDetail } from "./components/ChatDetail";
import { ChatPropInfo } from "./components/ChatPropInfo";

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
            <Tab.Screen name="ChatDetail" component={ChatDetail} options={{ tabBarLabel: '', tabBarLabelStyle: { display: 'none' } }}/>
            <Tab.Screen name="ChatPropInfo" component={ChatPropInfo} options={{ tabBarLabel: '', tabBarLabelStyle: { display: 'none' } }}/>
        </Tab.Navigator>
    );
};