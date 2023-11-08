import { Avatar, Box, Checkbox, Flex, Image, Input, ScrollView, Stack, Text } from "native-base";
import React from "react";
import { StyleSheet, Animated } from "react-native";
import { useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { GradientButton } from "../../../components/GradientButton";
import { useIsFocused } from "@react-navigation/native";
import * as ListingService from "../../../services/Listing";
import { FlatList } from "react-native";
import { Dimensions } from 'react-native';
import { View } from "react-native";

import { store } from "../../../state/store";


export const LesseeViewProductDetail = ({ navigation, route }) => {

    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    const { listing } = route.params;
    const listingStatusLessee = store.useState((state) => state.listingStatusLessee);
    


    const { width } = Dimensions.get('window');
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const position = Animated.divide(scrollX, width);

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const button = () => {
        switch (listing.listingStatus) {
            case 0:
                return (
                    <GradientButton
                        onPress={() => navigation.navigate('Lessee order', { listing: listing })}
                        radius={10}
                        fontSize={18}
                        text='Đang thuê'
                        height={55}
                        colors={['#9F3553', '#E98EA6']}
                    />
                )
            case 1:
                return (
                    <GradientButton
                        onPress={() => navigation.navigate('LesseeSendRequest', { listing: listing })}
                        radius={10}
                        fontSize={18}
                        text='Đặt thuê'
                        height={55}
                        colors={['#9F3553', '#E98EA6']}
                    />
                );
            case 2:
                return (
                    <GradientButton
                        onPress={() => navigation.navigate('Lessee order', { listing: listing })}
                        radius={10}
                        fontSize={18}
                        text='Chờ xác nhận'
                        height={55}
                        colors={['#9F3553', '#E98EA6']}
                    />
                );
            default:
                return null;
        }
    };




    const [isBanking, setIsBanking] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        });
        console.log('listing', listing);
    }, [navigation]);

    const toggleIsBanking = () => {
        setIsBanking(!isBanking)
    }

    const [isEnding, setIsEnding] = useState(false);

    return (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            <Box
                width='100%'
                display='flex'
                flexDirection='column'
                minHeight='100%'
                overflow='hidden'
            >
                
                <ScrollView>
                <FlatList
                    data={listing.images ? listing.images : null}
                    horizontal
                    decelerationRate={0.8}
                    snapToInterval={width}
                    bounces={false}
                    onScroll={position => {
                        scrollX.setValue(position.nativeEvent.contentOffset.x)

                    }}
                    renderItem={({ item }) => (
                        <View
                            style={{ width: width, height: width }}
                        >
                            <Image
                                alt="img"
                                source={{ uri: item }}
                                style={[styles.image]} // add margin to the right
                            />
                        </View>

                    )}
                >
                </FlatList>
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 16,
                        marginTop: -4,
                    }}>
                    {listing.images
                        ? listing.images.map((image, index) => {
                            let opacity = position.interpolate({
                                inputRange: [index - 1, index, index + 1],
                                outputRange: [0.2, 1, 0.2],
                                extrapolate: 'clamp',
                            });
                            return (
                                <Animated.View
                                    key={index}
                                    style={{
                                        width: '10%',
                                        height: 3,
                                        backgroundColor: "black",
                                        opacity,
                                        marginHorizontal: 4,
                                        borderRadius: 100,
                                    }}></Animated.View>
                            );
                        })
                        : null}
                </View>
                    <Stack
                        paddingX={15}
                        paddingY={30}
                        width='100%'
                        display='flex'
                        flexDirection='column'
                        height='100vh'
                        overflow='hidden'
                    >
                        <Flex
                            flexDirection='row'
                            style={{ columnGap: 15 }}
                            alignItems='flex-start'
                            width='100%'
                        >
                            <Flex flex={1} flexDirection='column' rowGap={7.5}>

                                <Text fontSize={36} fontWeight='600' textAlign='left'>{listing.product.productName}</Text>
                                <Text
                                    fontSize={16} fontWeight='400'
                                    letterSpacing='1' marginBottom={16}
                                    lineHeight={20}
                                >{listing.listingDescription}</Text>

                                <Text fontSize={20} fontWeight='bold' textAlign='left'>Thông tin người cho thuê</Text>
                                <Flex
                                    paddingX={2} paddingY={1}
                                    flexDirection='row' style={{ columnGap: 15 }}>
                                    <Avatar bg="cyan.500" width={90} height={90} source={{
                                        uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                    }} />
                                    <Stack>
                                        <Text fontSize={14} fontWeight='semibold'>{listing.user.firstName} {listing.user.middleName} {listing.user.lastName}</Text>
                                        <Text fontSize={14} fontWeight='semibold' color='gray.500'><Text>MSSV: </Text>{listing.user.studentId}</Text>
                                        <Flex
                                            paddingX={2} paddingY={1}
                                            width='170%' borderRadius={10}
                                            backgroundColor='gray.200'
                                            flexDirection='row' style={{ columnGap: 15 }} alignItems='center'>
                                            <Flex width={35} height={35}>
                                                <Ionicons name='heart-outline' size={32} />
                                            </Flex>
                                            <Stack>
                                                <Text fontWeight='semibold' fontSize={14} color='#0066FF'>{listing.user.rating}%</Text>
                                                <Text>Review({listing.user.positiveRating + listing.user.negativeRating})</Text>
                                            </Stack>
                                        </Flex>
                                    </Stack>

                                </Flex>




                            </Flex>
                        </Flex>

                        <Box
                            marginTop={15}
                        >
                            <Text 
                                fontSize={25} fontWeight='bold' 
                                color={'#FF5484'}
                                marginBottom={15}
                                >{listing.price.toLocaleString()} đ<Text color={'gray.400'} fontWeight={'medium'}>/ngày</Text></Text>


                            {/* Review sản phẩm
                            <Flex>
                                <Text fontSize={16} fontWeight='semibold'>Reviews</Text>

                                <Box
                                    marginBottom={15}
                                >
                                    <Flex
                                        flexDirection='row'
                                        justifyContent='space-between'
                                        alignItems='center'
                                    >
                                        <Flex
                                            flexDirection='row'
                                            style={{ columnGap: 15 }}
                                        >
                                            <Avatar />
                                            <Stack>
                                                <Text fontSize={16} fontWeight='semibold'>Nguyễn Văn Mượt</Text>
                                                <Text fontSize={16} marginBottom={15} color='gray.500'>2 months ago</Text>
                                            </Stack>
                                        </Flex>
                                        <Ionicons name="heart-outline" size={22} />
                                    </Flex>

                                    <Flex
                                    >
                                        <Flex
                                            flexDirection='row'
                                            alignItems='center'
                                            columnGap={7.5}
                                        >
                                            <Ionicons name='chatbubble-outline' size={22} />
                                            <Text fontSize={14} fontWeight='semibold' color='gray.500'>1</Text>
                                        </Flex>
                                        <Text fontSize={14}>Khen</Text>
                                    </Flex>
                                </Box>

                                <Box
                                    marginBottom={15}
                                >
                                    <Flex
                                        flexDirection='row'
                                        justifyContent='space-between'
                                        alignItems='center'
                                    >
                                        <Flex
                                            flexDirection='row'
                                            style={{ columnGap: 15 }}
                                        >
                                            <Avatar />
                                            <Stack>
                                                <Text fontSize={16} fontWeight='semibold'>Nguyễn Văn Mượt</Text>
                                                <Text fontSize={16} marginBottom={15} color='gray.500'>2 months ago</Text>
                                            </Stack>
                                        </Flex>
                                        <Ionicons name="heart-outline" size={22} />
                                    </Flex>

                                    <Flex
                                    >
                                        <Flex
                                            flexDirection='row'
                                            alignItems='center'
                                            columnGap={7.5}
                                        >
                                            <Ionicons name='chatbubble-outline' size={22} />
                                            <Text fontSize={14} fontWeight='semibold' color='gray.500'>1</Text>
                                        </Flex>
                                        <Text fontSize={14}>Khen</Text>
                                    </Flex>
                                </Box>
                            </Flex> */}

                        </Box>
                        {button()}
                        
                    </Stack>
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
        width: '100%',
        height: '100%',
        // borderRadius: 8,
        // padding: 2,
        // flex: 1,
        // marginRight: 10,
        resizeMode: 'contain',
    },
})