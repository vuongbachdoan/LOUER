import { useUser } from "@clerk/clerk-expo";
import { useIsFocused } from "@react-navigation/native";
import { Avatar, Box, Flex, Stack } from "native-base";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import { GradientButton } from "../../../components/GradientButton";
import * as UserService from "../../../services/User";
import { store } from "../../../state/store";
import LoadScreen from "../../../components/LoadScreen";


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

export const SignedIn = ({ navigation }) => {

    const userMain = store.useState((state) => state.user);
    const [isImported, setIsImported] = useState(false);
    const [changedUser, setChangedUser] = useState([]);
    const { user } = useUser();

    const handleInputData = () => {
        // fullName, firstName, email, avaLink, lastName = '', middleName = ''
        UserService.handleGetData(
            user.fullName, user.firstName, user.primaryEmailAddress.emailAddress,
            user.imageUrl, user.lastName, user.middleName
        )
            .then((res) => {
                setIsImported(true);
            });
    }

    React.useEffect(() => {
        handleInputData();
    }, [useIsFocused(), navigation]);



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
                        <Box>
                            <Text
                                style={{
                                    fontSize: 75, fontWeight: '900', textAlign: 'left',
                                    color: (userMain.userMode) ? ('#22A4DD') : ('#FF5484')
                                }}>
                                {user.firstName} {user.lastName}
                            </Text>
                        </Box>
                        <Box>
                            <Box height={30} />
                            <GradientButton
                                disabled={!isImported}
                                onPress={() => {
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'Home' }],
                                    });
                                }}
                                fontSize={22} height={55} radius={30}
                                colors={isImported ? ['#FF5484', '#26A0DD'] : ['#6B7280', '#6B7280']}
                                text='Tiếp tục' />
                        </Box>
                    </Flex>
            </Stack>
        </Animated.View>
    )
};

