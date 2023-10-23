import { Avatar, Box, Flex, Heading, Image, Input, ScrollView, Stack, Text } from "native-base";
import React from "react";
import { StyleSheet, Animated, TouchableOpacity } from "react-native";
import Prod1 from '../../assets/images/prod1.png';
import { store } from "../../state/store";
import { getMainColor } from "../../state/color";


const notifications = [
    {
        thumbnail: Prod1,
        title: 'Nikon D7000',
        name: 'Nikon D7000',
        description: 'Đã xác nhận cho thuê. mã số giao dịch: ABCD12345678',
        isViewed: false,
        receiver: 'Nguyen Van A',
        sender: 'Kid',
        messages: [
            {
                sender: 'A',
                timestamp: '',
                content: 'Cho mình hỏi về em D7000 với.'
            },
            {
                sender: 'K',
                timestamp: '',
                content: 'Con đó tin chuẩn em nhé'
            },
            {
                sender: 'A',
                timestamp: '',
                content: 'Vậy khi nào máy đó thuê được ạ?'
            },
            {
                sender: 'K',
                timestamp: '',
                content: 'Con máy đó khoảng tuần sau là free đó em, có thông tin gì thêm không?'
            },
            {
                sender: 'A',
                timestamp: '',
                content: 'Cho mình hỏi về em D7000 với.'
            }
        ],
        lastMessage: "Con máy đó khoảng tuần sau là có đúng không bạn"
    },
    {
        thumbnail: Prod1,
        title: 'Nikon D7000',
        name: 'Nikon D7000',
        description: 'Đã xác nhận cho thuê. mã số giao dịch: ABCD12345678',
        isViewed: false,
        receiver: 'Nguyen Van A',
        sender: 'Kid',
        messages: [
            {
                sender: 'A',
                timestamp: '',
                content: 'Cho mình hỏi về em D7000 với.'
            },
            {
                sender: 'K',
                timestamp: '',
                content: 'Con đó tin chuẩn em nhé'
            },
            {
                sender: 'A',
                timestamp: '',
                content: 'Vậy khi nào máy đó thuê được ạ?'
            },
            {
                sender: 'K',
                timestamp: '',
                content: 'Con máy đó khoảng tuần sau là free đó em, có thông tin gì thêm không?'
            },
            {
                sender: 'A',
                timestamp: '',
                content: 'Cho mình hỏi về em D7000 với.'
            }
        ],
        lastMessage: "Con máy đó khoảng tuần sau là có đúng không bạn"
    },
    {
        thumbnail: Prod1,
        title: 'Nikon D7000',
        name: 'Nikon D7000',
        description: 'Đã xác nhận cho thuê. mã số giao dịch: ABCD12345678',
        isViewed: false,
        receiver: 'Nguyen Van A',
        sender: 'Kid',
        messages: [
            {
                sender: 'A',
                timestamp: '',
                content: 'Cho mình hỏi về em D7000 với.'
            },
            {
                sender: 'K',
                timestamp: '',
                content: 'Con đó tin chuẩn em nhé'
            },
            {
                sender: 'A',
                timestamp: '',
                content: 'Vậy khi nào máy đó thuê được ạ?'
            },
            {
                sender: 'K',
                timestamp: '',
                content: 'Con máy đó khoảng tuần sau là free đó em, có thông tin gì thêm không?'
            },
            {
                sender: 'A',
                timestamp: '',
                content: 'Cho mình hỏi về em D7000 với.'
            }
        ],
        lastMessage: "Con máy đó khoảng tuần sau là có đúng không bạn"
    },
]

export const Notification = ({ navigation, route }) => {

    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const user = store.useState((state)=> state.user);

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
                <Stack
                    display='flex'
                    justifyContent='space-between'
                    flexDirection='row'
                    alignItems='center'
                    paddingBottom={15}
                    paddingTop={15}
                >
                    <Heading fontSize={36} fontWeight='bold' color={getMainColor(user.userMode)}>Thông báo</Heading>
                    {console.log(user)}
                    <Avatar bg="lightBlue.400" source={{
                        uri: user.avaLink
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
                            notifications.map((item, index) => (
                                <TouchableOpacity key={index} onPress={() => navigation.navigate(user.userMode ? 'Lessor View Product Details' :'Lessee view product detail', { product: item })}>
                                    <Flex
                                        flexDirection='row'
                                        style={{columnGap: 15}}
                                        marginBottom='10px'
                                        backgroundColor='#FFF'
                                        paddingY={5}
                                    >
                                        <Image alt='thumbnail' source={item.thumbnail} width='140px' height='140px' borderRadius={15} />

                                        <Stack
                                            flex={1}
                                            marginLeft={15}
                                        >
                                            <Text fontSize='xl' fontWeight='semibold'>{item.title}</Text>
                                            <Text fontSize='sm' color="gray.500" numberOfLines={2} ellipsizeMode='tail' fontWeight='semibold'>{item.description}</Text>
                                        </Stack>
                                    </Flex>
                                </TouchableOpacity>
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