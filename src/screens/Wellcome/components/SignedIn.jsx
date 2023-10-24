import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import GradientText from "react-native-gradient-texts";
import { GradientButton } from "../../../components/GradientButton";
import { Box, Stack, Heading, Avatar, Flex } from "native-base";
import { useLayoutEffect } from "react";
import Toast from "../../../components/Toast";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { store } from "../../../state/store";
import * as LoginService from "../../../services/Login";


export const SignedIn = ({ navigation }) => {

    const userMain = store.useState((state) => state.user);
    const { isSignedIn, user, isLoaded } = useUser();
    const [resLogin, setResLogin] = useState('');
    const [isImported, setIsImported] = useState(true);
    React.useEffect(() => {
        console.log("user ID", userMain.userId);
        if (userMain === undefined) {
            setTimeout(() => {
                handleGetData().then(() => {
                    handleUpdateState();
                });
            }, 1000); // wait for 1 second before trying again
        } else {
            handleGetData().then(() => {
                handleUpdateState();
            });
        }
    }, [userMain]);

    const handleGetData = async () => {
        const email = user.primaryEmailAddress.emailAddress;
        switch (isImported) {
            //Case FPT
            case /[a-z0-9]{8,}@fpt\.edu\.vn/.test(email):
                const response = await LoginService.mailFPT(user.fullName, user.primaryEmailAddress.emailAddress, user.imageUrl);
                setResLogin(response);
                setIsImported(false);
                break;
            //Case Gmail
            case /^[a-z0-9]{8,}@gmail\.com$/.test(email):
                if (user.lastName !== null && user.middleName === null) {
                    const res = await LoginService.mail(user.fullName, user.primaryEmailAddress.emailAddress, user.imageUrl, user.lastName);
                    setResLogin(res);
                    setIsImported(false);
                } else if (user.middleName !== null && user.lastName === null) {
                    const res = await LoginService.mail(user.fullName, user.primaryEmailAddress.emailAddress, user.imageUrl, null, user.middleName)
                    setResLogin(res);
                    setIsImported(false);
                } else if (user.lastName !== null && user.middleName !== null) {
                    const res = await LoginService.mail(user.fullName, user.primaryEmailAddress.emailAddress, user.imageUrl, user.lastName, user.middleName)
                    setResLogin(res);
                    setIsImported(false);
                }
                break;
            //Case Other Mail
            default:
                LoginService.mailOther(user.fullName, user.primaryEmailAddress.emailAddress, user.imageUrl).then((res) => {
                    setResLogin(res);
                    setIsImported(false);
                })
                break;
        }
    }

    const handleUpdateState = () => {
        console.log('Res Login', resLogin);
        store.update(s => {
            s.user.userId = resLogin.userId;
            s.user.studentId = resLogin.studentId;
            s.user.firstName = resLogin.firstName;
            s.user.lastName = resLogin.lastName;
            s.user.middleName = resLogin.middleName;
            s.user.email = resLogin.email;
            s.user.phone = resLogin.phone;
            s.user.positiveRating = resLogin.positiveRating;
            s.user.negativeRating = resLogin.negativeRating;
            s.user.rating = resLogin.rating;
            s.user.userStatus = resLogin.userStatus;
            s.user.userMode = resLogin.userMode;
            s.user.images = resLogin.images;
        });
        console.log('User MAIN', userMain);
    }

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
                paddingTop={0}
                flex={1}
                display='flex'
                justifyContent='center'
                alignItems='center'
                width='100%'
                height='100%'
            >
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
                            {user.fullName.split(' ').map((word, index) => (
                                <GradientText
                                    key={index}
                                    text={word}
                                    fontSize={90}
                                    fontWeight={1000}
                                    isGradientFill
                                    gradientColors={['#FF5484', '#26A0DD']}
                                />
                            ))}
                        </Box>
                        <Box height={75} />
                        <Box>
                            <Box height={15}></Box>
                            <GradientButton
                                disabled={userMain.userId === ''}
                                onPress={() => {
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'Home' }],
                                    });
                                }} fontSize={22} height={55} radius={30}
                                colors={userMain.userId !== '' ? ['#FF5484', '#26A0DD'] : ['#6B7280', '#6B7280']}
                                text='Tiếp tục' />
                        </Box>
                    </Flex>

                </>
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