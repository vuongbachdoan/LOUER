import React, { useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { Button } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useUser,useAuth } from "@clerk/clerk-react";
import { useWarmUpBrowser } from "../hooks/WarmUpBrowser";
import { GradientButton } from "./GradientButton";
import { Checkbox, Flex, Link, Stack, Text } from "native-base";

import { store } from "../state/store";
import { enviroment } from "../state/enviroment";

import * as UserService from "../services/User";


WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = ({navigation}) => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience


    const user = store.useState((state) => state.user);
    const { isSignedIn, userClerk, isLoaded } = useUser();
    const { getToken } = useAuth();
    useWarmUpBrowser();
    const [isChecked, setChecked] = useState(false);
    const handlePolicyAllow = () => {
        setChecked(!isChecked);
    }

    const handleReadingPolicy = () => {
        navigation.navigate('TermCondi');
    }

    const handleGetUserFromServer = () => {
        let data = userClerk;
        console.log('data',data);
        getToken().then((data) => console.log(data));
        // UserService.getById(userId).then((data) => {
        //     store.update((state) => {
        //         state.user = data;
        //         state.user.userId = userId;
        //     })
        // });
        // UserService.getAvaLinkById(userId).then((ava) => {
        //     store.update((state) => {
        //         state.user.avaLink = ava;
        //     });
        // });
    }


    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } =
                await startOAuthFlow();
            if (createdSessionId) {
                setActive({ session: createdSessionId });
                if(isLoaded) {
                    handleGetUserFromServer();
                    navigation.navigate('SignedIn')
                }
            } else {
                // Use signIn or signUp for next steps such as MFA
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    }, []);

    return (
        <>
            <GradientButton
                text='Login with Google account'
                onPress={onPress}
                colors={isChecked ? ['#2A4AB6', '#269DDB'] : ['#6B7280', '#6B7280']}
                // colors={['#2A4AB6', '#269DDB']}
                disabled={!isChecked}
            />
            <Checkbox marginTop={15} isChecked={isChecked} onChange={handlePolicyAllow} colorScheme="green" display='flex' flexDirection='row'>
                <Text>Tôi đã đọc và chấp nhận</Text><Link onPress={handleReadingPolicy}>Điều khoản sử dụng</Link>
            </Checkbox>
        </>
    );
}
export default SignInWithOAuth;