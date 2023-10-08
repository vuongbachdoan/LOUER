import { Avatar, Badge, Box, Button, Flex, Icon, Image, Input, Text, Spacer, useToast } from "native-base";
import React from "react";
import { StyleSheet, Animated } from "react-native";
import QR from '../../../assets/images/qr.png';
import Visa from '../../../assets/images/visa.png';
import { GradientButton } from "../../../components/GradientButton";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";


const louerCardDetail = {
    qrLink: { QR },
    visaLogo: { Visa },
    cardHolder: 'Hoang Tien Dat - Vietcombank',
    cardNumber: '1234 5678 9012 3456',
    transactionNote: 'RG7573',
};

export const LesseeQR = ({ navigation, route }) => {

    const toast = useToast();

    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const [isPaid, setIsPaid] = useState(false);

    return (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            <Box
                paddingX={15}
                paddingY={30}
                width='100%'
                display='flex'
                flexDirection='column'
                minHeight='100%'
                overflow='hidden'
            >
                <Flex
                    flexDirection='column'
                    rowGap={15}
                    alignItems='center'
                >
                    <Image alt="user" source={QR} width={140} height={140} borderRadius={15} />
                    {
                        isPaid &&
                        <Badge width='100%' padding='15px' borderRadius={10} colorScheme="green">
                            <Text>Đã thanh toán thành công</Text>
                        </Badge>
                    }
                    <Box
                        marginX={15}
                        backgroundColor='#FFF'
                        padding={15}
                        borderRadius={15}
                        width='100%'
                        borderWidth={0.5}
                        borderColor='#CCC'
                    >
                        <Text fontSize={14} fontWeight='semibold'>Thông tin tài khoản (phía Louer)</Text>
                        <Flex
                            flexDirection='row'
                            justifyContent='space-between'
                            alignItems='center'
                        >
                            <Text fontSize={12} color='gray.500'>{louerCardDetail.cardHolder}</Text>
                            <Image source={Visa} height='56px' />
                        </Flex>

                        <Text fontSize={14} fontWeight='semibold'>Số tài khoản</Text>
                        <Badge borderRadius={10} marginTop={7.5} marginBottom={15} colorScheme="gray">
                            <Flex
                                flexDirection='row'
                                justifyContent='space-between'
                                alignItems='center'
                            >
                                <Text fontSize={18} color='gray.500'>{louerCardDetail.cardNumber}</Text>
                                <Spacer />
                                <Ionicons 
                                    name="copy-outline" 
                                    paddingLeft={50} 
                                    size={20} 
                                    style={{marginRight: 10}}
                                    onPress={() => toast.show({
                                        description: "đã copy số thẻ",
                                    })}
                                />
                            </Flex>
                        </Badge>
                        <Text fontSize={14} fontWeight='semibold'>Nội dung chuyển khoản</Text>
                        <Badge borderRadius={10} marginTop={7.5} marginBottom={15} colorScheme="gray">
                            <Flex
                                flexDirection='row'
                                justifyContent='space-between'
                                alignItems='center'
                            >
                                <Text fontSize={18} color='gray.500'>{louerCardDetail.transactionNote}</Text>
                                <Spacer />
                                <Ionicons 
                                    name="copy-outline" 
                                    paddingLeft={160} 
                                    size={20} 
                                    style={{marginRight: 10}}
                                    onPress={() => toast.show({
                                        description: "đã copy nội dung",
                                    })}
                                />
                            </Flex>
                        </Badge>

                        <GradientButton 
                            onPress={() => {
                                setIsPaid(true);
                                window.$paidStat = true;
                                console.log(window.$paidStat);
                            }} 
                            text='Tiếp tục' 
                            radius={10} 
                            fontSize={18} 
                            height={55} 
                            colors={['#9F3553', '#E98EA6']} 
                        />
                    </Box>
                </Flex>
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