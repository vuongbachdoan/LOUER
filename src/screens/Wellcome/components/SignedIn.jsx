import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import GradientText from "react-native-gradient-texts";
import { GradientButton } from "../../../components/GradientButton";
import { Box, Stack, Heading, Avatar, Flex } from "native-base";
import { useLayoutEffect } from "react";
import Toast from "../../../components/Toast";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { store } from "../../../state/store";
import * as UserService from "../../../services/User";

export const SignedIn = ({ navigation }) => {

    const userId = '1';
    const userMain = store.useState((state) => state.user);
    const { isSignedIn, user, isLoaded } = useUser();
    const { getToken } = useAuth();


    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        handleUserServer();
        handleUserClerk();
    }, [isSignedIn,navigation]);

    const handleUserServer = () => {
        UserService.getById(userId).then((data) => {
            store.update(state => {
                state.user = data;
            })
            console.log('userMain FROM SERVER', userMain);

        });

        // UserService.getAvaLinkById(userId).then((ava) => {
        //     store.update((state) => {
        //         state.user.avaLink = ava;
        //     });
        // });
    }

    const handleUserClerk = () => {
        // userMain.studentId = user.emailAddress.match(/(.{8})@fpt.edu.vn/)[1];
        store.replace(state => {
            state.user
        });
        userMain.firstName = user.firstName;
        userMain.lastName = user.lastName;
        userMain.email = user.emailAddresses;
        userMain.phoneNumber = user.phoneNumbers;
        userMain.avaLink = user.imageUrl;
        console.log('userMain FROM CLERKKKKK', userMain);
    }



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
                paddingTop={0}
                flex={1}
                display='flex'
                justifyContent='center'
                alignItems='center'
                width='100%'
                height='100%'
            >
                {isLoaded && isSignedIn ? (
                    <>
                        <Flex
                            paddingX={15}
                            paddingY={30}
                            width='100%'
                            flexDirection='column'
                            height='100%'
                            overflow='hidden'
                        >
                            <Box height={30} />
                            <Flex
                                justifyContent='space-between'
                                flexDirection='row'
                                alignItems='center'
                                paddingBottom={15}
                                paddingTop={15}
                            >
                                <Box>
                                    <Text style={{ fontSize: 36, fontWeight: '900', textAlign: 'left' }}>Chào mừng</Text>
                                    <Text style={{ fontSize: 36, fontWeight: '900' }}>tới Louer,</Text>
                                </Box>
                                <Avatar bg="lightBlue.400" source={{ uri: user.imageUrl }} size="xl">
                                    Avt
                                    <Avatar.Badge bg="green.500" />
                                </Avatar>
                            </Flex>
                            <Box height={50} />
                            <Box>
                                <GradientText
                                    text={user.firstName}
                                    fontSize={90}
                                    fontWeight={1000}
                                    isGradientFill
                                    gradientColors={['#FF5484', '#26A0DD']}
                                />
                                <GradientText
                                    text={user.lastName + '!'}
                                    fontSize={90}
                                    fontWeight={1000}
                                    isGradientFill
                                    gradientColors={['#FF5484', '#26A0DD']}
                                />
                            </Box>
                            <Box height={85} />
                            <Box>
                                <Box height={15}></Box>
                                <GradientButton onPress={() => navigation.navigate('Home')} fontSize={22} height={55} radius={30} colors={['#22A4DD', '#F45985']} text='Tiếp tục' />
                            </Box>
                        </Flex>

                    </>
                ) : null}

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
    // text: {
    //     textTransform: 'uppercase',
    // }
})