import { Avatar, Box, Button, Flex, Icon, Image, Text } from "native-base";
import React from "react";
import { StyleSheet, Animated } from "react-native";
import AvatarUser from '../../assets/images/placeholder.png';
import { Ionicons } from "@expo/vector-icons";
import { GradientButton } from "../../components/GradientButton";
import { store } from "../../state/store";

export const Profile = ({ navigation, route }) => {

    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const currentuserMode = store.useState((state) => state.user.userMode);

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

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
                    <Image alt="user" source={AvatarUser} width={140} height={140} borderRadius={15} />
                    <Text fontSize='2xl' fontWeight='semibold' color='#1B6BB5'>Nguyễn Văn A</Text>
                    <Text fontSize='xl' marginBottom={15} fontWeight='semibold'>anvse170000@fpt.edu.vn</Text>

                    <GradientButton
                        colors={currentuserMode == 'Lessor' ? ['#2A4AB6', '#269DDB'] : ['#9F3553', '#E98EA6']}
                        width={240}
                        onPress={() => navigation.navigate('ProfileInformation')}
                        text='Thông tin cá nhân' />
                    <GradientButton
                        colors={currentuserMode == 'Lessor' ? ['#2A4AB6', '#269DDB'] : ['#9F3553', '#E98EA6']}
                        width={240}
                        text='Đánh giá của tôi' />
                    <GradientButton
                        colors={currentuserMode == 'Lessor' ? ['#2A4AB6', '#269DDB'] : ['#9F3553', '#E98EA6']}
                        width={240}
                        text='Đăng xuất'
                        onPress={() => navigation.navigate('SignoutConfirm')}
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