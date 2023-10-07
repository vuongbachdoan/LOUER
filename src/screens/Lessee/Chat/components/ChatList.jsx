import { Avatar, Box, Flex, Heading, Input, ScrollView, Stack, Text } from "native-base";
import React from "react";
import { StyleSheet, Animated, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";


import Prod2 from '../../../../assets/images/prod2.png';


const userData = {
    name : 'Người Đẹp Trai',
    email: 'traindse178200@fpt.edu.vn',
    mssv: 'SE178200',
    namecolor: '#FF5484',

}


const prodData = {
    name: 'Nikon D7000',
    isRent: 0,
    statusColor: '#01005C',
    price: '560',
    thumbnail: Prod2
}

//-1 = Đã
//0 = Chưa
//1= Đang thuê
const isRent = (value = 0) => {
        return value === -1 || value === 0 || value === 1;
};
const getRentCond = (isRentValue) => {
    if (isRentValue === -1) {
        return ["Đã thuê", "#A0A4A2"]; // red color for "Đã thuê"
    } else if (isRentValue === 0) {
        return ["Chưa thuê", "#FDB400"]; // green color for "Chưa thuê"
    } else if (isRentValue === 1) {
        return ["Đang thuê", "#22A4DD"]; // yellow color for "Đang thuê"
    } else {
        return ["Không rõ", "#F65683"]; // black color for "Không rõ"
    }
};




const messages = [
    {
        receiver: 'Người Đẹp Trai',
        sender: 'Nguyen Van A',
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
                content: 'Con máy khoảng tuần sau là được á em, mình cần thông tin gì thêm không?'
            },
            {
                sender: 'A',
                timestamp: '',
                content: 'Vậy cho cọc con máy này nhé !!'
            },
            {
                sender: 'K',
                timestamp: '',
                content: 'Oke em ơi'
            }
        ],
        lastMessage: "Oke em ơi"
    },
    {
        receiver: 'Nguyen Van B',
        lastMessage: "Con máy đó khoảng tuần sau là có đúng không bạn"
    }
]

export const ChatList = ({ navigation, route }) => {

    const fadeAnim = React.useRef(new Animated.Value(0)).current;

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
                marginTop={7}
            >
                <Stack
                    display='flex'
                    justifyContent='space-between'
                    flexDirection='row'
                    alignItems='center'
                    paddingBottom={15}
                >
                    <Heading fontSize={36} fontWeight='bold' color={userData.namecolor}>Tin nhắn</Heading>
                    <Avatar bg="lightBlue.400" source={{
                        uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    }} size="md">
                        Avt
                        <Avatar.Badge bg="green.500" />
                    </Avatar>
                </Stack>
                <Input backgroundColor='#FFF' leftElement={<Stack padding='15px' backgroundColor='#FFF'><Ionicons color='#B9C6CC' size={22} name="search" /></Stack>} variant="rounded" placeholder="Search" size='2xl' />

                <Box
                    flex={1}
                    marginTop={15}
                >
                    <ScrollView>
                        {
                            messages.map((item) => (
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
                                        <Avatar bg="amber.500" source={{
                                            uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                                        }} size="md">
                                            NB
                                            <Avatar.Badge bg="green.500" />
                                        </Avatar>

                                        <Stack
                                            flex={1}
                                        >
                                            <Text fontSize={16} fontWeight='semibold'>{item.receiver}</Text>
                                            <Text color="gray.500" numberOfLines={1} ellipsizeMode='tail' fontSize={14} fontWeight='semibold'>{item.lastMessage}</Text>
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