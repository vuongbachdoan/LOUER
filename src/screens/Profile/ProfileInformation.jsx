import { Avatar, Badge, Box, CheckIcon, Flex, Image, Input, ScrollView, Select, Stack, Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GradientButton } from "../../components/GradientButton";
import { store } from "../../state/store";
import { getMainColor } from "../../state/color";

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
    const [chosenUserMode, setChosenUserMode] = React.useState(user.userMode);
    const [isFPTUser, setIsFPTUser] = React.useState(false);
    const [newAddress, setNewAddress] = React.useState(user.address);
    const address = store.useState((state) => state.address);

    const [editedInfo, setEditedInfo] = React.useState({
        studentId: '',
        firstName: '',
        lastName: '',
        middleName: '',
        phone: '',
        address: '',
        bankAccount: '',
        bankBranch: '',
    });

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    React.useEffect(() => {

    }, [updateStatus]);

    React.useEffect(() => {
        if (/[a-z0-9]{8,}@fpt\.edu\.vn/.test(user.email)) {
            // Case FPT
            setIsFPTUser(true);
        } else {
            setIsFPTUser(false);
        }
    }, [navigation]);


    const handleChangeUserMode = (userMode) => {
        setChosenUserMode(userMode);
    }

    const handleUpdateUsermode = async () => {
        if (user.userMode !== chosenUserMode) {
            UserService.updateUserMode(user.id).then(res => {
                store.update((state) => {
                    state.user.userMode = userMode;
                });
            });

        }
    }

    // Bữa sau nhớ thêm : Address, BankAccount, BankBranch
    const handleGetData = async () => {
        if (isFPTUser) {
            setEditedInfo({
                ...editedInfo,
                phone: 'new phone number'
            });
        } else {
            setEditedInfo({
                ...editedInfo,
                studentId: 'new student id',
                phone: 'new phone number',
                address: 'new address',

            });
        }







        const data = {
            phone: user.phone,
            address: user.address,
            bankAccount: user.bankAccount
        }
        UserService.updateUser(user.id, data).then(res => {
            store.update((state) => {
                state.user.phone = data.phone;
                state.user.address = data.address;
                state.user.bankAccount = data.bankAccount;
            });
            handleChangeUserMode();
            setUpdateStatus(true);
            Toast.show('Cập nhật thông tin thành công.');
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
                <Box height={15} />
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
                        <Flex><Ionicons name="chevron-back" size={22} onPress={() => navigation.goBack()} /></Flex>
                        <Text fontSize={22} fontWeight='semibold'>Thông tin cá nhân</Text>
                    </Flex>

                </Flex>
                <ScrollView
                >
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
                                paddingTop: 15,
                                paddingBottom: 15,
                                backgroundColor: '#FFF',
                                borderRadius: 15,
                                columnGap: 15,
                                marginBottom: 15
                            }}
                        >
                            <Box ><Image width={100} height={100} source={{ uri: user.images[0] ?? '' }} borderRadius={10} alt="thumbnail" /></Box>
                            <View
                                style={{ flex: 1 }}
                            >
                                <Flex
                                    flexDirection='column'
                                    justifyContent='space-between'
                                >
                                    <Text textAlign='left' numberOfLines={1} ellipsizeMode='tail' fontSize={20} fontWeight='semibold' color={(user.userMode) ? (getMainColor('lessor')) : (getMainColor('lessor'))}>{user?.firstName ?? ''} {user?.middleName ?? ''} {user?.lastName ?? ''}</Text>
                                    <Text fontSize={13} >MSSV: {user?.studentId ?? ''}</Text>
                                    <Text fontSize={13} >Email: {user?.email ?? ''}</Text>
                                </Flex>
                            </View>
                        </View>

                        <Text fontWeight='semibold' fontSize={15} color='rgba(0, 0, 0, 0.9)'>Thay đổi thông tin cá nhân bên dưới</Text>
                        <Box height={13} />

                        <Select
                            selectedValue={chosenUserMode ? 'Lessor' : 'Lessee'}
                            height={45}
                            width={120}
                            accessibilityLabel="Select userMode"
                            placeholder={chosenUserMode ? 'Lessor' : 'Lessee'}
                            borderRadius={15}
                            fontSize={14}
                            fontWeight={700}
                            _selectedItem={{
                                bg: 'gray.100',
                                endIcon: <CheckIcon size="5" />
                            }} onValueChange={itemValue => handleChangeUserMode(itemValue)}
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
                            {!isFPTUser && (
                                <View>
                                    <Flex
                                        marginTop={15}
                                        flexDirection='column'
                                        style={{
                                            rowGap: 15
                                        }}
                                    >
                                        <Text fontWeight='semibold' fontSize={15} color='rgba(0, 0, 0, 0.6)'>Họ và tên</Text>
                                        <Flex
                                            flexDirection='row'
                                            flexWrap='wrap'
                                            justifyContent='flex-start'
                                            alignItems='center'
                                            style={{
                                                columnGap: 15,
                                                rowGap: 15,
                                            }}
                                        >
                                            <Input fontSize={18} value={user?.lastName} placeholder='Họ' leftElement={<Stack marginLeft={15}></Stack>} height='50px' width={'30%'} borderRadius={15} />
                                            <Input fontSize={18} value={user?.middleName} placeholder='Tên giữa' leftElement={<Stack marginLeft={15}></Stack>} height='50px' width={'30%'} borderRadius={15} />
                                            <Input fontSize={18} value={user?.firstName} placeholder='Tên' leftElement={<Stack marginLeft={15}></Stack>} height='50px' width={'30%'} borderRadius={15} />
                                        </Flex>
                                    </Flex>


                                </View>

                            )}
                            <Text fontWeight='semibold' fontSize={15} color='rgba(0, 0, 0, 0.6)'>Thông tin cơ bản</Text>

                            <Input fontSize={18} value={user?.email} placeholder='Email' leftElement={<Stack marginLeft={15}><Ionicons name="at-outline" size={22} /></Stack>} height='50px' borderRadius={15} editable={false} />
                            <Input fontSize={18} value={user?.phone} placeholder='Phone' leftElement={<Stack marginLeft={15}><Ionicons name="call-outline" size={22} /></Stack>} height='50px' borderRadius={15} />
                            <Select
                                selectedValue={newAddress ? address[1] : address[2]}
                                height={50}
                                width={'100%'}
                                accessibilityLabel="Select userMode"
                                placeholder={newAddress ? address[1] : address[2]}
                                borderRadius={15}
                                fontSize={18}
                                fontWeight={700}
                                _selectedItem={{
                                    bg: 'gray.100',
                                    endIcon: <CheckIcon size="5" />
                                }} onValueChange={value => setNewAddress(value)}
                            >
                                <Select.Item label={address[1]} value={1} />
                                <Select.Item label={address[2]} value={2} />
                            </Select>

                            {user.userMode && (

                                <View>
                                    <Text fontWeight='semibold' fontSize={15} color='rgba(0, 0, 0, 0.6)'>Thông tin ngân hàng (dành cho người cho thuê)</Text>
                                    <Flex
                                        marginTop={15}
                                        flexDirection='column'
                                        style={{
                                            rowGap: 15
                                        }}
                                    >
                                        <Input fontSize={18} value={user?.bankBranch} placeholder="Ngân hàng" leftElement={<Stack marginLeft={15}><Ionicons name="planet-outline" size={22} /></Stack>} height='50px' borderRadius={15} editable={user.userMode} />
                                        <Input fontSize={18} value={user?.bankAccount} placeholder="Số tài khoản ngân hàng" leftElement={<Stack marginLeft={15}><Ionicons name="card-outline" size={22} /></Stack>} height='50px' borderRadius={15} editable={user.userMode} />

                                    </Flex>
                                </View>
                            )}


                            {
                                updateStatus &&
                                <Badge width='100%' padding='15px' borderRadius={10} colorScheme="green">
                                    <Text>Cập nhật thông tin thành công</Text>
                                </Badge>
                            }
                            <GradientButton
                                onPress={() =>
                                    setUpdateStatus(true)
                                }
                                text='Cập nhật thông tin'
                                colors={user?.userMode ? ['#2A4AB6', '#269DDB'] : ['#9F3553', '#E98EA6']}
                                height={55} radius={15} />
                        </Flex>
                    </Box>
                    <Box height={100} />
                </ScrollView>
            </Box>
        </Animated.View >
    );
}