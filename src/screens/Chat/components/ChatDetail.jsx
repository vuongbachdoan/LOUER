import { Avatar, Box, Flex, Input, ScrollView, Stack, Text } from "native-base";
import React from "react";
import { StyleSheet, Animated } from "react-native";
import { TouchableOpacity } from "react-native";
import { useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

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
                    <Input backgroundColor='#FFF' rightElement={<Stack padding='15px' backgroundColor='#FFF'><Ionicons color='#B9C6CC' size={22} name="send" /></Stack>} variant="rounded" placeholder="Nhập tin nhắn ..." size='2xl' />
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