import { Avatar, Badge, Box, Button, Flex, Icon, Image, Input, Text, Spacer, useToast } from "native-base";
import React from "react";
import { StyleSheet, Animated } from "react-native";
import QR from '../../../assets/images/qr.png';
import BankLogo from '../../../assets/images/vietinbank.png';
import { GradientButton } from "../../../components/GradientButton";
import { useState } from "react";
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from "@expo/vector-icons";

// import {genImgLink}  from "../../../services/QR";







export const LesseeQR = ({ navigation, route }) => {


    const copyToClipboard = async (text,description) => {
        await Clipboard.setStringAsync(text);
        toast.show({
            description: {description},
        })
    };

    const louerCardDetail = {
        bankLogo: { BankLogo },
        BankId: '970415', //VietinBank
        cardHolder: 'HOANG VU MINH TAI',
        cardNumber: '104879541523',
        amount: 100000,
        transNote: "qrsu2h",
    };





    const genImgLink = (bankId, cardNumber, accName, amount, transNote) => {
        try {
            const img = `https://img.vietqr.io/image/${bankId}-${cardNumber}-qr_only.png?amount=${amount}&addInfo=${transNote}&accountName=${accName}`;
            return img;
        } catch (error) {
            outputError(error);
        }
    };

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

    const qrLink = genImgLink(louerCardDetail.BankId, louerCardDetail.cardNumber, louerCardDetail.cardHolder, louerCardDetail.amount, louerCardDetail.transNote);


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
                    <Image alt="user" source={qrLink} width={140} height={140} borderRadius={15} />
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
                            <Text fontSize={12} color='gray.500' fontWeight='bold'>{louerCardDetail.cardHolder}</Text>
                            <Image source={BankLogo} height='45px' width={130} style={{ position: 'relative', bottom: '1.8%' }} />
                        </Flex>

                        <Text fontSize={14} fontWeight='semibold'>Số tài khoản</Text>
                        <Badge
                            borderRadius={10} marginTop={7.5} marginBottom={15} colorScheme="gray"
                            onPress={() => {
                                copyToClipboard(louerCardDetail.cardNumber,"đã copy số thẻ");
                            }}
                        >
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
                                    style={{ marginRight: 10 }}
                                />
                            </Flex>
                        </Badge>
                        <Text fontSize={14} fontWeight='semibold'>Nội dung chuyển khoản</Text>
                        <Badge
                            borderRadius={10} marginTop={7.5} marginBottom={15} colorScheme="gray"
                            onPress={() => {
                                copyToClipboard(louerCardDetail.transNote,"đã copy nội dung");
                            }}
                        >
                            <Flex
                                flexDirection='row'
                                justifyContent='space-between'
                                alignItems='center'
                            >
                                <Text fontSize={18} color='gray.500'>{louerCardDetail.transNote}</Text>
                                <Spacer />
                                <Ionicons
                                    name="copy-outline"
                                    paddingLeft={160}
                                    size={20}
                                    style={{ marginRight: 10 }}
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