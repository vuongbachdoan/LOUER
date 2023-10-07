import { Avatar, Badge, Box, Flex, HStack, Input, Pressable, ScrollView, Spacer, Stack, Text, Image, } from "native-base";
import React from "react";
import { StyleSheet, Animated } from "react-native";
import Prod2 from '../../../../assets/images/prod2.png'
import { useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { GradientButton } from "../../../../components/GradientButton";
import { Header } from "react-native/Libraries/NewAppScreen";



const reviewlist = [
    {
        name: "John Doe",
        comment: "Great experience renting from this person!",
        timestamp: "2021-09-01T12:00:00Z",
        avatar: source = {
            uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        },
    },
    {
        name: "Jane Smith",
        comment: "The property was exactly as described. Highly recommend!",
        timestamp: "2021-08-30T09:30:00Z",
        avatar: source = {
            uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        },
    },
    {
        name: "Bob Johnson",
        comment: "Had a few issues with the property, but the owner was quick to resolve them.",
        timestamp: "2021-08-28T16:45:00Z",
        avatar: source = {
            uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        },
    },
    {
        name: "Alice Lee",
        comment: "The owner was very friendly and accommodating. Would rent from them again!",
        timestamp: "2021-08-25T11:15:00Z",
        avatar: source = {
            uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        },
    },
    {
        name: "Tom Wilson",
        comment: "The property was clean and well-maintained. No complaints!",
        timestamp: "2021-08-20T14:00:00Z",
        avatar: source = {
            uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        },
    },
];





export const ChatPropInfo = ({ navigation, route }) => {

    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const { prodData } = route.params;

    const [isBanking, setIsBanking] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <Text fontWeight='bold'>{prodData.name}</Text>,
        });
    }, [navigation, prodData]);

    const toggleIsBanking = () => {
        setIsBanking(!isBanking)
    }

    const [isEnding, setIsEnding] = useState(false);

    return (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            <Box
                width='100%'
                display='flex'
                flexDirection='column'
                minHeight='100%'
                overflow='hidden'
            >
                <ScrollView>
                    <Stack
                        paddingX={15}
                        paddingY={30}
                        width='100%'
                        display='flex'
                        flexDirection='column'
                        height='100vh'
                        overflow='hidden'
                    >
                        <Flex
                            flexDirection='row'
                            columnGap={15}
                            alignItems='flex-start'
                            width='100%'
                        >
                            <Image borderRadius={10} source={Prod2} height={140} width={140} />
                            <Flex flex={1} flexDirection='column' rowGap={7.5}>
                                <Text fontSize={16} fontWeight='semibold' textAlign='center'>Thông tin người thuê</Text>
                                <Flex paddingX={2} paddingY={1} flexDirection='row' columnGap={15}>
                                    <Avatar bg="cyan.500" width={35} height={35} source={{
                                        uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                    }} />
                                    <Stack>
                                        <Text fontSize={14} fontWeight='semibold'>Nguyễn Văn John</Text>
                                        <Text fontSize={14} fontWeight='semibold' color='gray.500'>SE17000</Text>
                                    </Stack>
                                </Flex>
                                <Flex paddingX={2} paddingY={1} width='100%' borderRadius={10} backgroundColor='gray.200' flexDirection='row' columnGap={15} alignItems='center'>
                                    <Flex width={35} height={35}>
                                        <Ionicons name='heart-outline' size={32} />
                                    </Flex>
                                    <Stack>
                                        <Text fontWeight='semibold' fontSize={14} color='#0066FF'>100%</Text>
                                        <Text>Review(25)</Text>
                                    </Stack>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Box
                            backgroundColor='transparent'
                            paddingX="15px"
                            paddingY="20px"
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
                                            name="chatbubbles-outline" />
                                    </Stack>}
                                variant="rounded"
                                placeholder="Để lại tin nhắn..."
                                size='1x1'
                            />
                            <Text>  </Text>
                            <GradientButton onPress={() => navigation.navigate('TermConfirm')} text='Đặt thuê' radius={15} colors={['#9F3553', '#E98EA6']} />
                        </Box>
                        <Box
                            backgroundColor='transparent'
                            paddingX="15px"
                            paddingY="5px"
                        >
                            
                            <Text fontSize={18} fontWeight='700' paddingBottom={2}>Mô tả sản phẩm</Text>
                            <Text fontSize={16} fontWeight='400'>Tình trạng tốt, cond 9.5, hồi còn nghèo sang thì mua về để qua môn nên ít khi sử dụng. Giờ nghèo nghèo nên...{'\n'} (Vui lòng để lại tin nhắn)</Text>
                            <Text></Text>
                            <Text fontSize={18} fontWeight='700' paddingBottom={2}>Ảnh / Video sản phẩm </Text>
                            <Box
                                width='100%'
                                display='flex'
                                flexDirection='column'
                                minHeight='35%'
                                overflow='hidden'
                            >
                                <ScrollView horizontal={true}>
                                    <Stack
                                        paddingX={0}
                                        width='100%'
                                        display='flex'
                                        flexDirection='row'
                                        // height='10vh'
                                        overflow='hidden'
                                    >
                                        {[...Array(5)].map((_, index) => (
                                            <Pressable
                                                key={index}
                                                style={{
                                                    width: 100,
                                                    height: 100,
                                                    paddingRight: 10,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: 'transparent',
                                                    borderRadius: 10,
                                                }}
                                            >
                                                {({
                                                    isHovered,
                                                    isPressed
                                                }) => {
                                                    return (
                                                        <Box
                                                            bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"}
                                                            style={{ transform: [{ scale: isPressed ? 0.96 : 1 }] }}
                                                            p="10"
                                                            rounded="8"
                                                            shadow={2}
                                                            borderWidth="1"
                                                            borderColor="coolGray.300"
                                                        >
                                                        </Box>
                                                    );
                                                }}
                                            </Pressable>
                                        ))}
                                    </Stack>
                                </ScrollView>
                                <Text fontSize={18} fontWeight='700' paddingBottom={2}>Reviews</Text>
                                {[...Array(5)].map((_, index) => (
                                    <Text key={index} color={'gray.500'}>
                                        {reviewlist[index].name}
                                    </Text>
                                ))}
                            </Box>
                            


                        </Box>




                    </Stack>
                </ScrollView>
            </Box>
        </Animated.View>
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