import { Avatar, Badge, Box, CheckIcon, Flex, Image, Input, ScrollView, Select, Stack, Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GradientButton } from "../../components/GradientButton";
import { store } from "../../state/store";
import * as UserService from "../../services/User";

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

export const ProfileInformation = ({ navigation }) => {
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const user = store.useState((state) => state.user);
    const [updateStatus, setUpdateStatus] = React.useState(false);
    const userModeChange = store.useState((state) => state.user.userMode);

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const handleChangeuserMode = (userMode) => {
        if (userModeChange !== user.userMode) {
            UserService.updateModeById(user.userId);
            store.update((state) => {
                state.user.userMode = userModeChange;
            });
            setUpdateStatus(true)
        }
        
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
                        style={{ columnGap: 15 }}
                    >
                        <Box height={20} />
                        <Flex><Ionicons name="chevron-back" size={22} onPress={() => navigation.goBack()} /></Flex>
                        <Text fontSize={22} fontWeight='semibold'>Thông tin cá nhân</Text>
                    </Flex>

                </Flex>
                <Box
                    flex={1}
                    width='100%'
                    marginTop={5}
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
                        <Box ><Image width={100} height={100} source={{ uri: user.images[0]}} borderRadius={10} alt="thumbnail" /></Box>
                        <View
                            style={{ flex: 1 }}
                        >
                            <Flex
                                flexDirection='column'
                                justifyContent='space-between'
                            >
                                <Text textAlign='left' numberOfLines={1} ellipsizeMode='tail' fontSize={16} fontWeight='semibold' color='#01005C'>{user?.firstName ?? ''} {user?.middleName ?? ''} {user?.lastName ?? ''}</Text>
                                <Text>MSSV: {user?.studentId ?? ''}</Text>
                            </Flex>
                        </View>
                    </View>

                    <Text fontWeight='semibold'>Thay đổi thông tin cá nhân bên dưới</Text>
                    <Box height={5} />
                    <Select
                        selectedValue={userModeChange ? 'Lessor' : 'Lessee'}
                        height={45}
                        width={120}
                        accessibilityLabel="Select userMode"
                        placeholder={userModeChange ? 'Lessor' : 'Lessee'}
                        borderRadius={15}
                        fontSize={14}
                        fontWeight={700}
                        _selectedItem={{
                            bg: 'gray.100',
                            endIcon: <CheckIcon size="5" />
                        }} onValueChange={itemValue => handleChangeuserMode(itemValue)}
                    >
                        <Select.Item label="Lessee" value={false} />
                        <Select.Item label="Lessor" value={true} />
                    </Select>
                    <Flex
                        marginTop={15}
                        flexDirection='column'
                        style={{
                            rowGap: 15
                        }}
                    >
                        <Input fontSize={18} value={user?.email} placeholder='Email' leftElement={<Stack marginLeft={15}><Ionicons name="at-outline" size={22} /></Stack>} height='50px' borderRadius={15} editable={false} />
                        <Input fontSize={18} value={user?.phone} placeholder={(user?.phone  ?? 'Phone')} leftElement={<Stack marginLeft={15}><Ionicons name="call-outline" size={22} /></Stack>} height='50px' borderRadius={15} />
                        <Input fontSize={18} value={user?.address} placeholder="Địa điểm thuê" leftElement={<Stack marginLeft={15}><Ionicons name="home-outline" size={22} /></Stack>} height='50px' borderRadius={15} />
                        <Input fontSize={18} value={user?.bankBranch} placeholder="Tên Ngân Hàng" leftElement={<Stack marginLeft={15}><Ionicons name="card-outline" size={22} /></Stack>} height='50px' borderRadius={15} />
                        <Input fontSize={18} value={user?.bankAccount} placeholder="Số tài khoản" leftElement={<Stack marginLeft={15}><Ionicons name="card-outline" size={22} /></Stack>} height='50px' borderRadius={15} />

                        {
                            updateStatus &&
                            <Badge width='100%' padding='15px' borderRadius={10} colorScheme="green">
                                <Text>Cập nhật thông tin thành công</Text>
                            </Badge>
                        }
                        <GradientButton
                            onPress={() =>
                                handleChangeuserMode()
                            }
                            text='Cập nhật thông tin'
                            colors={user?.userMode ? ['#2A4AB6', '#269DDB'] : ['#9F3553', '#E98EA6']}
                            height={55} radius={15} />
                    </Flex>
                </Box>
            </Box>
        </Animated.View >
    );
}