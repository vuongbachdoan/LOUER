import { Avatar, Badge, Box, CheckIcon, Flex, Image, Input, ScrollView, Select, Stack, Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GradientButton } from "../../components/GradientButton";
import { store } from "../../state/store";
import { getMainColor } from "../../state/color";
import * as Toast from "../../components/Toast";

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
    const address = store.useState((state) => state.address);
    const [editedInfo, setEditedInfo] = React.useState(user);


    const [updateStatus, setUpdateStatus] = React.useState(false);
    const [isFPTUser, setIsFPTUser] = React.useState(false);



    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            console.log('Edited info', editedInfo);
        }, 5000);
        return () => clearInterval(intervalId);
    }, [editedInfo]);

    React.useEffect(() => {
        if (/[a-z0-9]{8,}@fpt\.edu\.vn/.test(user.email)) {
            // Case FPT
            setIsFPTUser(true);
        } else {
            setIsFPTUser(false);
        }
    }, [navigation]);


    const handleUpdateData = async () => {

        //Update UserMode
        if (editedInfo.userMode !== user.userMode) {
            UserService.updateModeById(user.userId)
                .then(res => {
                    if (res) {
                        console.log('Update mode res', res);
                        store.update((s) => {
                            s.user.userMode = res.userMode;
                        });
                    }else{
                        console.error('User mode update error', res);
                    }

                })
                .catch(err => { console.error('Update mode error', err); })
        }

        if (editedInfo) {
            //Update Main Data and Bank Creds, then Update data
            if (isFPTUser) {
                UserService.updateDataFPT(user.userId, editedInfo)
                    .then(isUpdated => {
                        setUpdateStatus(isUpdated);
                        console.log('Update data res', updateStatus);
                    })
                    .catch(err => { console.error('Update data error', err); })
            } else {
                UserService.updateDataGmail(user.userId, editedInfo)
                    .then(isUpdated => {
                        setUpdateStatus(isUpdated);
                        console.log('Update data res', updateStatus);
                    })
                    .catch(err => { console.error('Update data error', err); });
            }

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
                                    <Text textAlign='left' numberOfLines={1} ellipsizeMode='tail' fontSize={20} fontWeight='semibold' color={(user.userMode) ? (getMainColor('lessor')) : (getMainColor('lessor'))}>{editedInfo?.firstName ?? ''} {editedInfo?.middleName ?? ''} {editedInfo?.lastName ?? ''}</Text>
                                    <Text fontSize={13} >MSSV: {editedInfo?.studentId ?? ''}</Text>
                                    <Text fontSize={13} >Email: {editedInfo?.email ?? ''}</Text>
                                </Flex>
                            </View>
                        </View>

                        <Text fontWeight='semibold' fontSize={15} color='rgba(0, 0, 0, 0.9)'>Thay đổi thông tin cá nhân bên dưới</Text>
                        <Box height={13} />

                        <Select
                            selectedValue={editedInfo.userMode ? 'Lessor' : 'Lessee'}
                            height={45}
                            width={120}
                            accessibilityLabel="Select userMode"
                            placeholder={editedInfo.userMode ? 'Lessor' : 'Lessee'}
                            borderRadius={15}
                            fontSize={14}
                            fontWeight={700}
                            _selectedItem={{
                                bg: 'gray.100',
                                endIcon: <CheckIcon size="5" />
                            }}
                            onValueChange={itemValue => setEditedInfo({ ...editedInfo, userMode: itemValue })}
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
                                            <Input fontSize={18}
                                                value={editedInfo?.lastName} placeholder='Họ'
                                                leftElement={<Stack marginLeft={15}></Stack>}
                                                height='50px' width={'30%'} borderRadius={15}
                                                onChange={(e) => setEditedInfo({ ...editedInfo, lastName: e.nativeEvent.text })}
                                            />
                                            <Input
                                                fontSize={18} value={editedInfo?.middleName} placeholder='Tên giữa'
                                                leftElement={<Stack marginLeft={15}></Stack>}
                                                height='50px' width={'30%'} borderRadius={15}
                                                onChange={(e) => setEditedInfo({ ...editedInfo, middleName: e.nativeEvent.text })}
                                            />
                                            <Input
                                                fontSize={18}
                                                value={editedInfo?.firstName} placeholder='Tên' leftElement={<Stack marginLeft={15}></Stack>}
                                                height='50px' width={'30%'} borderRadius={15}
                                                onChange={(e) => setEditedInfo({ ...editedInfo, firstName: e.nativeEvent.text })}
                                            />
                                        </Flex>
                                    </Flex>


                                </View>

                            )}
                            <Text fontWeight='semibold' fontSize={15} color='rgba(0, 0, 0, 0.6)'>Thông tin cơ bản</Text>

                            <Input
                                fontSize={18}
                                value={editedInfo?.phone} placeholder='Số điện thoại'
                                leftElement={<Stack marginLeft={15}><Ionicons name="call-outline" size={22} /></Stack>}
                                height='50px' borderRadius={15}
                                type="number"
                                keyboardType='numeric'
                                onChangeText={text => {
                                    // Only allow positive integers
                                    const regex = /^[0-9\b]+$/;
                                    if (regex.test(text) && text.length <= 10) {
                                        setEditedInfo({ ...editedInfo, phone: text })
                                    }
                                    else {
                                        Toast.show('Số điện thoại chỉ là số và không quá 10 chữ số')
                                    }
                                }}

                            />


                            {/* Editing Address */}
                            {false && (
                                <Select
                                selectedValue={editedInfo.address == 1 ? address[1] : address[2]}
                                height={50} width={'100%'}
                                leftElement={<Stack marginLeft={15}><Ionicons name="home-outline" size={22} /></Stack>}
                                accessibilityLabel="Select userMode"
                                placeholder={editedInfo.address == 1 ? address[1] : address[2]}
                                borderRadius={15}
                                fontSize={18}
                                fontWeight={700}
                                _selectedItem={{
                                    bg: 'gray.100',
                                    endIcon: <CheckIcon size="5" />
                                }}
                                onValueChange={newAddr => setEditedInfo({ ...editedInfo, address: newAddr })}
                            >
                                <Select.Item label={address[1]} value={1} />
                                <Select.Item label={address[2]} value={2} />
                            </Select>
                            )}
                            

                            {user.userMode && (

                                <View>
                                    <Text fontWeight='semibold' fontSize={15} color='rgba(0, 0, 0, 0.6)'>Thông tin ngân hàng (dành cho người cho thuê)</Text>
                                    <Flex
                                        flexDirection='row'
                                        style={{
                                            columnGap: 5
                                        }}
                                        alignItems='center'
                                    >
                                        <Ionicons color='orange' name="information-circle-outline" size={30} />
                                        <Flex
                                            flexDirection='column'
                                            style={{ columnGap: 1 }}
                                            alignItems='left'
                                        >
                                            <Text fontWeight={'semibold'}>Chỉ dùng kí tự không dấu.</Text>
                                        </Flex>
                                    </Flex>
                                    <Flex
                                        marginTop={15}
                                        flexDirection='column'
                                        style={{
                                            rowGap: 15
                                        }}
                                    >
                                        <Input fontSize={18}
                                            value={editedInfo?.bankName} placeholder="Tên Ngân hàng"
                                            leftElement={<Stack marginLeft={15}><Ionicons name="planet-outline" size={22} /></Stack>}
                                            height='50px' borderRadius={15}
                                            editable={user.userMode}
                                            type="text"
                                            keyboardType="default"
                                            onChangeText={text => {
                                                // Only allow alphabets and spaces
                                                const regex = /^[a-zA-Z\s]*$/;
                                                if (regex.test(text)) {
                                                    setEditedInfo(prevState => ({ ...prevState, bankName: text }))
                                                }
                                                else {
                                                    Toast.show('Tên ngân hàng chỉ được chứa chữ cái và khoảng trắng')
                                                }
                                            }}
                                        />
                                        <Input fontSize={18}
                                            value={editedInfo?.cardName} placeholder="Tên người dùng tài khoản"
                                            leftElement={<Stack marginLeft={15}><Ionicons name="card-outline" size={22} /></Stack>}
                                            height='50px' borderRadius={15}
                                            editable={user.userMode}
                                            type="text"
                                            keyboardType="default"
                                            onChangeText={text => {
                                                // Only allow alphabets, spaces, and Vietnamese characters
                                                const regex = /^[a-zA-Z\s\u00C0-\u024F]+$/;
                                                if (regex.test(text)) {
                                                    setEditedInfo({ ...editedInfo, cardName: text })
                                                }
                                                else {
                                                    Toast.show('Tên người dùng chỉ được chứa chữ cái, khoảng trắng và ký tự tiếng Việt')
                                                }
                                            }}
                                        />
                                        <Input fontSize={18}
                                            value={editedInfo?.cardNumber} placeholder="Số tài khoản ngân hàng"
                                            leftElemesnt={<Stack marginLeft={15}><Ionicons name="card-outline" size={22} /></Stack>}
                                            height='50px' borderRadius={15}
                                            editable={user.userMode}
                                            type="number"
                                            keyboardType="numeric"
                                            onChangeText={text => {
                                                // Only allow numbers
                                                const regex = /^[0-9]*$/;
                                                if (regex.test(text)) {
                                                    setEditedInfo({ ...editedInfo, cardNumber: text })
                                                }
                                                else {
                                                    Toast.show('Số tài khoản chỉ được chứa số')
                                                }
                                            }}
                                        />

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
                                onPress={() => handleUpdateData()}
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