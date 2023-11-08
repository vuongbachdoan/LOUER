import React from "react";
import { View, StyleSheet, Animated } from "react-native";
import GradientText from "react-native-gradient-texts";
import { GradientButton } from "../../../components/GradientButton";
import { Box, Flex, Stack, Text } from "native-base";
import { useLayoutEffect } from "react";

export const LessorRequestSent = ({ navigation }) => {
    React.useEffect(() => {
        // setTimeout(() => {
        //     navigation.navigate('Wellcome2')
        // }, 3000)
    }, []);

    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    return (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            <Stack
                paddingX={15}
                paddingBottom={30}
                width='100%'
                display='flex'
                flexDirection='column'
                height='100%'
                overflow='hidden'
                justifyContent='center'

            >
                <Flex
                    flex={1}
                    alignItems='center'
                    justifyContent='center'
                >
                    <Text fontSize={65} fontWeight='bold'>Gửi yêu cầu cho thuê thành công.</Text>
                </Flex>
                {/* <GradientText
                    text={"Gửi yêu cầu"}
                    fontSize={50}
                    isGradientFill
                    gradientColors={['#FF5484', '#26A0DD']}
                />
                <GradientText
                    text={"cho thuê"}
                    fontSize={50}
                    isGradientFill
                    gradientColors={['#FF5484', '#26A0DD']}
                />
                <GradientText
                    text={"thành công."}
                    fontSize={50}
                    isGradientFill
                    gradientColors={['#FF5484', '#26A0DD']}
                /> */}
                <GradientButton onPress={() => navigation.navigate('HomeScreen')} text='Trở về trang chủ' colors={['#30BF60', '#217EFD']} width='100%' height={45} radius={15} />
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