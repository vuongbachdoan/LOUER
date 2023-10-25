import { Avatar, Box, Button, Flex, Icon, Image, Text } from "native-base";
import React, { useState } from "react";
import { StyleSheet, Animated } from "react-native";
import AvatarUser from '../../assets/images/placeholder.png';
import { Ionicons } from "@expo/vector-icons";
import { GradientButton } from "../../components/GradientButton";


import { store } from "../../state/store";
import { getGradientColor, getMainColor } from "../../state/color";


export const Profile = ({ navigation }) => {

    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const user = store.useState((state) => state.user);

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const [userData, setUserData] = useState(false);
    React.useEffect(() => {
        setUserData(user)
    }, [user])

    return (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            <Box
                paddingX={15}
                paddingY={30}
                width='100%'
                display='flex'
                flexDirection='column'
                minHeight='100%'
                overflow='hidden'
            >
                <Flex
                    flexDirection='column'
                    rowGap={15}
                    alignItems='center'
                >
                    <Box height={30} />
                    <Image alt="user" src={user.images[0]} width={140} height={140} borderRadius={15} />
                    <Text fontSize='2xl' fontWeight='semibold' color={getMainColor(userData.userMode)}>{user.firstName} {user.middleName} {user.lastName}</Text>
                    {/* <Text fontSize='xl' marginBottom={15} fontWeight='semibold'>{user.email}</Text> */}

                    <GradientButton
                        colors={getGradientColor(userData.userMode)}
                        width={240}
                        onPress={() => navigation.navigate('ProfileInformation')}
                        text='Thông tin cá nhân' />
                    <GradientButton
                        colors={getGradientColor(userData.userMode)}
                        width={240}
                        onPress={() => navigation.navigate('ProfileReview')}
                        text='Đánh giá của tôi' />
                    <GradientButton
                        colors={getGradientColor(userData.userMode)}
                        width={240}
                        text='Đăng xuất'
                        onPress={() => navigation.navigate('SignoutConfirm', { userData: userData })}
                    />
                </Flex>
            </Box>
        </Animated.View >
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingBottom: 25,
        paddingLeft: 25,
        paddingRight: 25,
        width: '100%',
        height: '100%',
        backgroundColor: '#FAFAFA',
    },
    text: {
        textTransform: 'uppercase',
        color: '#FFF'
    }
})