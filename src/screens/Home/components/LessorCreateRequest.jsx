import { Box, Button, Checkbox, Flex, Image, Input, Stack, Text, Select, CheckIcon, List } from "native-base";
import React, { useState, useEffect } from "react";
import { StyleSheet, Animated, View, Platform, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GradientButton } from "../../../components/GradientButton";
import * as Toast from "../../../components/Toast";
import * as ImagePicker from 'expo-image-picker';

import { store } from "../../../state/store";

import { add, addImg } from "../../../services/ListingRequest"
import { createRequest, uploadImage } from "../../../utils/request";
import * as ListingService from "../../../services/ListingRequest";

// const listingRequest = {
//     userId: 0,
//     productName: "",
//     brandName: "",
//     categoryName: "",
//     listingDescription: "",
//     marketPrice: 0,
//     price: 0,
//     photos: [],
// };



const categoryList = [
    "Camera",
    "Laptop",
    "Ổ cắm điện",
    "Tai nghe",
    "Khác",
];


// data: productName, brandName, categoryName, listingDescription, marketPrice, price

export const LessorCreateRequest = ({ navigation }) => {

    const UPLOADLIMIT = 6;


    const user = store.useState((state) => state.user);
    const [isUploaded, setUploaded] = React.useState(false);

    const fadeAnim = React.useRef(new Animated.Value(0)).current;


    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);


    const [listingRequest, setListingRequest] = useState({
        userId: user.userId,
        productName: "",
        brandName: "",
        categoryName: "",
        listingDescription: "",
        marketPrice: 0,
        price: 0,
        photos: [],

    })


    const isAllowUpload = () => {

        if (listingRequest.photos.length == 0) {
            Toast.show('Vui lòng tải lên ảnh sản phẩm');
        }
        return listingRequest.productName !== ''
            && listingRequest.brandName !== ''
            && listingRequest.categoryName !== ''
            && listingRequest.listingDescription !== ''
            && listingRequest.marketPrice !== 0
            && listingRequest.price !== 0
            && listingRequest.photos.length !== 0
    }


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
            selectionLimit: UPLOADLIMIT,
            quality: 1,
        });
        if (!result.canceled) {
            setUploaded(true);

            // Remove old photos and add the new images to the listingRequest state variable.
            const listPhotos = result.assets.map((image) => {
                return {
                    data: image,
                    uri: image.uri,
                };
            });
            setListingRequest({
                ...listingRequest,
                photos: [...listPhotos],
            });
            setUploaded(true);
        } else if (result.error) {
            setUploaded(false);
            console.log('ImagePicker Error: ', result.error);
        } else {
            setUploaded(false);
            console.log('User cancelled image picker');
        }
    };

    const handleAddListing = async () => {
        //         + productName: Long
        // + brandName: String
        // + categoryName: String
        // + listingDescription: String
        // + marketPrice: Integer, giá thị trường của sản phẩm
        // + price: Integer, giá cho thuê của sản phẩm

        if (!isAllowUpload()) {
            Toast.show('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        ListingService.createRequest(listingRequest.userId, {
            productName: listingRequest.productName,
            brandName: listingRequest.brandName,
            categoryName: listingRequest.categoryName,
            listingDescription: listingRequest.listingDescription,
            marketPrice: Number(listingRequest.marketPrice),
            price: Number(listingRequest.price),
        })
            .then((listingRes) => {
                ListingService.addImg(listingRes.listingId, listingRequest.photos)
                    .then((imgRes) => {
                        if (imgRes == 200) {
                            Toast.show('Thêm sản phẩm thành công');
                            setUploaded(true);
                        } else if (imgRes.status == 400) {
                            Toast.show('Thêm ảnh thất bại, lỗi: Mạng không ổn định');
                            setUploaded(false);
                        } else if (imgRes.status == 500) {
                            Toast.show('Thêm ảnh thất bại, lỗi: Lỗi phía server');
                            setUploaded(false);
                        }
                        else {
                            console.log('resImg: ', resImg);
                            Toast.show('Thêm ảnh thất bại, vui lòng liên hệ với Sharkionares.');
                            setUploaded(false);
                        }
                    });
                
            })
    }

    const handleChangeProductName = (e) => {
        setListingRequest({
            ...listingRequest,
            productName: e,
        })
    }

    const handleBrandNameInput = (e) => {
        setListingRequest({
            ...listingRequest,
            brandName: e,
        })
    }

    const hanleCategoryName = (e) => {
        setListingRequest({
            ...listingRequest,
            categoryName: e,
        })
    }

    const handleDesCInput = (e) => {
        setListingRequest({
            ...listingRequest,
            listingDescription: e,
        })
    }

    const handleMarketPriceInput = (e) => {
        setListingRequest({
            ...listingRequest,
            price: e,
        })
    }

    const handlePriceInput = (e) => [
        setListingRequest({
            ...listingRequest,
            marketPrice: e,
        })
    ]

    return (
        <Animated.View
            style={{ flex: 1, opacity: fadeAnim }}>
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
                    <Flex><Ionicons name="chevron-back" size={22} onPress={() => navigation.goBack()} /></Flex>
                    <Text textAlign='center' flex={1} fontSize={22} fontWeight='semibold'
                        padding={5}>Thêm sản phẩm cho thuê</Text>
                </Flex>
                <ScrollView>
                    <Box marginX={15}>
                        <Flex
                            flexDirection='column'
                            style={{
                                rowGap: 15
                            }}
                        >
                            <Text fontWeight='semibold' paddingTop={4}>
                                Tên sản phẩm<Text fontWeight={'bold'} color='#F65683'> *</Text>
                            </Text>
                            <Input value={listingRequest.productName} onChangeText={handleChangeProductName} placeholder="Vd: Người đẹp thiếu camera..." borderRadius={10} />

                            <Box
                                marginX={0}
                                flexDirection={'row'}
                                justifyContent='space-between'
                                alignItems='flex-start'
                                paddingX={0}

                            >
                                <Flex
                                    flexDirection='column'
                                    style={{
                                        rowGap: 15
                                    }}>
                                    <Text fontWeight='semibold'>Hãng sản phẩm<Text fontWeight={'bold'} color='#F65683'> *</Text></Text>
                                    <Input value={listingRequest.brandName} placeholder="Vd: Sony, Canon,..." borderRadius={10} onChangeText={handleBrandNameInput} width={150} />
                                </Flex>
                                <Flex
                                    flexDirection='column'
                                    style={{
                                        rowGap: 15,
                                    }}
                                >
                                    <Text fontWeight='semibold'>Phân loại<Text fontWeight={'bold'} color='#F65683'> *</Text></Text>
                                    <Select
                                        selectedValue={listingRequest.categoryName}
                                        height={45}
                                        width={150}
                                        accessibilityLabel="Select Category"
                                        placeholder={listingRequest.categoryName !== '' ? listingRequest.categoryName : '*Phân loại'}
                                        borderRadius={10}
                                        fontSize={14}
                                        fontWeight={700}
                                        _selectedItem={{
                                            bg: 'gray.100',
                                            endIcon: <CheckIcon size="5" />
                                        }}
                                        onValueChange={chosenValue => hanleCategoryName(chosenValue)}
                                    >
                                        {categoryList.map((category, index) => (
                                            <Select.Item
                                                key={index}
                                                label={category} value={category} />
                                        ))}
                                    </Select>
                                </Flex>
                            </Box>
                            <Text fontWeight='semibold'>Mô tả sản phẩm<Text fontWeight={'bold'} color='#F65683'> *</Text></Text>
                            <Input value={listingRequest.listingDescription} placeholder="Vd: Hôm nay đẹp trời tự dưng cái..." borderRadius={10} onChangeText={handleDesCInput} multiline={true} numberOfLines={4} />
                            <Text fontWeight='semibold'>+ Hình ảnh / video <Text fontWeight={'bold'} color='#F65683'> *</Text></Text>


                            {isUploaded && (
                                <ScrollView horizontal={true} _important={true}>
                                    {listingRequest.photos.map(photo => (
                                        <Image
                                            key={photo.uri}
                                            alt="img"
                                            source={{ uri: photo.uri }}
                                            style={[styles.image]} // add margin to the right
                                        />
                                    ))}
                                </ScrollView>
                            )}


                            <TouchableOpacity
                                onPress={pickImage}
                            >
                                <Flex
                                    flexDirection='row'
                                    justifyContent='center'
                                    borderWidth={1}
                                    borderColor='#9F3553'
                                    borderRadius={15}
                                    padding={3}
                                    borderStyle='dashed'
                                    alignItems='center'
                                    style={{
                                        columnGap: 15
                                    }}
                                >
                                    <GradientButton width={45} height={45} paddingBottom={0} paddingLeft={0} paddingRight={0} paddingTop={0}
                                        prefixIcon={<Ionicons name="camera-outline" size={22} color='white' />} colors={['#2A4AB6', '#269DDB']}
                                    />
                                    <Text>Tải lên ảnh/video</Text>
                                </Flex>
                            </TouchableOpacity>

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
                                    <Text>Hình ảnh phải xác thực được tình trạng{'\n'}của sản phẩm.</Text>
                                    <Text fontWeight='semibold'>Tối đa {UPLOADLIMIT} ảnh/video.</Text>
                                </Flex>


                            </Flex>

                            <Text fontWeight='semibold'>Giá thị trường của sản phẩm (theo ước tính) <Text fontWeight={'bold'} color='#F65683'> *</Text></Text>
                            <Flex
                                flexDirection='row'
                                alignItems='center'
                                style={{
                                    columnGap: 5
                                }}
                            >
                                <Text fontSize={20}>≈</Text>
                                <Input
                                    value={listingRequest.price}
                                    placeholder="Giá" borderRadius={10} width={100}
                                    type="number"
                                    onChangeText={text => {
                                        // Only allow positive integers
                                        const regex = /^[0-9\b]+$/;
                                        if (regex.test(text)) {
                                            handleMarketPriceInput(text);
                                        }
                                        else {
                                            Toast.show('Giá phải là số')
                                        }
                                    }}
                                    keyboardType='numeric'
                                />
                            </Flex>

                            <Text fontWeight='semibold'>Giá thuê<Text fontWeight={'bold'} color='#F65683'> *</Text></Text>
                            <Flex
                                flexDirection='row'
                                alignItems='center'
                                style={{
                                    columnGap: 5
                                }}
                            >
                                <Input
                                    value={listingRequest.marketPrice}
                                    type="number"
                                    placeholder="Giá" borderRadius={10} width={100}
                                    onChangeText={text => {
                                        // Only allow positive integers
                                        const regex = /^[0-9\b]+$/;
                                        if (regex.test(text)) {
                                            handlePriceInput(text);
                                        }
                                        else {
                                            Toast.show('Giá phải là số')
                                        }
                                    }}
                                    keyboardType='numeric'
                                    inputMode="numeric"
                                />
                                <Text>/ Ngày</Text>
                            </Flex>




                        </Flex>

                        <Stack
                            marginTop={30}
                        >
                            <GradientButton
                                onPress={() => handleAddListing()}
                                text='Thêm sản phẩm' radius={10} fontSize={18} height={55}
                                colors={['#2A4AB6', '#269DDB']}
                            // disabled= {!isAllowUpload 
                            //     || isUploaded
                            // }
                            />
                        </Stack>

                        <Box height={120} />
                    </Box>
                </ScrollView>

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
        width: 100,
        height: 100,
        borderRadius: 8,
        padding: 2,
        flex: 1,
        marginRight: 10,
    },
    errorText: {
        color: "red",
        marginTop: 16,
    },
})