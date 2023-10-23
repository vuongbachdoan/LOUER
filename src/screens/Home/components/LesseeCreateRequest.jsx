import { Box, Button, Checkbox, Flex, Image, Input, Stack, Text } from "native-base";
import React from "react";
import { StyleSheet, Animated, View, Platform } from "react-native";
import { useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'react-native-image-picker';
import { GradientButton } from "../../../components/GradientButton";

export const LesseeCreateRequest = ({ navigation, route }) => {

    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);


    const handleImageUpload = () => {
        let options = {
            mediaType: 'photo', // 'photo' or 'video'
            includeBase64: true,
            maxHeight: 200,
            maxWidth: 200,
        };

        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.uri };
                console.log(source);
            }
        });
    };


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
                    <Text textAlign='center' flex={1} fontSize={22} fontWeight='semibold'>Tạo yêu cầu cho thuê</Text>
                </Flex>

                <Box
                    marginX={15}
                >
                    <Flex
                        flexDirection='column'
                        style={{
                            rowGap: 15
                        }}
                    >
                        <Text fontWeight='semibold'>Tiêu đề</Text>
                        <Input placeholder="Cần camera" borderRadius={10} />
                        <Text fontWeight='semibold'>Sản phẩm (không bắt buộc)</Text>
                        <Input placeholder="Nikon D700" borderRadius={10} />
                        <Text fontWeight='semibold'>+ Hình ảnh</Text>

                        <Flex
                            flexDirection='row'
                            justifyContent='center'
                            borderWidth={1}
                            borderColor='#9F3553'
                            borderRadius={15}
                            padding={3}
                            borderStyle='dashed'
                            alignItems='center'
                            style={{
                                columnGap: 15
                            }}
                        >
                            <GradientButton width={45} height={45} paddingBottom={0} paddingLeft={0} paddingRight={0} paddingTop={0} prefixIcon={<Ionicons name="camera-outline" size={22} color='white' />} colors={['#9F3553', '#E98EA6']} />
                            <Text>Tải lên ảnh/video</Text>
                        </Flex>

                        <Flex
                            display='flex'
                            flexDirection='row'
                            flexWrap='wrap'
                            justifyContent='space-between'
                            style={{columnGap: 15}}
                        >
                            <Stack marginTop={15}>
                                <Text fontSize={16} fontWeight='semibold'>Ngày bắt đầu</Text>
                                <Flex flexDirection='row' style={{columnGap: 15}} alignItems='flex-end'>
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
                                <Flex flexDirection='row' style={{columnGap: 15}} alignItems='flex-end'>
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

                            <Stack
                                marginTop={15}
                            >
                                <Text fontSize={16} fontWeight='semibold'>Phương thức thanh toán</Text>
                                <Checkbox colorScheme="green">
                                    Chuyển khoản (khuyên dùng)
                                </Checkbox>
                                <Checkbox colorScheme="green">
                                    Tiền mặt
                                </Checkbox>
                            </Stack>
                        </Flex>
                    </Flex>

                    <Stack
                        marginTop={30}
                    >
                        <GradientButton text='Tiếp tục' radius={10} fontSize={18} height={55} colors={['#9F3553', '#E98EA6']} />
                    </Stack>
                </Box>


                {/* <ScrollView>
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
                            alignItems='flex-start'
                            width='100%'
                        >
                            <Image borderRadius={10} source={Prod1} height={140} width={140} alt="product thumbnal"/>
                            <Flex flex={1} flexDirection='column' rowGap={7.5}>
                                <Text fontSize={16} fontWeight='semibold' textAlign='center'>Thông tin người thuê</Text>
                                <Flex paddingX={2} paddingY={1} flexDirection='row' style={{columnGap: 15}}>
                                    <Avatar bg="cyan.500" width={35} height={35} source={{
                                        uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                    }} />
                                    <Stack>
                                        <Text fontSize={14} fontWeight='semibold'>Nguyễn Văn John</Text>
                                        <Text fontSize={14} fontWeight='semibold' color='gray.500'>SE17000</Text>
                                    </Stack>
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
                                style={{columnGap: 15}}
                            >
                                <Stack marginTop={15}>
                                    <Text fontSize={16} fontWeight='semibold'>Ngày bắt đầu</Text>
                                    <Flex flexDirection='row' style={{columnGap: 15}} alignItems='flex-end'>
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
                                    <Flex flexDirection='row' style={{columnGap: 15}} alignItems='flex-end'>
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
                </ScrollView> */}
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
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    imageContainer: {
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 8,
    },
    errorText: {
        color: "red",
        marginTop: 16,
    },
})