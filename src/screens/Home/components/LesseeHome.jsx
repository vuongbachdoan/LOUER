import { Avatar, Badge, Box, Flex, Heading, Input, Stack, Text, Image, Button, FlatList } from "native-base";
import React from "react";
import { StyleSheet, Animated, ScrollView, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GradientButton } from "../../../components/GradientButton";
import { useIsFocused } from "@react-navigation/native";

import * as Toast from "../../../components/Toast";

import { store } from "../../../state/store";
import * as ListingService from "../../../services/Listing";


const categoryList = [
    "Camera",
    "Laptop",
    "Ổ cắm điện",
    "Tai nghe",
    "Khác",
];



const buttonColor = [
    noChosen = {
        color: '#433035',
        bg: '#FFFFFC'
    },
    chosen = {
        color: '#FFFFFC',
        bg: '#433035'
    }
]


export const LesseeHome = ({ navigation }) => {

    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const user = store.useState((state) => state.user);
    const [listingList, setListingList] = React.useState([]);
    const [chosenCategory, setChosenCategory] = React.useState('All');
    const [preChosenCategory, setPreChosenCategory] = React.useState(chosenCategory);
    const [page, setPage] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(false);


    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const getHomeListings = async () => {
        const res = await ListingService.getAllLessee(page, 10, user.userId, '', chosenCategory, '')
        console.log('GET HOME LISTINGS page: ', page, 'size: ', 10, 'userId: ', user.userId, 'category: ', chosenCategory, 'listing count: ', listingList.length)
        if (res !== listingList) {
            setListingList([...listingList, ...res]);
        } else {
            Toast.show("Đã hết sản phẩm");
        }
        
    }


    React.useEffect(() => {
        getHomeListings();
    }, []);

    React.useEffect(() => {
        if (chosenCategory !== preChosenCategory) {
            setPreChosenCategory(chosenCategory);
            setPage(0);
            setListingList([]);
        }
        getHomeListings();
    }, [page, chosenCategory]);



    const renderLoader = () => {

        return (
            <View style={{ marginTop: 10 }}>
                <ActivityIndicator size="large" color="#9F3553" />
            </View>
        );
    }


    const handleLoadMore = () => {
        setPage(page + 1);
    }
    const handleChosenCategory = (category) => {
        if (category === chosenCategory) {
            setChosenCategory('');
            return;
        }
        setChosenCategory(category);
    }


    const renderItem = ({ item }) => {
        return (
            <View
                key={item.listingId}
                style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    paddingBottom: 15,
                    // paddingRight: 10,
                    backgroundColor: '#F5F5F5', // Add this line to set the background color
                    borderRadius: 15,
                }}
                onTouchEnd={() => navigation.navigate('Lessee view product detail', { listing: item })}
            >
                <Image
                    alt="thumbnail"
                    width={150}
                    height={150}
                    padding={5}
                    source={{ uri: item.images[0] }}
                    borderRadius={15}
                />
                <Flex
                    flexDirection='column'
                    justifyContent='space-between'
                    alignItems='flex-start'
                    paddingLeft={2}
                >
                    <Text
                        textAlign='left'
                        fontSize={18}
                        fontWeight='semibold'
                        color='#401924'
                        numberOfLines={1}
                        ellipsizeMode='tail'
                    >
                        {item.product.productName.length > 11 ? item.product.productName.substring(0, 11) + '...' : item.product.productName}
                    </Text>
                    <Flex
                        flexDirection='row'
                        alignItems='flex-end'
                        justifyContent='space-between'
                        style={{
                            columnGap: 15
                        }}
                    >
                        <Text
                            textAlign='left'
                            fontSize={14} fontWeight='semibold'
                            color='gray.500' >
                            <Text color='#9F6071' fontWeight={'bold'}>{item.price.toLocaleString()}</Text>
                            / ngày
                        </Text>
                    </Flex>
                </Flex>
            </View>
        )
    }


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
                <Stack>
                    <Flex
                        justifyContent='space-between'
                        flexDirection='row'
                        alignItems='center'
                        paddingBottom={15}
                        paddingTop={15}
                    >
                        <Box>
                            <Heading fontSize={20} fontWeight='bold'>Xin Chào,</Heading>
                            <Heading fontSize={36} fontWeight='bold' color='#FF5484'>{user.firstName} {user.middleName} {user.lastName}</Heading>
                        </Box>
                        <Avatar
                            bg="lightBlue.400"
                            source={{ uri: user.images[0] }}
                            size="md">
                            Avt
                            <Avatar.Badge bg="green.500" />
                        </Avatar>
                    </Flex>

                    <GradientButton onPress={() => navigation.navigate('LesseeCreateRequest')} text='Yêu cầu cho thuê' radius={15} colors={['#9F3553', '#E98EA6']} />

                    <TouchableOpacity
                        style={{
                            borderRadius: 15,
                            marginTop: 15,
                            height: 45,
                            paddingLeft: 15,
                            paddingRight: 15,
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: 'gray'
                        }}
                        onPress={() => navigation.navigate('LesseeHomeSearch')}
                    >
                        <Ionicons name="search-outline" size={22} />
                        <Text style={{ marginLeft: 10 }}>Tìm sản phẩm theo tên</Text>
                    </TouchableOpacity>


                    <Flex
                        marginTop={15}
                        flexDirection='row'
                        style={{
                            columnGap: 7.5,
                            alignItems: 'center'
                        }}
                    >
                        <GradientButton paddingLeft={0} paddingRight={0} paddingTop={0} paddingBottom={0} prefixIcon={<Ionicons name="refresh-outline" size={22} />} width={45} height={45} radius={15} colors={['#9F3553', '#E98EA6']} />
                        <GradientButton onPress={() => navigation.navigate("LesseeRecentActivity")} paddingLeft={0} paddingRight={0} paddingTop={0} paddingBottom={0} prefixIcon={<Ionicons name="timer-outline" size={22} />} width={45} height={45} radius={15} colors={['#9F3553', '#E98EA6']} />
                        <GradientButton paddingLeft={0} paddingRight={0} paddingTop={0} paddingBottom={0} prefixIcon={<Ionicons name="list-outline" size={22} />} width={45} height={45} radius={15} colors={['#9F3553', '#E98EA6']} />
                    </Flex>
                    <Box marginBottom={0} marginTop={0}>
                        <ScrollView horizontal>
                            {categoryList
                                .map((category) => (
                                    <Button
                                        borderRadius={25}
                                        height={12}
                                        marginRight={2}
                                        bgColor={(chosenCategory === category) ? buttonColor[1].bg : 'transparent'}
                                        key={category}
                                        onPress={() => handleChosenCategory(category)}
                                    >
                                        <Text
                                            color={(chosenCategory === category) ? buttonColor[1].color : buttonColor[0].color}
                                            flex={1}
                                            fontSize={14}
                                        >
                                            {category}
                                        </Text>
                                    </Button>
                                ))}
                        </ScrollView>
                    </Box>
                </Stack>

                <Box
                    flex={1}
                    flexDirection='column'
                    justifyContent='flex-start'
                >
                    <FlatList
                        data={listingList}
                        numColumns={2}
                        keyExtractor={(item) => item.listingId}
                        renderItem={renderItem}
                        columnWrapperStyle={{
                            justifyContent: 'space-between',
                        }}
                        ListFooterComponent={renderLoader}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0}
                    />



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
        backgroundColor: '#FAFAF9',
    },
    text: {
        textTransform: 'uppercase',
        color: '#FFF'
    }
})