import { Avatar, Box, Checkbox, Flex, Image, Input, ScrollView, Stack, Text, View } from "native-base";
import React from "react";
import { StyleSheet, Animated } from "react-native";
import Prod1 from '../../../assets/images/prod1.png'
import { useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { GradientButton } from "../../../components/GradientButton";
import AvatarUser from '../../../assets/images/demo/ava-lessor.png'

export const LessorViewProductDetail = ({ navigation, route }) => {

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
            headerTitle: () => <Text fontWeight='bold' fontSize={18}>{product.name}</Text>,
            headerLeft: () => <Ionicons name="chevron-back" size={18} onPress={() => navigation.goBack()} />,
        });
    }, [navigation, product]);

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
                            style={{columnGap: 15}}
                            justifyContent='center'
                            width='100%'
                        >
                            <Image alt="image" borderRadius={10} source={Prod1} height={140} width={140} />
                        </Flex>

                        <Box
                            marginTop={15}
                        >
                            <Text fontSize={16} fontWeight='semibold'>Mô tả sản phẩm</Text>
                            <Text fontSize={16} marginBottom={15}>Tình trạng tốt, cond 9.5, trước mua về đề qua môn nên ít khi sử dụng.
                                (Vui lòng để lại tin nhắn)</Text>

                            <Text fontSize={16} fontWeight='semibold' marginBottom={7.5}>Người yêu cầu</Text>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',
                                    padding: 15,
                                    backgroundColor: '#FFF',
                                    borderRadius: 15,
                                    columnGap: 15,
                                    marginBottom: 15
                                }}
                            >
                                <Box ><Image width={100} height={100} source={AvatarUser} borderRadius={10} alt="thumbnail" /></Box>
                                <View
                                    style={{ flex: 1 }}
                                >
                                    <Flex
                                        flexDirection='column'
                                        justifyContent='space-between'
                                    >
                                        <Text textAlign='left' numberOfLines={1} ellipsizeMode='tail' fontSize={16} fontWeight='semibold' color='#01005C'>Người Đẹp Trai</Text>
                                        <Text>MSSV: SE170000</Text>
                                    </Flex>
                                    <Flex paddingX={2} paddingY={1} width='100%' borderRadius={10} backgroundColor='gray.200' flexDirection='row' style={{columnGap: 15}} alignItems='center'>
                                        <Flex width={35} height={35}>
                                            <Ionicons name='heart-outline' size={32} />
                                        </Flex>
                                        <Stack>
                                            <Text fontWeight='semibold' fontSize={14} color='#0066FF'>100%</Text>
                                            <Text>Review(25)</Text>
                                        </Stack>
                                    </Flex>
                                </View>
                            </View>
                        </Box>

                        <GradientButton onPress={() => navigation.goBack()} radius={10} fontSize={18} text='Bắt đầu cho thuê' height={55} colors={['#2A46B4', '#269DDB']} />
                    </Stack>
                </ScrollView>
            </Box>
        </Animated.View>
    );
};

