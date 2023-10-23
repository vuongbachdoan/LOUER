import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import GradientText from "react-native-gradient-texts";
import { GradientButton } from "../../../components/GradientButton";
import { Box, Stack } from "native-base";
import { useLayoutEffect } from "react";
import Toast from "../../../components/Toast";
import { ClerkProvider } from "@clerk/clerk-expo";

import { useUser } from "@clerk/clerk-react";

import { store } from "../../../state/store";
import { enviroment} from "../../../state/enviroment";

export const SignedIn = ({ navigation }) => {

    React.useEffect(() => {
    }, []);

    const clerkPublicKey = enviroment.useState((state) => state.clerkPublicKey);
    const { isSignedIn, userClerk, isLoaded } = useUser();

    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <Text fontWeight='bold' fontSize={24} color='#FDB400'></Text>,
            headerShown: false
        });
    }, [navigation]);


    if (isLoaded) {
        if (isSignedIn) {
            return (
                <ClerkProvider publishableKey={clerkPublicKey}>
                    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
                    <Stack
                        paddingLeft={15}
                        paddingRight={15}
                        paddingTop={30}
                        flex={1}
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        width='100%'
                    >
                        <GradientText
                            text={"Chào mừng, "}
                            fontSize={95}
                            fontWeight={1000}
                            isGradientFill
                            gradientColors={['#FF5484', '#26A0DD']}
                        />
                        {/* <GradientText
                            text={userClerk.fullName}
                            fontSize={95}
                            fontWeight={1000}
                            isGradientFill
                            gradientColors={['#FF5484', '#26A0DD']}
                        /> */}

                        <Box width='100%'>
                            <Box height={15}></Box>
                            <GradientButton onPress={() => navigation.goBack()} fontSize={18} height={55} radius={10} colors={['#22A4DD', '#F45985']} text='Tiếp tục' />
                        </Box>
                    </Stack>
                </Animated.View>
                </ClerkProvider>
                
            );
        } else {
            Toast.show('Bạn chưa đăng nhập, xin vui lòng thử lại.');
            navigation.goBack();
        }
    }


};

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingBottom: 50,
        paddingLeft: 50,
        paddingRight: 50,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        textTransform: 'uppercase',
    }
})