import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../hooks/WarmUpBrowser";
import { GradientButton } from "./GradientButton";
import { Checkbox, Flex, Link, Stack, Text } from "native-base";

import { store } from "../state/store";
import { enviroment } from "../state/enviroment";

import * as UserService from "../services/User";
import * as Toast from "../components/Toast";

WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = ({ navigation }) => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience

    useWarmUpBrowser();
    const [isChecked, setChecked] = useState(false);
    const handlePolicyAllow = () => {
        setChecked(!isChecked);
    }

    const handleReadingPolicy = () => {
        navigation.navigate('TermCondi');
    }

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } =
                await startOAuthFlow();
            if (createdSessionId) {
                setActive({ session: createdSessionId })
            } else {
                // Use signIn or signUp for next steps such as MFA
            }
        } catch (err) {
            Toast.show('Có lỗi xảy ra, vui lòng thử lại sau.');
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