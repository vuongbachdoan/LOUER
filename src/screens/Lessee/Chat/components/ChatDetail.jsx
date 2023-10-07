import { Ionicons } from "@expo/vector-icons";
import { Avatar, Badge, Box, Flex, HStack, Input, Pressable, ScrollView, Spacer, Stack, Text, Image } from "native-base";
import React, { useLayoutEffect } from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";

import Prod2 from '../../../../assets/images/prod2.png';

const prodData = {
    name: 'Nikon D7000',
    status: 'available',
    statusColor: '#01005C',
    price: '560',
    thumbnail: Prod2
}

// const prodData = [
//     {
//         name: 'Canon EOS 700D',
//         status: 'pending',
//         statusMessage: '2 Giao dịch đang đợi',
//         statusColor: '#FFC700',
//         thumbnail: Prod1
//     },
//     {
//         name: 'Nikon D7000',
//         status: 'warning',
//         statusMessage: 'Còn thiếu đền bù thiệt hại',
//         statusColor: '#FC0000',
//         thumbnail: Prod2
//     },
//     {
//         name: 'Canon 5d Mark IV',
//         status: 'available',
//         statusMessage: 'Chưa có giao dịch',
//         statusColor: '#0166FE',
//         thumbnail: Prod3
//     },
//     {
//         name: 'Nikon D7000',
//         status: 'available',
//         statusMessage: 'Chưa có giao dịch',
//         statusColor: '#0166FE',
//         thumbnail: Prod2
//     },
//     {
//         name: 'Canon EOS 700D',
//         status: 'available',
//         statusMessage: 'Chưa có giao dịch',
//         statusColor: '#0166FE',
//         thumbnail: Prod1
//     }
// ]



export const ChatDetail = ({ navigation, route }) => {

    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const { chatDetail } = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <Text fontWeight='bold'>{chatDetail.receiver}</Text>,
            tabBarStyle: { display: 'none' }
        });
    }, [navigation, chatDetail]);

    const currentUser = 'A';

    return (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            <Box
                width='100%'
                display='flex'
                flexDirection='column'
                minHeight='100%'
                overflow='hidden'
            >
                <Flex
                    width='100%'
                    flexDirection='row'
                    justifyContent='space-between'
                    alignItems='center'
                    paddingX={15}
                    paddingTop={30}
                >
                    <Flex
                        flexDirection='row'
                        alignItems='center'
                        columnGap={15}
                    >
                        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
                            <Stack marginLeft={15}><Ionicons name='chevron-back' size={22} /></Stack>
                        </TouchableOpacity>
                        <Text fontSize={22} fontWeight='semibold'>{chatDetail.receiver}</Text>
                    </Flex>
                    <Avatar bg="amber.500" source={{
                        uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                    }} size="md">
                        <Avatar.Badge bg="green.500" />
                    </Avatar>
                </Flex>

                <Box
                    flex={1}
                    width='100%'
                    marginTop={15}
                    paddingX={15}
                >
                    <Pressable
                        // maxW="96"
                        onPress={() => navigation.navigate('ChatPropInfo', { prodData: prodData })}
                    >
                        {({
                            isHovered,
                            isFocused,
                            isPressed
                        }) => {
                            return (
                                <Box
                                    bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"}
                                    style={{ transform: [{ scale: isPressed ? 0.96 : 1 }] }}
                                    p="5"
                                    rounded="20"
                                    shadow={3}
                                    borderWidth="1"
                                    borderColor="coolGray.300"
                                >
                                    <HStack alignItems="center">
                                        <Badge colorScheme="yellow" _text={{ color: "white" }} variant="solid" rounded="5">
                                            {prodData.status}
                                        </Badge>
                                        <Spacer />
                                        <Box>
                                            <Ionicons color='#4196D2' name='arrow-forward-outline' size={25} />
                                        </Box>
                                    </HStack>
                                    <Box height={2} />
                                    <HStack alignItems="center">
                                        <Image source={prodData.thumbnail} borderRadius={5} width={100} height={75} />
                                        <Box width={"5%"} />
                                        <HStack alignItems="center">
                                            <Text fontWeight="medium" fontSize="xl">
                                                {prodData.name}
                                            </Text>
                                            <Text fontWeight="medium" fontSize="xl">
                                                {parseFloat(prodData.price).toFixed(3)}/ Ngày
                                            </Text>
                                        </HStack>

                                    </HStack>

                                </Box>
                            );
                        }}
                    </Pressable>
                    <Box height={5} />
                    <ScrollView
                        width='100%'
                    >
                        {
                            chatDetail?.messages.map((item) => (
                                (currentUser === item.sender) ?
                                    <Flex
                                        width='100%'
                                        justifyContent='flex-start'
                                        flexDirection='row'
                                        marginBottom='15px'
                                    >
                                        <Box
                                            width='80%'
                                            backgroundColor='#FFF'
                                            paddingX='15px'
                                            paddingY='15px'
                                            borderTopRadius={20}
                                            borderBottomRightRadius={20}
                                            borderBottomLeftRadius={5}
                                        >
                                            <Text fontSize={12} fontWeight='medium'>{item.content}</Text>
                                        </Box>
                                    </Flex> :
                                    <Flex
                                        width='100%'
                                        justifyContent='flex-end'
                                        flexDirection='row'
                                        marginBottom='15px'
                                    >
                                        <Box
                                            width='80%'
                                            backgroundColor='#4196D2'
                                            paddingX='15px'
                                            paddingY='15px'
                                            borderTopRadius={20}
                                            borderBottomLeftRadius={20}
                                            borderBottomRightRadius={5}
                                        >
                                            <Text color={'#FFF'} fontSize={12} fontWeight='medium'>{item.content}</Text>
                                        </Box>
                                    </Flex>
                            ))
                        }
                    </ScrollView>
                </Box>


                <Box
                    backgroundColor='#FAFAFA'
                    paddingX="15px"
                    paddingY="30px"
                >
                    <Input
                        backgroundColor='#FFF'
                        rightElement={
                            <Stack
                                padding='15px'
                                backgroundColor='#FFF'>
                                <Ionicons
                                    color='#B9C6CC'
                                    size={22}
                                    name="send" />
                            </Stack>}
                        variant="rounded"
                        placeholder="Nhập tin nhắn ..."
                        size='1x1'
                    />
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