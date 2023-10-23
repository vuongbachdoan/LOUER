import { Box, Button, Checkbox, Flex, Image, Input, Stack, Text, Select, CheckIcon } from "native-base";
import React, { useState, useEffect } from "react";
import { StyleSheet, Animated, View, Platform, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GradientButton } from "../../../components/GradientButton";
import * as Toast from "../../../components/Toast";
import * as ImagePicker from 'expo-image-picker';

import { store } from "../../../state/store";

import { add, addImg } from "../../../services/ListingRequest"


const listingRequest = {
    userId: 0,
    productName: "",
    brandName: "",
    categoryName: "",
    listingDescription: "",
    marketPrice: 0,
    price: 0,
    photos: [],
};



const categoryList = [
    "Camera",
    "Laptop",
    "Ổ cắm điện",
    "Tai nghe",
    "Khác",
];


// data: productName, brandName, categoryName, listingDescription, marketPrice, price

export const LessorCreateRequest = ({ navigation }) => {

    const user = store.useState((state) => state.user);
    const [isUploaded, setIsUploaded] = React.useState(false);
    const UPLOADLIMIT = 6;

    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const makeRequest = async (productRequest) => {
        try {
            const response = await request.addProductRequest(productRequest);
            console.log(response);
            // handle successful response
        } catch (error) {
            console.error(error);
            // handle error
        }
    };


    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);


    React.useEffect(() => {
        listingRequest.userId = 0;
        listingRequest.productName = "";
        listingRequest.brandName = "";
        listingRequest.categoryName = "*Chưa chọn*";
        listingRequest.listingDescription = "";
        listingRequest.marketPrice = 0;
        listingRequest.price = 0;
        listingRequest.photos = [];
    }, [navigation]);


    const handleUserIdInput = () => {
        listingRequest.userId = user.userId;
    }

    const handleNameInput = (text) => {
        listingRequest.productName = text;
        handleUserIdInput();
    };

    const handleBrandNameInput = (text) => {
        listingRequest.brandName = text;
    };

    const handleCategoryInput = (text) => {
        listingRequest.categoryName = text;
    };


    const handleDesCInput = (text) => {
        listingRequest.listingDescription = text;
    };

    const handleMarketPriceInput = (number) => {
        listingRequest.marketPrice = number;
    };

    const handlePriceInput = (number) => {
        listingRequest.price = number;
    };

    const [categoryName, setCategoryName] = useState('*Choose category*')
    useEffect(() => {
        handleChangeCategory(categoryName)
    }, [categoryName])
    const handleChangeCategory = (text) => {
        listingRequest.categoryName = text;
    }



    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
            selectionLimit: UPLOADLIMIT,
            quality: 1,
        });
        if (!result.cancelled) {
            setIsUploaded(true);
            listingRequest.photos = [];
            result.assets.forEach((image) => {
                listingRequest.photos.push(image.uri);
            });
            console.log('PROD REQ:', listingRequest);

            setIsUploaded(true);
        } else if (result.error) {
            console.log('ImagePicker Error: ', result.error);
        } else {
            setIsUploaded(false);
            console.log('User cancelled image picker');
        }
    };

    const handleAddListing = () => {
        if (
            listingRequest.productName == "" ||
            listingRequest.brandName == "" ||
            listingRequest.categoryName == "" ||
            listingRequest.listingDescription == "" ||
            listingRequest.marketPrice <= 0 ||
            listingRequest.price <= 0 ||
            listingRequest.photos.length == 0
        ) {
            console.log('PROD REQ:', listingRequest);
            console.log('REJECT UPLOAD, missing info');
            Toast.show('Vui lòng điển đủ thông tin.');
        } else {
            const requestBodyAdd = [];
            requestBodyAdd.push(listingRequest.productName);
            requestBodyAdd.push(listingRequest.brandName);
            requestBodyAdd.push(listingRequest.categoryName);
            requestBodyAdd.push(listingRequest.listingDescription);
            requestBodyAdd.push(listingRequest.marketPrice);
            requestBodyAdd.push(listingRequest.price);
            console.log('requestBodyAdd: ', requestBodyAdd);

            add(user.userId, requestBodyAdd).then((response) => {
                if (!response) {
                    console.log("Add listing response: ", response);
                    const listingId = response.listingId;
                    addImg(listingId, listingRequest.photos).then((responseImg) => {
                        console.log("Add img response: ", responseImg);
                    });
                }else{
                    console.log("Add listing response: ", response);
                    Toast.show('Có lỗi lúc thêm sản phẩm.');
                }

            });


        }
    };


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
                            <Input placeholder="Vd: Người đẹp thiếu camera..." borderRadius={10} onChangeText={handleNameInput} />

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
                                    <Input placeholder="Vd: Sony, Canon,..." borderRadius={10} onChangeText={handleBrandNameInput} width={150} />
                                </Flex>
                                <Flex
                                    flexDirection='column'
                                    style={{
                                        rowGap: 15,
                                    }}
                                >
                                    <Text fontWeight='semibold'>Phân loại<Text fontWeight={'bold'} color='#F65683'> *</Text></Text>
                                    <Select
                                        selectedValue={categoryName}
                                        height={45}
                                        width={150}
                                        accessibilityLabel="Select Category"
                                        placeholder={categoryName}
                                        borderRadius={10}
                                        fontSize={14}
                                        fontWeight={700}
                                        _selectedItem={{
                                            bg: 'gray.100',
                                            endIcon: <CheckIcon size="5" />
                                        }}
                                        onValueChange={chosenValue => setCategoryName(chosenValue) && handleCategoryInput(chosenValue)}
                                    >
                                        {categoryList.map((category, index) => (
                                            <Select.Item
                                                // key={index} 
                                                label={category} value={category} />
                                        ))}
                                    </Select>
                                </Flex>
                            </Box>
                            <Text fontWeight='semibold'>Mô tả sản phẩm<Text fontWeight={'bold'} color='#F65683'> *</Text></Text>
                            <Input placeholder="Vd: Hôm nay đẹp trời tự dưng cái..." borderRadius={10} onChangeText={handleDesCInput} multiline={true} numberOfLines={4} />
                            <Text fontWeight='semibold'>+ Hình ảnh / video <Text fontWeight={'bold'} color='#F65683'> *</Text></Text>


                            {isUploaded && (
                                <ScrollView horizontal={true} _important={true}>
                                    {listingRequest.photos.map((photo, index) => (
                                        <Image key={index} source={{ uri: photo }} style={styles.image} padding={2} />

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
                                    placeholder="Giá" borderRadius={10} width={100}
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
                                    onChange={handleMarketPriceInput}
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
                                    onChange={handlePriceInput}
                                />
                                <Text>/ Ngày</Text>
                            </Flex>




                        </Flex>

                        <Stack
                            marginTop={30}
                        >
                            <GradientButton onPress={() => handleAddListing()} text='Thêm sản phẩm' radius={10} fontSize={18} height={55} colors={['#2A4AB6', '#269DDB']} />
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
    },
    errorText: {
        color: "red",
        marginTop: 16,
    },
})