import React from "react";
import { Wellcome1 } from "./components/Wellcome1";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Wellcome2 } from "./components/Wellcome2";
import { SignedIn } from "./components/SignedIn";
import { TermCondi } from "./components/TermCondi";
import { ClerkProvider } from "@clerk/clerk-expo";

import { enviroment } from "../../state/enviroment";

const Tab = createBottomTabNavigator();

export const Wellcome = ({ navigation }) => {
    const CLERK_PUBLISHABLE_KEY = enviroment.useState((state) => state.clerkPublicKey);

    return (
        <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
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
            <Tab.Screen name="TermCondi" component={TermCondi} />
        </Tab.Navigator>
        </ClerkProvider>
    );
};