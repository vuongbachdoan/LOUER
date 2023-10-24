import { SignOutButton } from "@clerk/clerk-react";
import { Box, Stack } from "native-base";
import React, { useLayoutEffect } from "react";
import { Animated, StyleSheet, Text, Button } from "react-native";
import GradientText from "react-native-gradient-texts";
import { GradientButton } from "../../../components/GradientButton";

import { enviroment } from "../../../state/enviroment";
import { useClerk } from "@clerk/clerk-react";


export const SignoutConfirm = ({ navigation }) => {
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const { signOut } = useClerk();

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const handleSignOut = () => {
        signOut();
        navigation.navigate('SignedOut');
    }


    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <Text fontWeight='bold' fontSize={24} color='#FDB400'></Text>,
            headerShown: false
        });
    }, [navigation]);

    return (
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
                    text={"Bạn"}
                    fontSize={60}
                    fontWeight={1000}
                    isGradientFill
                    gradientColors={['#FF5484', '#26A0DD']}
                />
                <GradientText
                    text={"muốn"}
                    fontSize={60}
                    fontWeight={1000}
                    isGradientFill
                    gradientColors={['#FF5484', '#26A0DD']}
                />
                <GradientText
                    text={"Đăng xuất?"}
                    fontSize={60}
                    fontWeight={1000}
                    isGradientFill
                    gradientColors={['#FF5484', '#26A0DD']}
                />

                <Box width='100%'>
                    <SignOutButton >
                        <GradientButton onPress={() => (signOut)} fontSize={18} height={55} radius={10} colors={['#000000C7', '#0000005E']} text='Chuẩn luôn' />
                    </SignOutButton>
                    <Box height={15}></Box>
                    <GradientButton onPress={() => navigation.goBack()} fontSize={18} height={55} radius={10} colors={['#22A4DD', '#F45985']} text='Bấm lộn' />

                </Box>
            </Stack>
        </Animated.View>
    );
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