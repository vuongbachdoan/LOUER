import { Avatar, Box, Checkbox, Flex, Image, Stack, Text } from "native-base";
import React from "react";
import { StyleSheet, Animated } from "react-native";
import Prod1 from '../../../assets/images/prod1.png'
import { useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export const ProductDetail = ({ navigation, route }) => {

    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const { productName } = route.params;

    const [isBanking, setIsBanking] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <Text fontWeight='bold'>{productName}</Text>,
        });
    }, [navigation, productName]);

    const toggleIsBanking = () => {
        setIsBanking(!isBanking)
    }

    return (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            <Box>
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
                        <Image borderRadius={10} source={Prod1} height={140} width={140} />
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
                        marginTop={15}
                    >
                        <Text fontSize={20}>570.000 / Ngày</Text>
                        <Flex
                            display='flex'
                            flexDirection='row'
                            flexWrap='wrap'
                            justifyContent='space-between'
                            columnGap={15}
                        >
                            <Stack marginTop={15}>
                                <Text fontSize={16} fontWeight='semibold'>Ngày bắt đầu</Text>
                                <Flex flexDirection='row' columnGap={15} alignItems='flex-end'>
                                    <Stack>
                                        <Text textAlign='right'>Ngày</Text>
                                        <Text color="gray.500" fontSize={20} fontWeight='semibold'>12/03</Text>
                                    </Stack>
                                    <Text fontSize={20} fontWeight='semibold'>,</Text>
                                    <Stack>
                                        <Text textAlign='right'>Buổi</Text>
                                        <Text color="gray.500" fontSize={20} fontWeight='semibold'>Sáng</Text>
                                    </Stack>
                                </Flex>
                            </Stack>

                            <Stack marginTop={15}>
                                <Text fontSize={16} fontWeight='semibold'>Ngày kết thúc</Text>
                                <Flex flexDirection='row' columnGap={15} alignItems='flex-end'>
                                    <Stack>
                                        <Text textAlign='right'>Ngày</Text>
                                        <Text color="gray.500" fontSize={20} fontWeight='semibold'>12/03</Text>
                                    </Stack>
                                    <Text fontSize={20} fontWeight='semibold'>,</Text>
                                    <Stack>
                                        <Text textAlign='right'>Buổi</Text>
                                        <Text color="gray.500" fontSize={20} fontWeight='semibold'>Sáng</Text>
                                    </Stack>
                                </Flex>
                            </Stack>
                        </Flex>
                    </Box>

                    <Stack
                        marginTop={15}
                    >
                        <Text fontSize={16} fontWeight='semibold'>Phương thức thanh toán</Text>
                        <Checkbox isChecked={isBanking} onChange={toggleIsBanking} colorScheme="green">
                            Chuyển khoản
                        </Checkbox>
                    </Stack>

                    <Stack
                        marginTop={15}
                    >
                        <Text fontSize={16} fontWeight='semibold'>Tổng tiền</Text>
                        <Text color="gray.500" fontSize={20} fontWeight='semibold'>624.000 vnđ</Text>
                    </Stack>
                </Stack>
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