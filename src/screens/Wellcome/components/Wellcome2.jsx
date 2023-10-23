import React, { useState } from "react";
import { Image, Animated, Button } from "react-native";
import LogoLouer from '../../../assets/images/logo.png';
import { Checkbox, Flex, Link, Stack, Text } from "native-base";
import GradientText from "react-native-gradient-texts";
import {SignedOut} from "@clerk/clerk-expo";
import SignInWithOAuth from "../../../components/SignInWithOAuth";
import { useUser } from "@clerk/clerk-react";


export const Wellcome2 = ({ navigation }) => {
    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    const { isSignedIn, isLoaded } = useUser();

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim, navigation]);

    const handleSignedIn = () => {
        navigation.navigate('SignedIn');
    }

    React.useEffect(() => {
        if (isSignedIn && isLoaded) {
            handleSignedIn();
        }
    }, [isSignedIn, isLoaded, navigation]);

    return (
            <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
                <Flex
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    flexDirection='column'
                    height='100%'
                    width='100%'
                >
                    <Stack
                        alignItems='center'
                        marginLeft={15}
                        marginRight={15}
                    >
                        <Image
                            style={{
                                width: 280,
                                height: 280,
                                resizeMode: 'contain',
                            }}
                            source={LogoLouer}
                        />

                        <GradientText
                            text={"Louer"}
                            fontSize={95}
                            fontWeight={1000}
                            isGradientFill
                            gradientColors={['#FF5484', '#26A0DD']}
                        />

                        <Text fontSize={22} fontWeight='bold' marginBottom={7.5}>Đăng ký / Đăng nhập</Text>
                        <Text fontSize={16} fontWeight='semibold' color='coolGray.500' marginBottom={15}>Sử dụng mail FPT Edu / Google của bạn</Text>
                        {isSignedIn && isLoaded && console.log('Go to Signed In') && handleSignedIn()}
                        <SignedOut>
                            <SignInWithOAuth navigation={navigation}/>
                        </SignedOut>
                    </Stack>
                </Flex>
            </Animated.View>
    );
};