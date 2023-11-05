import { Avatar, Box, Checkbox, Flex, Image, Input, ScrollView, Stack, Text } from "native-base";
import React from "react";
import { StyleSheet, Animated } from "react-native";
import Prod1 from '../../../assets/images/prod1.png'
import { useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { GradientButton } from "../../../components/GradientButton";

export const LesseeViewProductDetail = ({ navigation, route }) => {

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
            headerTitle: () => <Text fontWeight='bold'>{product.productName}</Text>,
        });
    }, [navigation]);

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
                            style={{ columnGap: 15 }}
                            alignItems='flex-start'
                            width='100%'
                        >
                            <Image alt="image" borderRadius={10} source={product.images[0]} height={140} width={140} />
                            <Flex flex={1} flexDirection='column' rowGap={7.5}>
                                <Text fontSize={16} fontWeight='semibold' textAlign='center'>Thông tin người thuê</Text>
                                <Flex paddingX={2} paddingY={1} flexDirection='row' style={{ columnGap: 15 }}>
                                    <Avatar bg="cyan.500" width={35} height={35} source={{
                                        uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                    }} />
                                    <Stack>
                                        <Text fontSize={14} fontWeight='semibold'>Nguyễn Văn John</Text>
                                        <Text fontSize={14} fontWeight='semibold' color='gray.500'>SE17000</Text>
                                    </Stack>
                                </Flex>

                                {/* Phần reviews
                                <Flex paddingX={2} paddingY={1} width='100%' borderRadius={10} backgroundColor='gray.200' flexDirection='row' style={{columnGap: 15}} alignItems='center'>
                                    <Flex width={35} height={35}>
                                        <Ionicons name='heart-outline' size={32} />
                                    </Flex>
                                    <Stack>
                                        <Text fontWeight='semibold' fontSize={14} color='#0066FF'>100%</Text>
                                        <Text>Review(25)</Text>
                                    </Stack>
                                </Flex> */}


                            </Flex>
                        </Flex>

                        <Box
                            marginTop={15}
                        >
                            <Text fontSize={16} fontWeight='bold' >Giá thuê : <Text fontSize={16} fontWeight='bold' color={'#FF5484'}>{product.marketPrice} /ngày</Text></Text>
                            <Text fontSize={16} fontWeight='bold'>Mô tả sản phẩm</Text>
                            <Text fontSize={16} marginBottom={15}>Tình trạng tốt, cond 9.5, trước mua về đề qua môn nên ít khi sử dụng.
                            (Vui lòng để lại tin nhắn)</Text>

                            <Text fontSize={16} fontWeight='bold' marginBottom={7.5}>Ảnh/Video sản phẩm</Text>
                            <Flex
                                flexDirection='row'
                                flexWrap='wrap'
                                style={{ columnGap: 15 }}
                                rowGap={15}
                                marginBottom={15}
                            >
                                {product.images.map((image) => (
                                    <Image 
                                        key={image}
                                        borderRadius={14} source={image} 
                                        height={100} width={100} />
                                ))}
                            </Flex>


                            {/* Review sản phẩm
                            <Flex>
                                <Text fontSize={16} fontWeight='semibold'>Reviews</Text>

                                <Box
                                    marginBottom={15}
                                >
                                    <Flex
                                        flexDirection='row'
                                        justifyContent='space-between'
                                        alignItems='center'
                                    >
                                        <Flex
                                            flexDirection='row'
                                            style={{ columnGap: 15 }}
                                        >
                                            <Avatar />
                                            <Stack>
                                                <Text fontSize={16} fontWeight='semibold'>Nguyễn Văn Mượt</Text>
                                                <Text fontSize={16} marginBottom={15} color='gray.500'>2 months ago</Text>
                                            </Stack>
                                        </Flex>
                                        <Ionicons name="heart-outline" size={22} />
                                    </Flex>

                                    <Flex
                                    >
                                        <Flex
                                            flexDirection='row'
                                            alignItems='center'
                                            columnGap={7.5}
                                        >
                                            <Ionicons name='chatbubble-outline' size={22} />
                                            <Text fontSize={14} fontWeight='semibold' color='gray.500'>1</Text>
                                        </Flex>
                                        <Text fontSize={14}>Khen</Text>
                                    </Flex>
                                </Box>

                                <Box
                                    marginBottom={15}
                                >
                                    <Flex
                                        flexDirection='row'
                                        justifyContent='space-between'
                                        alignItems='center'
                                    >
                                        <Flex
                                            flexDirection='row'
                                            style={{ columnGap: 15 }}
                                        >
                                            <Avatar />
                                            <Stack>
                                                <Text fontSize={16} fontWeight='semibold'>Nguyễn Văn Mượt</Text>
                                                <Text fontSize={16} marginBottom={15} color='gray.500'>2 months ago</Text>
                                            </Stack>
                                        </Flex>
                                        <Ionicons name="heart-outline" size={22} />
                                    </Flex>

                                    <Flex
                                    >
                                        <Flex
                                            flexDirection='row'
                                            alignItems='center'
                                            columnGap={7.5}
                                        >
                                            <Ionicons name='chatbubble-outline' size={22} />
                                            <Text fontSize={14} fontWeight='semibold' color='gray.500'>1</Text>
                                        </Flex>
                                        <Text fontSize={14}>Khen</Text>
                                    </Flex>
                                </Box>
                            </Flex> */}

                        </Box>

                        <GradientButton onPress={() => navigation.navigate('Lessee note before order',{product: product})} radius={10} fontSize={18} text='Bắt đầu thuê' height={55} colors={['#9F3553', '#E98EA6']} />
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