import { Avatar, Box, Flex, Heading, Image, Input, ScrollView, Stack, Text } from "native-base";
import React, { useState } from "react";
import { StyleSheet, Animated, TouchableOpacity } from "react-native";
import Prod1 from '../../assets/images/prod1.png';





export const Notification = ({ navigation, route }) => {

    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    // const [notifications, setNotifications] = useState([
    //     {
    //         thumbnail: Prod1,
    //         title: 'Thông tin từ Nikon D7000',
    //         description: 'Thông tin thêm từ người cho thuê',
    //         isViewed: false,
    //         isShow: true,
    //     },
    //     {
    //         thumbnail: Prod1,
    //         title: 'Có tin nhắn mới từ Lê Văn Linh',
    //         description: 'Linh: Được em ơi',
    //         isViewed: false,
    //         isShow: true,
    //     },
    // ]);


    const [notifications, setNotifications] = useState([
    {
        thumbnail: Prod1,
        title: 'Nikon D7000',
        description: 'Đã xác nhận cho thuê. mã số giao dịch: ABCD12345678',
        isViewed: false,
        isShow: true,
    },
    {
        thumbnail: Prod1,
        title: 'Nikon D7000',
        description: 'Đã xác nhận cho thuê. mã số giao dịch: ABCD12345678',
        isViewed: false,
        isShow: true,
    },
    {
        thumbnail: Prod1,
        title: 'Nikon D7000',
        description: 'Đã xác nhận cho thuê. mã số giao dịch: ABCD12345678',
        isViewed: false,
        isShow: true,
    },
    ]);

    

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    // useFocusEffect(() => {
    //     // console.log('paidStat:', window.$paidStat);
    //     setNotifications((prevNotifications) =>
    //         prevNotifications.map((notification) => ({
    //             ...notification,
    //             isShow: true,
    //         }))
    //     );
    // }, [window.$paidState]);


    

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
                <Stack
                    display='flex'
                    justifyContent='space-between'
                    flexDirection='row'
                    alignItems='center'
                    paddingBottom={15}
                    paddingTop={15}
                >
                    <Heading fontSize={36} fontWeight='bold' color='#22A4DD'>Thông báo</Heading>
                    <Avatar bg="lightBlue.400" source={{
                        uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    }} size="md">
                        Avt
                        <Avatar.Badge bg="green.500" />
                    </Avatar>
                </Stack>

                <Box
                    flex={1}
                    marginTop={15}
                >
                    <ScrollView>
                        {
                            notifications.map((item) => (
                                item.isShow && (
                                    <TouchableOpacity onPress={() => navigation.navigate('ChatDetail', { chatDetail: item })}>
                                    <Flex
                                        flexDirection='row'
                                        columnGap={15}
                                        marginBottom='10px'
                                        backgroundColor='#FFF'
                                        borderRadius={15}
                                        paddingX={5}
                                        paddingY={5}
                                    >
                                        <Image
                                            alt="thumbnail" 
                                            source={item.thumbnail} width='80px' height='80px' borderRadius={15}/>

                                        <Stack
                                            flex={1}
                                        >
                                            <Text fontSize={16} fontWeight='semibold'>{item.title}</Text>
                                            <Text color="gray.500" numberOfLines={2} ellipsizeMode='tail' fontSize={14} fontWeight='semibold'>{item.description}</Text>
                                        </Stack>
                                    </Flex>
                                </TouchableOpacity>
                                )
                            ))
                        }
                    </ScrollView>
                </Box>
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