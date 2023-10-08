import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import GradientText from "react-native-gradient-texts";
import { GradientButton } from "../../../components/GradientButton";
import { Box, Stack } from "native-base";
import { useLayoutEffect } from "react";

export const SignoutConfirm = ({ navigation }) => {
    React.useEffect(() => {
    }, []);

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
                {/* <Text style={{
                    fontSize: 22,
                    fontWeight: 600,
                    textAlign: 'center'
                }}
                >Bạn muốn</Text> */}
                <GradientText
                    text={"Log"}
                    fontSize={95}
                    fontWeight={1000}
                    isGradientFill
                    gradientColors={['#FF5484', '#26A0DD']}
                />
                <GradientText
                    text={"out?"}
                    fontSize={95}
                    fontWeight={1000}
                    isGradientFill
                    gradientColors={['#FF5484', '#26A0DD']}
                />

                <Box width='100%'>
                    <GradientButton onPress={() => navigation.navigate('Wellcome2')} fontSize={18} height={55} radius={10} colors={['#000000C7', '#0000005E']} text='Chuẩn luôn' />
                    <Box height={15}></Box>
                    <GradientButton onPress={() => navigation.navigate('Profile')} fontSize={18} height={55} radius={10} colors={['#22A4DD', '#F45985']} text='Bấm lộn' />
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