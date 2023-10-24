import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Wellcome } from '../screens/Wellcome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/Home';
import { Chat } from '../screens/Chat';
import { Profile } from '../screens/Profile';
import { Notification } from '../screens/Notification';
import { ChatDetail } from '../screens/Chat/components/ChatDetail';
import { ProductDetail } from '../screens/Home/components/ProductDetail';
import { LessorRules } from '../screens/Home/components/LessorRules';
import { LessorRequestSent } from '../screens/Home/components/LessorRequestSent';
import { SignoutConfirm } from '../screens/Home/components/SignoutConfirm';
import { ProfileInformation } from '../screens/Profile/ProfileInformation';
import { ProfileReview } from '../screens/Profile/ProfileReview';
import { LesseeRecentActivity } from '../screens/Home/components/LesseeRecentActivity';
import { LesseeCreateRequest } from '../screens/Home/components/LesseeCreateRequest';
import { LesseeViewProductDetail } from '../screens/Home/components/LesseeViewProductDetail';
import { LessorViewProductDetail } from '../screens/Home/components/LessorViewProductDetail';
import { LessorCreateRequest } from '../screens/Home/components/LessorCreateRequest';

import { ClerkProvider } from '@clerk/clerk-expo';
import { enviroment } from '../state/enviroment';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const MainNavigator = () => {
  return (
    <ClerkProvider publishableKey={enviroment.useState((state) => state.clerkPublicKey)}>
      <NavigationContainer theme={{
        colors: {
          background: 'transparent'
        }
      }}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#FAFAFA',
            },
            headerTintColor: '#FAFAFA',
          }}
        >
          <Stack.Screen
            name="Wellcome"
            component={Wellcome}
            options={{
              headerShown: false
            }}
          />

          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Notification"
            component={Notification}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: true,
            }}
          />

          <Tab.Screen
            name="ChatDetail"
            component={ChatDetail}
            options={{
              headerShown: false,
            }}
          />


          <Tab.Screen
            name="Product details"
            component={ProductDetail}
            options={{
              headerShown: false,
            }} />

          <Tab.Screen name="Điều khoản thuê" component={LessorRules}
            options={{
              headerShown: false,
            }} />

          <Tab.Screen name="Lessor request sent" component={LessorRequestSent}
            options={{
              headerShown: false,
            }} />


          <Tab.Screen name="SignoutConfirm" component={SignoutConfirm}
            options={{
              headerShown: false,
            }} />

          <Tab.Screen name="ProfileInformation" component={ProfileInformation}
            options={{
              headerShown: false,
            }} />

          <Tab.Screen name="ProfileReview" component={ProfileReview}
            options={{
              headerShown: false,
            }} />

          <Tab.Screen name="LesseeRecentActivity" component={LesseeRecentActivity}
            options={{
              headerShown: true,
            }} />

          <Tab.Screen name="LesseeCreateRequest" component={LesseeCreateRequest}
            options={{
              headerShown: false,
            }} />

          <Tab.Screen name="LessorCreateRequest" component={LessorCreateRequest}
            options={{
              headerShown: false,
            }} />

          <Tab.Screen name="Lessee view product detail" component={LesseeViewProductDetail}
            options={{
              headerShown: true,
            }} />

          <Tab.Screen name="Lessor View Product Details" component={LessorViewProductDetail}
            options={{
              headerShown: true,
            }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ClerkProvider>
  );
};