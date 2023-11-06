import { Box, Button, Checkbox, Flex, Image, Input, Stack, Text } from "native-base";
import React from "react";
import { StyleSheet, Animated, View, Platform } from "react-native";
import { useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { GradientButton } from "../../../components/GradientButton";
// import  from "@react-native-community/datetimepicker";





export const LesseeSendRequest = ({ navigation, route }) => {


    const listing = route.params.listing;

    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const [isBanking, setIsBanking] = React.useState(false);
    const [isChecked, setChecked] = React.useState(false);
    const [date, setDate] = React.useState(new Date());
    const [dateStart, setDateStart] = React.useState(new Date());
    const [dateEnd, setDateEnd] = React.useState(new Date());
    const [mode, setMode] = React.useState('date');
    const [show, setShow] = React.useState(false);

    const onChangeDate = (e, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        return currentDate;
        setDate(currentDate);
    }

    const showMode = (modeToShow) => {
        setShow(true);
        setMode(modeToShow);
    }



    const handleDateCal = () => {
        return 3;
    }


    const handlePriceCal = () => {
        return listing.price * handleDateCal();
    }










    const handleAllow = () => {
        setChecked(!isChecked);
    }


    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            <Box
                width='100%'
                display='flex'
                flexDirection='column'
                minHeight='100%'
                overflow='hidden'
            >
                <Box size={5} />
                <Flex
                    width='100%'
                    flexDirection='row'
                    justifyContent='space-between'
                    alignItems='center'
                    paddingX={15}
                    paddingTop={30}
                >

                    <Flex><Ionicons name="chevron-back" size={22} onPress={() => navigation.goBack()} /></Flex>
                    <Text textAlign='center' flex={1} fontSize={22} fontWeight='semibold'>Gửi cầu cho thuê</Text>
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


                        <Flex
                            display='flex'
                            flexDirection='row'
                            flexWrap='wrap'
                            justifyContent='space-between'
                            style={{ columnGap: 15 }}
                        >
                            <Stack marginTop={15}>
                                <Text fontSize={16} fontWeight='semibold'>Ngày bắt đầu</Text>
                                <Flex flexDirection='row' style={{ columnGap: 15 }} alignItems='flex-end'>
                                    <Stack>
                                        <Text textAlign='right'>Ngày</Text>
                                        <Button
                                            style={{
                                                backgroundColor: 'transparent',
                                                borderColor: 'gray',
                                                borderWidth: 1,
                                                borderRadius: 10,
                                                height: 50,
                                                width: 100,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                            onPress={() => showMode('date')}
                                        >

                                            <Text color="gray.500" fontSize={20} fontWeight='semibold' textAlign='center'>12/03</Text>
                                        </Button>
                                        {show && (
                                            <RNDateTimePicker
                                                value={date}
                                                mode={mode}
                                                is24Hour={true}
                                                onChange={onChangeDate}
                                            />

                                        )}
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
                                <Flex flexDirection='row' style={{ columnGap: 15 }} alignItems='flex-end'>
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

                                <Checkbox
                                    colorScheme="green"
                                    isChecked={isChecked}
                                    onChange={handleAllow}
                                >Chuyển khoản (khuyên dùng)
                                </Checkbox>
                                {/* <Checkbox colorScheme="green">
                                    Tiền mặt
                                </Checkbox> */}
                            </Stack>
                        </Flex>

                        <Stack >
                            <Text fontSize={16} fontWeight='semibold'>Số tiền: {listing.price.toLocaleString()}đ/ ngày</Text>
                            <Text fontSize={16} fontWeight='semibold'>Số ngày: {handleDateCal()} ngày </Text>
                            <Text fontSize={16} fontWeight='semibold'>Tổng tiền: {handlePriceCal().toLocaleString()}đ</Text>
                        </Stack>
                    </Flex>

                    <Stack
                        marginTop={30}
                    >
                        <GradientButton
                            text='Tiếp tục'
                            radius={10} fontSize={18} height={55}
                            colors={isChecked ? ['#9F3553', '#E98EA6'] : ['gray', 'gray']}
                            disabled={!isChecked} />
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