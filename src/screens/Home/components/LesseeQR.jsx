import { Avatar, Badge, Box, Button, Flex, Icon, Image, Input, Text } from "native-base";
import React from "react";
import * as Clipboard from 'expo-clipboard';
import { StyleSheet, Animated } from "react-native";
import vietinbank from '../../../assets/images/vietinbank.png';
import { GradientButton } from "../../../components/GradientButton";
import { useState } from "react";
import { store } from "../../../state/store";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as Toast from "../../../components/Toast";


export const LesseeQR = ({ navigation, route }) => {

    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const product = route.params.product;
    const louerBank = store.useState((state) => state.louerBank);

    const [isPaid, setIsPaid] = useState(false);
    const [des, setDes] = useState('');
    const [qrLink, setQRLink] = useState('');


    const makeQRLink = () => {
        const amount = 50000;
        const url = `https://img.vietqr.io/image/${louerBank.bankName}-${louerBank.cardNumber}-qr_only.png?amount=${amount}&addInfo=${des}`;
        setQRLink(url);
    };

    const copyToClipboard = async (text) => {
        await Clipboard.setStringAsync(text);
    };

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    React.useEffect((async ) => {
        setTimeout(() => {
            if (!isPaid){
                
            }
        }, 3000);
       
    },useIsFocused(), [isPaid==false]);



    React.useEffect(() => {
        setDes(`louer-${product.productId}`);
        makeQRLink();
    }, [useIsFocused()]);


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
                    <Image alt="user" source={{ uri: qrLink}} width={250} height={250} borderRadius={15} />
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
                            paddingTop={15}
                            paddingBottom={15}
                        >
                            <Text fontSize={14} color='gray.500'>{louerBank.cardName} - {louerBank.bankNameFull}</Text>
                            <Image
                                source={vietinbank}
                                style={{ height: '140%', flex: 1, resizeMode: 'contain' }}
                            />
                        </Flex>

                        <Text fontSize={14} fontWeight='semibold'>Số tài khoản</Text>
                        <Input
                            size="xl" borderRadius={10} marginTop={7.5} marginBottom={15}
                            placeholder={louerBank.cardNumber}
                            isReadOnly={true}
                            InputRightElement={
                                <Button
                                    variant="unstyled"
                                    onPress={() => {
                                        copyToClipboard(louerBank.cardNumber);
                                        console.log('Copied card number');
                                        Toast.show('Đã sao chép số tài khoản');
                                    }}
                                >
                                    <Icon as={<Ionicons name="clipboard" />} size="xl"
                                        color={'gray.500'} />
                                </Button>
                            }
                        />
                        <Text fontSize={14} fontWeight='semibold'>Nội dung chuyển khoản</Text>
                        <Input
                            size="xl" borderRadius={10} marginTop={7.5} marginBottom={15}
                            placeholder={des}
                            isReadOnly={true}
                            InputRightElement={
                                <Button
                                    variant="unstyled"
                                    onPress={() => {
                                        copyToClipboard(des);
                                        console.log('Copied trans des');
                                        Toast.show('Đã sao nội dung chuyển khoản');
                                    }}
                                >
                                    <Icon as={<Ionicons name="clipboard" />} size="xl"
                                        color={'gray.500'} />
                                </Button>
                            }
                        />
                        <Text fontSize={14} fontWeight='semibold'>Số tiền</Text>
                        <Input
                            size="xl" borderRadius={10} marginTop={7.5} marginBottom={15}
                            placeholder={des}
                            isReadOnly={true}
                            InputRightElement={
                                <Button
                                    variant="unstyled"
                                    onPress={() => {
                                        copyToClipboard(des);
                                        console.log('Copied trans des');
                                        Toast.show('Đã sao nội dung chuyển khoản');
                                    }}
                                >
                                    <Icon as={<Ionicons name="clipboard" />} size="xl"
                                        color={'gray.500'} />
                                </Button>
                            }
                        />
                        <GradientButton onPress={() => setIsPaid(true)} text='Tiếp tục' radius={10} fontSize={18} height={55} colors={['#9F3553', '#E98EA6']} />
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