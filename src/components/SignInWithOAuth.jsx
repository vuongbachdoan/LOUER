import React, { useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { Button } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../hooks/WarmUpBrowser";
import { GradientButton } from "./GradientButton";
import { Checkbox, Flex, Link, Stack, Text } from "native-base";

WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = ({navigation}) => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    useWarmUpBrowser();
    const [isChecked, setChecked] = useState(false);
    const handlePolicyAllow = () => {
        setChecked(!isChecked);
    }


    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } =
                await startOAuthFlow();
            if (createdSessionId) {
                setActive({ session: createdSessionId });
                navigation.navigate('Home')
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
                <Text>By click, you aggree with our</Text><Link href='/policy'>Tern and Conditional</Link>
            </Checkbox>
        </>

    );
}
export default SignInWithOAuth;