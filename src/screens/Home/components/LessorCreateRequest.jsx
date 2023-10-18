import { Box, Button, Checkbox, Flex, Image, Input, Stack, Text } from "native-base";
import React from "react";
import { StyleSheet, Animated, View, Platform } from "react-native";
import { useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'react-native-image-picker';
import { GradientButton } from "../../../components/GradientButton";

export const LessorCreateRequest = ({ navigation, route }) => {

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
                    <Text textAlign='center' flex={1} fontSize={22} fontWeight='semibold'>Thêm sản phẩm cho thuê</Text>
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
                        <Text fontWeight='semibold'>Tên sản phẩm</Text>
                        <Input placeholder="Cần camera" borderRadius={10} />
                        <Text fontWeight='semibold'>Mô tả sản phẩm</Text>
                        <Input placeholder="Nikon D700" borderRadius={10} />
                        <Text fontWeight='semibold'>+ Hình ảnh (bắt buộc)/video</Text>

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
                            <GradientButton width={45} height={45} paddingBottom={0} paddingLeft={0} paddingRight={0} paddingTop={0} prefixIcon={<Ionicons name="camera-outline" size={22} color='white' />} colors={['#2A4AB6', '#269DDB']} />
                            <Text>Tải lên ảnh/video</Text>
                        </Flex>

                        <Flex
                            flexDirection='row'
                            style={{
                                columnGap: 5
                            }}
                            alignItems='center'
                        >
                            <Ionicons color='orange' name="information-circle-outline" size={20} />
                            <Text>Hình ảnh phải xác thực được tình trạng của sản phẩm</Text>
                        </Flex>

                        <Text fontWeight='semibold'>Giá thuê</Text>
                        <Flex
                            flexDirection='row'
                            alignItems='center'
                            style={{
                                columnGap: 5
                            }}
                        >
                            <Input placeholder="Giá" borderRadius={10} width={100} />
                            <Text>/ Ngày</Text>
                        </Flex>
                    </Flex>

                    <Stack
                        marginTop={30}
                    >
                        <GradientButton onPress={() => navigation.navigate('HomeScreen')} text='Thêm sản phẩm' radius={10} fontSize={18} height={55} colors={['#2A4AB6', '#269DDB']} />
                    </Stack>
                </Box>
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