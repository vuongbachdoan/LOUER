import { Avatar, Box, Checkbox, Flex, Image, Input, ScrollView, Stack, Text } from "native-base";
import React from "react";
import { StyleSheet, Animated } from "react-native";
import Prod1 from '../../../assets/images/prod1.png'
import { useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { GradientButton } from "../../../components/GradientButton";

export const ProductDetail = ({ navigation, route }) => {

    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const { product } = route.params;

    const [isBanking, setIsBanking] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <Text fontWeight='bold'>{product.name}</Text>,
        });
    }, [navigation, product]);

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
                <Flex
                    width='100%'
                    flexDirection='row'
                    justifyContent='space-between'
                    alignItems='center'
                    paddingX={15}
                    paddingTop={30}
                >

                    <Flex><Ionicons name="chevron-back" size={22} onPress={() => navigation.goBack()} /></Flex>
                    <Text textAlign='center' flex={1} fontSize={22} fontWeight='semibold'>{product.name}</Text>
                </Flex>

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
                            <Image borderRadius={10} source={Prod1} height={140} width={140} alt="product thumbnal"/>
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

                        {
                            (product.status === 'pending' && isEnding === false) &&
                            <Stack marginTop={30}>
                                <GradientButton onPress={() => setIsEnding(true)} text='Kết thúc giao dịch' colors={['#2A4AB6', '#269DDB']} height={45} radius={15} />
                            </Stack>
                        }
                        {
                            (product.status === 'pending' && isEnding === true) &&
                            <>
                                <Text marginTop={15} fontSize={16} fontWeight='semibold'>Xác nhận kết thúc giao dịch trước hạn</Text>
                                <Flex
                                    flexDirection='row'
                                    justifyContent='space-between'
                                    columnGap={15}
                                >
                                    <GradientButton onPress={() => setIsEnding(false)} text='Từ chối' colors={['#9F3553', '#E98EA6']} width={180} height={45} radius={15} />
                                    <GradientButton onPress={() => navigation.navigate('HomeScreen')} text=' Chấp nhận' colors={['#2A4AB6', '#269DDB']} width={180} height={45} radius={15} />
                                </Flex>
                            </>
                        }
                        {
                            product.status === 'available' &&
                            <>
                                <Input
                                    marginTop={15}
                                    backgroundColor='#FFF'
                                    leftElement={
                                        <Stack padding='15px' backgroundColor='#FFF'>
                                            <Ionicons color='#B9C6CC' size={22} name="chatbox-ellipses-outline" />
                                        </Stack>
                                    }
                                    placeholder="Note"
                                    size='2xl'
                                    borderRadius={15}
                                />
                                <Stack marginTop={30}>
                                    <GradientButton onPress={() => navigation.navigate('Điều khoản thuê')} text='Tiếp tục' colors={['#2A4AB6', '#269DDB']} height={55} radius={15} />
                                </Stack>
                            </>
                        }
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