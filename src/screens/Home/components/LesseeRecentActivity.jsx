import { Box, Flex, Stack, Text } from "native-base";
import React from "react";
import { StyleSheet, Animated, ScrollView, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useLayoutEffect } from "react";
import { GradientButton } from "../../../components/GradientButton";
import { useIsFocused } from "@react-navigation/native";



import {store} from '../../../state/store'
import * as OrderService from "../../../services/Order";


export const LesseeRecentActivity = ({ navigation }) => {

    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const user = store.useState((state) => state.user);
    const [orderList, setOrderList] = React.useState([]);
    const orderStatus = store.useState((state) => state.orderStatus);
    const orderStatusColor = store.useState((state) => state.orderStatusColor);

    React.useEffect(() => {
        OrderService.getAllLessee(user.userId).then((res) => {
            setOrderList(res);
        })
    }, [useIsFocused()]);


    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);


    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <Text fontWeight='bold' fontSize={18}>Giao dịch gần đây</Text>,
            headerLeft: () => <Ionicons name="chevron-back" size={18} onPress={() => navigation.goBack()} />,
            headerRight: () => <GradientButton paddingLeft={0} paddingRight={0} paddingTop={0} paddingBottom={0} prefixIcon={<Ionicons name="refresh-outline" size={22} />} width={45} height={45} radius={15} colors={['#9F3553', '#E98EA6']} />,
        });
    }, [navigation]);

    return (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            <Stack
                paddingX={15}
                paddingY={30}
                width='100%'
                display='flex'
                flexDirection='column'
                height='100vh'
                overflow='hidden'
            >
                
                {orderList ? (
                    <ScrollView>
                        {orderList.map((order, index) => (
                            <View
                                key={index}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',
                                    paddingBottom: 15,
                                }}
                                onTouchEnd={() =>
                                    navigation.navigate('LesseeViewProductDetail', {
                                        orderId: order.listing,
                                    })
                                }
                            >
                                <Box width={150} height={100}>
                                    <Image
                                        source={{ uri: order.listing.images[0] }}
                                        borderRadius={10}
                                    />
                                </Box>
                                <View style={{ flex: 1 }}>
                                    <Text
                                        textAlign="left"
                                        fontSize={16}
                                        fontWeight={700}
                                        color="#01005C"
                                    >
                                        {order.listing.product.productName}
                                    </Text>
                                    <Text textAlign="left" fontSize={14} fontWeight={700}>
                                        {order.lessor.firstName} {order.lessor.middleName}{' '}
                                        {order.lessor.lastName}
                                    </Text>
                                    <Flex
                                        flexDirection="row"
                                        alignItems="center"
                                        style={{
                                            columnGap: 5,
                                        }}
                                    >
                                        <Ionicons name="information-circle-outline" size={18} />
                                        <Text
                                            textAlign="left"
                                            color={orderStatusColor[order.orderStatus]}
                                        >
                                            {orderStatus[order.orderStatus]}
                                        </Text>
                                    </Flex>
                                </View>
                                <Ionicons name="chevron-forward" size={20} />
                            </View>
                        ))}
                    </ScrollView>
                ) : (
                    <Text>Chưa có mở hàng nha 👁️3👁️</Text>
                )}
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