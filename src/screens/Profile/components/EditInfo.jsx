import { Avatar, Box, Button, Flex, Image, Text, Stack, Heading, Input, useToast } from "native-base";
import React from "react";
import { StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GradientButton } from "../../../components/GradientButton";


export const EditInfo = ({ navigation, route }) => {

    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    const toast = useToast();

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

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
                    <Stack
                        display='flex'
                        justifyContent='space-between'
                        flexDirection='row'
                        alignItems='flex-start'
                    >
                        <Image 
                                alt="user" 
                                marginRight={8}
                                source={{
                                uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                }} width={90} height={90} borderRadius={15} 
                                />
                        <Stack
                            display='flex'
                            justifyContent='space-between'
                            flexDirection='column'
                            alignItems='flex-start'
                        >
                            <Text fontSize={26} fontWeight='semibold' color='#1B6BB5'>Người Đẹp Trai</Text>
                            <Text
                                style={{
                                    color: '#545454',
                                    fontSize: 15,
                                    fontWeight: '400',
                                }}
                            >
                                MSSV: ANVSE170000
                            </Text>
                        </Stack>
                    </Stack>


                    <Button
                        width='100%'
                        height={60}
                        backgroundColor='#EDEDED'
                        color='#000'
                        display='flex'
                        flexDirection='row'
                        columnGap={30}
                        justifyContent='flex-start'
                        borderRadius={10}
                        borderWidth={1}
                        borderColor='#EDEDED'
                    >
                        <Text
                            style={{
                                color: '#545454',
                                fontSize: 15,
                                fontWeight: '600',
                                lineHeight: 22,
                                wordWrap: 'break-word'
                            }}
                        >
                            anvse170000@fpt.edu.vn
                        </Text>
                    </Button>
                    <Input
                        type="submit"

                        // value="Đăng xuất"
                        style={{
                            width: '80%',
                            height: '60',
                            color: '#000',
                            display: 'flex',
                            flexDirection: 'row',
                            columnGap: 30,
                            justifyContent: 'flex-start',
                            color: '#545454',
                            fontSize: 15,
                            fontWeight: '600',
                            lineHeight: 22,
                        }}
                        placeholder="Số điện thoại"
                    />
                    <Input
                        type="submit"
                        // value="Đăng xuất"
                        style={{
                            width: '80%',
                            color: '#000',
                            display: 'flex',
                            flexDirection: 'row',
                            columnGap: 30,
                            justifyContent: 'flex-start',
                            color: '#545454',
                            fontSize: 15,
                            fontWeight: '600',
                            lineHeight: 22,
                        }}
                        placeholder="Địa điểm thuê"
                    />
                    <GradientButton 
                        text='Thay đổi thông tin' colors={['#2A4AB6', '#269DDB']}
                        onPress={() => toast.show({
                            description: "Thay đổi thông tin thành công",
                        })}
                        // width={'80%'} 
                        // height={'100%'} 
                        // borderradius={5} paddingBottom={0} paddingTop={0} paddingLeft={0} paddingRight={0} 
                        />

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