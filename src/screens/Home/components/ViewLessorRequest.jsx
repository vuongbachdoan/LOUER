import { Avatar, Box, Checkbox, Flex, ScrollView, Stack, Text } from "native-base";
import React from "react";
import { StyleSheet, Animated } from "react-native";
import { GradientButton } from "../../../components/GradientButton";
import { useState } from "react";
import { useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

import { store } from "../../../state/store";

export const ViewLessorRequest = ({ navigation, route }) => {

    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <Text fontWeight='bold' fontSize={24} color='#FDB400'></Text>,
            headerShown: false
        });
    }, [navigation]);

    const { request } = route.params;

    return (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            <Stack
                paddingLeft={15}
                paddingRight={15}
                paddingTop={30}
                flex={1}
            >
                <Stack>
                    <Text textAlign='center' fontSize={24} width='75%' marginX='auto' fontWeight='semibold'>{request.title}</Text>

                    <Text marginTop={15} marginBottom={7.5} fontSize='16' fontWeight='semibold'>Người yêu cầu</Text>
                    <Flex
                        flexDirection='row'
                        justifyContent='space-between'
                        backgroundColor='#FFF'
                        padding='15'
                        borderRadius={15}
                        borderWidth={0.5}
                        borderColor='#CCC'
                    >
                        <Stack>
                            <Text fontWeight='semibold' fontSize={18} color='#0066FF'>Người Đẹp Trai</Text>
                            <Flex
                                flexDirection='row'
                                style={{columnGap: 15}}
                            >
                                <Ionicons name="heart-outline" size={22} />
                                <Stack>
                                    <Text fontWeight='semibold' fontSize={14} color='#0066FF'>95%</Text>
                                    <Text>Review(25)</Text>
                                </Stack>
                            </Flex>
                        </Stack>

                        <Avatar bg="lightBlue.400" source={{
                            uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                        }} size="md">
                            Avt
                            <Avatar.Badge bg="green.500" />
                        </Avatar>
                    </Flex>

                    <Text marginTop={15} fontSize='16' fontWeight='semibold'>Yêu cầu sản phẩm</Text>
                    <Text fontSize='14'>2 Cam tình trạng tốt, cond cao,tối thiểu là Nikon D7000. Thuê khoảng chiều t3 này.</Text>

                    <Text marginTop={15} fontSize='16' fontWeight='semibold'>Thông tin giao nhận</Text>
                    <Text fontSize='14' fontWeight='semibold'>Nơi thuê</Text>
                    <Text fontSize='14'>{request.address}</Text>
                    <Text fontSize='14' fontWeight='semibold'>Thời gian thuê</Text>
                    <Text fontSize='14'>{request.startAt} - {request.endAt}</Text>

                    <Stack marginTop={15}>
                        <GradientButton text='Gửi yêu cầu cho thuê' colors={['#2A4AB6', '#269DDB']} radius={10} height={55}/>
                    </Stack>
                </Stack>
            </Stack>
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