import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import GradientText from "react-native-gradient-texts";
import { GradientButton } from "../../../components/GradientButton";
import { Box, Stack, Heading, Avatar, Flex } from "native-base";
import { useLayoutEffect } from "react";
import Toast from "../../../components/Toast";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { store } from "../../../state/store";
import * as UserService from "../../../services/User";
import * as LoginService from "../../../services/Login";


export const SignedIn = ({ navigation }) => {

    const userMain = store.useState((state) => state.user);
    const { isSignedIn, user, isLoaded } = useUser();
    const [resLogin, setResLogin] = useState(null);

    useEffect(() => {
        const email = user.primaryEmailAddress.emailAddress;
            switch (true) {
                //Case FPT
                case /[a-z0-9]{8,}@fpt\.edu\.vn/.test(email):
                    setResLogin(LoginService.mailFPT(user.fullName, user.primaryEmailAddress.emailAddress, user.imageUrl))
                    break;
                //Case Gmail
                case /^[a-z0-9]{8,}@gmail\.com$/.test(email):
                    if (user.lastName !== null && user.middleName === null) {
                        setResLogin(LoginService.mail(user.fullName, user.primaryEmailAddress.emailAddress, user.imageUrl, user.lastName));
                    } else if (user.middleName !== null && user.lastName === null) {
                        setResLogin(LoginService.mail(user.fullName, user.primaryEmailAddress.emailAddress, user.imageUrl, null, user.middleName));
                    } else if (user.lastName !== null && user.middleName !== null) {
                        setResLogin(LoginService.mail(user.fullName, user.primaryEmailAddress.emailAddress, user.imageUrl, user.lastName, user.middleName));
                    }
                    break;
                default:
                    setResLogin(LoginService.mailOther(user.fullName, user.primaryEmailAddress.emailAddress, user.imageUrl));
                    break;
            }
            console.log('ResLogin',resLogin);
            store.update(s => {
                //Example response
                // {
                //     "userId": 31,
                //     "studentId": "PTIA168224",
                //     "firstName": "B",
                //     "lastName": "A",
                //     "middleName": "",
                //     "email": "haptia168224@fpt.edu.vn",
                //     "phone": null,
                //     "positiveRating": 0,
                //     "negativeRating": 0,
                //     "rating": 100.0,
                //     "userStatus": true,
                //     "userMode": false,
                //     "images": ["https://www.louerapp.com/api/images/users/55"]
                // }
                s.user.userId = setResLogin.userId;
                s.user.studentId = setResLogin.studentId;
                s.user.firstName = setResLogin.firstName;
                s.user.lastName = setResLogin.lastName;
                s.user.middleName = setResLogin.middleName;
                s.user.email = setResLogin.email;
                s.user.phone = setResLogin.phone;
                s.user.positiveRating = setResLogin.positiveRating;
                s.user.negativeRating = setResLogin.negativeRating;
                s.user.rating = setResLogin.rating;
                s.user.userStatus = setResLogin.userStatus;
                s.user.userMode = setResLogin.userMode;
                s.user.images = setResLogin.images;
            });
        console.log('User MAIN',userMain);
    }, [isSignedIn, navigation]);


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
                {userMain ? (
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
                                <Avatar bg="lightBlue.400" source={{ uri: userMain.avaLink }} size="xl">
                                    Avt
                                    <Avatar.Badge bg="green.500" />
                                </Avatar>
                            </Flex>
                            <Box height={50} />
                            <Box>
                                <GradientText
                                    text={userMain.firstName}
                                    fontSize={90}
                                    fontWeight={1000}
                                    isGradientFill
                                    gradientColors={['#FF5484', '#26A0DD']}
                                />
                                <GradientText
                                    text={userMain.lastName + '!'}
                                    fontSize={90}
                                    fontWeight={1000}
                                    isGradientFill
                                    gradientColors={['#FF5484', '#26A0DD']}
                                />
                            </Box>
                            <Box height={85} />
                            <Box>
                                <Box height={15}></Box>
                                <GradientButton onPress={() => {
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'Home' }],
                                    });
                                }} fontSize={22} height={55} radius={30} colors={['#22A4DD', '#F45985']} text='Tiếp tục' />
                            </Box>
                        </Flex>

                    </>
                ) : <Text>Loading</Text>}

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