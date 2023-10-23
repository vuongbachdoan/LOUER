import React, { useState } from "react";
import { Image, Animated } from "react-native";
import LogoLouer from '../../../assets/images/logo.png';
import { Checkbox, Flex, Link, Stack, Text } from "native-base";
import GradientText from "react-native-gradient-texts";
import { ClerkProvider, SignedOut, SignedIn } from "@clerk/clerk-expo";
import SignInWithOAuth from "../../../components/SignInWithOAuth";

export const Wellcome2 = ({ navigation }) => {
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const [isChecked, setChecked] = useState(false);
    const CLERK_PUBLISHABLE_KEY = 'pk_test_Zmx1ZW50LXNlYWhvcnNlLTQuY2xlcmsuYWNjb3VudHMuZGV2JA';


    const [user, setUser] = useState(null);

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    




    return (
        <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
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
                        <SignedIn>
                            {navigation.navigate('Home')}
                        </SignedIn>
                        <SignedOut>
                            <SignInWithOAuth/>
                        </SignedOut>
                        
                    </Stack>
                </Flex>
            </Animated.View>
        </ClerkProvider>

    );
};