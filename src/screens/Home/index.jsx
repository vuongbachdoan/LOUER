import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "native-base";
import { GradientButton } from "../../components/GradientButton";
import { HomeRouting } from "./components/HomeRouting";
import { Chat } from "../Chat";
import { Notification } from "../Notification";
import { Profile } from "../Profile";
import { store } from "../../state/store";
import { LessorCreateRequest } from "./components/LessorCreateRequest";

const Tab = createBottomTabNavigator();

export const Home = ({ navigation }) => {
    const role = store.useState((state) => state.user.role);

    return (
        <Tab.Navigator
            sceneContainerStyle={{ height: 60, backgroundColor: '#FAFAFA' }}
            screenOptions={({ route }) => ({
                headerShown: false,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                swipeEnabled: true,
                tabBarStyle: {
                    backgroundColor: '#FAFAFA',
                    borderTopWidth: 0,
                    borderTopColor: 'transparent',
                    height: 70,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    size = 28

                    if (route.name === 'Home') {
                        iconName = 'home-outline'
                        return <Ionicons name={iconName} size={size} color={color} />
                    } else if (route.name === 'Notification') {
                        iconName = 'notifications-outline'
                        return <Ionicons name={iconName} size={size} color={color} />
                    } else if (route.name === 'LessorCreateRequest') {
                        iconName = 'add-outline'
                        return <Stack style={{ borderRadius: '15px', top: -20 }}><GradientButton onPress={() => navigation.navigate('LessorCreateRequest')} radius={15} colors={['#2A4AB6', '#269DDB']} width={60} height={60} prefixIcon={<Ionicons name={iconName} size={35} color='#FFF' style={{ marginLeft: 2 }} />}></GradientButton></Stack>
                    } else if (route.name === 'Chat') {
                        iconName = 'chatbubble-outline'
                        return <Ionicons name={iconName} size={size} color={color} />
                    } else if (route.name === 'Profile') {
                        iconName = 'person-outline'
                        return <Ionicons name={iconName} size={size} color={color} />
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#23A4DD',
                tabBarInactiveTintColor: 'gray'
            })}
        >
            <Tab.Screen name="Home" component={HomeRouting} options={{ tabBarLabel: '', tabBarLabelStyle: { fontWeight: 'bold', bottom: 5 } }}/>
            <Tab.Screen name="Notification" component={Notification} options={{ tabBarLabel: '', tabBarLabelStyle: { fontWeight: 'bold', bottom: 5 } }} />
            {
                role == 'Lessor' &&
                <Tab.Screen name="LessorCreateRequest" component={LessorCreateRequest} options={{ tabBarLabel: '' }} />
            }
            <Tab.Screen name="Chat" component={Chat} options={{ tabBarLabel: '', tabBarLabelStyle: { fontWeight: 'bold', bottom: 5 } }} />
            <Tab.Screen name="Profile" component={Profile} options={{ tabBarLabel: '', tabBarLabelStyle: { fontWeight: 'bold', bottom: 5 } }} />
        </Tab.Navigator>
    );
};