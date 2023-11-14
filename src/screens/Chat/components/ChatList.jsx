import { Avatar, Box, Flex, Heading, Input, ScrollView, Stack, Text } from "native-base";
import React from "react";
import { StyleSheet, Animated, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { store } from "../../../state/store";
import { getMainColor } from "../../../state/color";
import * as MessagingService from "../../../services/Messaging";
import { useIsFocused } from "@react-navigation/native";

export const ChatList = ({ navigation }) => {

    const user = store.useState((state) => state.user);
    const [chatList, setChatList] = React.useState([]);



    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);


    React.useEffect(() => {
        handleGetAllSessions();
        const interval = setInterval(() => {
            handleGetAllSessions();
        }, 10000);
        return () => clearInterval(interval);
    }, [useIsFocused]);

    const handleGetAllSessions = async () => {
        const sessions = await MessagingService.getAllChat(user.userId);
        const tempChatList = [];
        for (const session of sessions) {
            const chatDetail = await handleGetChatDetail(session.sessionId);
            const chat = { session, chatDetail };
            tempChatList.push(chat);
        }
        setChatList(tempChatList);
        console.log('chatList', chatList);
    };

    const handleGetChatDetail = async (sessionId) => {
        const res = await MessagingService.getDetailsBySessionId(sessionId);
        return res;
    }

    




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
                    <Heading fontSize={36} fontWeight='bold' color={getMainColor(user.userMode)}>Tin nhắn</Heading>
                    <Avatar bg="lightBlue.400" source={{
                        uri: user.images[0]
                    }} size="md">
                        Avt
                        <Avatar.Badge bg="green.500" />
                    </Avatar>
                </Stack>

                {/* Search box */}
                {/* <Input backgroundColor='#FFF' leftElement={<Stack padding='15px' backgroundColor='#FFF'><Ionicons color='#B9C6CC' size={22} name="search" /></Stack>} variant="rounded" placeholder="Search" size='2xl' /> */}

                <Box
                    flex={1}
                    marginTop={15}
                >
                    {(chatList.length === 0) ?
                        // (<Text fontSize='xl' fontWeight='semibold' color='gray.500'>Không có tin nhắn nào</Text>) :
                        (<Text fontSize='xl' fontWeight='semibold' color='gray.500'>Chưa một lời qua lại 🤓🤓</Text>) :
                        (
                            <ScrollView>
                                {
                                    chatList.map((chat) => (
                                        <TouchableOpacity onPress={() => navigation.navigate('ChatDetail', { chatDetail: chat })}>
                                            <Flex
                                                flexDirection='row'
                                                marginBottom='10px'
                                                backgroundColor='#FFF'
                                                borderRadius={15}
                                                paddingX={5}
                                                paddingY={5}
                                                style={{ columnGap: 15 }}
                                            >
                                                <Avatar bg="amber.500" source={{
                                                    uri: chat.session.user2.images[0]
                                                }} size="lg">
                                                    Ava
                                                    {/* <Avatar.Badge bg="green.500" /> */}
                                                </Avatar>

                                                <Stack
                                                    flex={1}
                                                >
                                                    <Text 
                                                        fontSize='xl' fontWeight='semibold' 
                                                        color={getMainColor(chat.session.user2.userMode)}>
                                                            {`${chat.session.user2.firstName} ${chat.session.user2.middleName ? chat.session.user2.middleName : ''} ${chat.session.user2.lastName}`}
                                                    </Text>
                                                    <Text color="gray.500" numberOfLines={1} ellipsizeMode='tail' fontSize='sm' fontWeight='semibold'>{chat.lastMessage}</Text>
                                                </Stack>
                                            </Flex>
                                        </TouchableOpacity>
                                    ))
                                }
                            </ScrollView>
                        )
                    }

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