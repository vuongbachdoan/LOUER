import { Avatar, Badge, Box, CheckIcon, Flex, Image, Input, ScrollView, Select, Stack, Text, View } from "native-base";
import React from "react";
import { StyleSheet, Animated } from "react-native";
import { useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import prodImage from '../../assets/images/prod1.png';
import { GradientButton } from "../../components/GradientButton";
import AvatarUser from '../../assets/images/placeholder.png';
import { store } from "../../state/store";
import { useEffect } from "react";

export const ProfileInformation = ({ navigation, route }) => {

    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const currentuserMode = store.useState((state) => state.user.userMode);

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const [updateStatus, setUpdateStatus] = React.useState(false);
    React.useEffect(() => {
        setTimeout(() => {
            setUpdateStatus(false);
        }, 3000)
    }, [updateStatus])

    const handleChangeuserMode = (userMode) => {
        store.update((state) => {
            state.user.userMode = userMode;
        });
    }

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
                    <Flex
                        flexDirection='row'
                        alignItems='center'
                        style={{columnGap: 15}}
                    >
                        <Flex><Ionicons name="chevron-back" size={22} onPress={() => navigation.goBack()} /></Flex>
                        <Text fontSize={22} fontWeight='semibold'>Thông tin cá nhân</Text>
                    </Flex>
                    <Avatar bg="amber.500" source={{
                        uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                    }} size="md">
                        <Avatar.Badge bg="green.500" />
                    </Avatar>
                </Flex>
                <Box
                    flex={1}
                    width='100%'
                    marginTop={15}
                    paddingX={15}
                >

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
                        </View>
                    </View>

                    <Text fontWeight='semibold'>Thay đổi thông tin cá nhân bên dưới</Text>
                    <Select
                        selectedValue={currentuserMode}
                        height={45}
                        width={120}
                        accessibilityLabel="Select userMode"
                        placeholder="Lessor"
                        borderRadius={15}
                        fontSize={14}
                        fontWeight={700}
                        _selectedItem={{
                            bg: 'gray.100',
                            endIcon: <CheckIcon size="5" />
                        }} onValueChange={itemValue => handleChangeuserMode(itemValue)}
                    >
                        <Select.Item label="Lessee" value="Lessee" />
                        <Select.Item label="Lessor" value="Lessor" />
                    </Select>
                    <Flex
                        marginTop={15}
                        flexDirection='column'
                        style={{
                            rowGap: 15
                        }}
                    >
                        <Input fontSize={18} placeholder="nguyenvana@fpt.edu.vn" leftElement={<Stack marginLeft={15}><Ionicons name="at-outline" size={22} /></Stack>} height='50px' borderRadius={15} />
                        <Input fontSize={18} placeholder="Số điện thoại" leftElement={<Stack marginLeft={15}><Ionicons name="call-outline" size={22} /></Stack>} height='50px' borderRadius={15} />
                        <Input fontSize={18} placeholder="Địa điểm thuê" leftElement={<Stack marginLeft={15}><Ionicons name="home-outline" size={22} /></Stack>} height='50px' borderRadius={15} />
                        <Input fontSize={18} placeholder="Số tài khoản" leftElement={<Stack marginLeft={15}><Ionicons name="card-outline" size={22} /></Stack>} height='50px' borderRadius={15} />

                        {
                            updateStatus &&
                            <Badge width='100%' padding='15px' borderRadius={10} colorScheme="green">
                                <Text>Cập nhật thông tin thành công</Text>
                            </Badge>
                        }
                        <GradientButton onPress={() => setUpdateStatus(true)} text='Cập nhật thông tin' colors={currentuserMode == 'Lessor' ? ['#2A4AB6', '#269DDB'] : ['#9F3553', '#E98EA6']} height={55} radius={15} />
                    </Flex>
                </Box>
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