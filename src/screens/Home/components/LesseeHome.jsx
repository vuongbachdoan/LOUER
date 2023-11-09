import { Avatar, Badge, Box, Flex, Heading, Input, Stack, Text, Image, Button } from "native-base";
import React from "react";
import { StyleSheet, Animated, ScrollView, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Prod1 from '../../../assets/images/prod1.png'
import Prod2 from '../../../assets/images/prod2.png'
import Prod3 from '../../../assets/images/prod3.png'
import { GradientButton } from "../../../components/GradientButton";
import { useIsFocused } from "@react-navigation/native";

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
    const [searchText, setSearchText] = React.useState('');
    const [listingList, setListingList] = React.useState([]);
    const [chosenCategory, setChosenCategory] = React.useState('All');
    const [page, setPage] = React.useState(0);


    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const getHomeListings = async () => {
        setListingList(await ListingService.getAllLessee(page, 10, user.userId, searchText, chosenCategory, null));
        console.log('listinglist ',listingList);
    }



    React.useEffect(() => {
        getHomeListings();
    }, [useIsFocused(), page, chosenCategory, searchText]);



    const handleChosenCategory = (category) => {
        if (category === chosenCategory) {
            setChosenCategory('');
            return;
        }
        setChosenCategory(category);
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
                    <Input placeholder="Tìm sản phẩm" size='xl' borderRadius={15} marginTop={15} leftElement={<Stack marginLeft={15}><Ionicons name="search-outline" size={22} /></Stack>} />
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
                        <Flex
                            flexDirection='row'
                            style={{
                                columnGap: 10,
                                alignItems: 'center',
                                justifyContent: 'flex-end'
                            }}>
                            <Ionicons
                                name="chevron-back-circle"
                                color={page === 0 ? 'gray' : '#9F3553'}
                                size={30}
                                onPress={() => setPage(page - 1)}
                                disabled={page === 0}
                            />
                            <Text fontSize={18} fontWeight='semibold' color='#9F3553'>Page {page + 1}</Text>
                            <Ionicons
                                name="chevron-forward-circle"
                                color='#9F3553'
                                size={30}
                                onPress={() => setPage(page + 1)}
                            />
                        </Flex>
                    </Flex>
                    <Box marginBottom={30} marginTop={15}>
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
                >
                    <ScrollView>
                        <Flex
                            flexDirection='row'
                            flexWrap='wrap'
                            justifyContent='space-between'
                            style={{
                                rowGap: 15,
                                columnGap: 15
                            }}
                        >
                            {(listingList.length === 0)
                                ? (<Text>Chưa có sản phẩm lên kệ 😞</Text>)
                                : (
                                    listingList.map((listing) => (
                                        <View
                                            key={listingList.listingId}
                                            style={{
                                                flexDirection: 'column',
                                                alignItems: 'flex-start',
                                                paddingBottom: 15,
                                                backgroundColor: '#F5F5F5', // Add this line to set the background color
                                                borderRadius: 15,
                                            }}
                                            onTouchEnd={() => navigation.navigate('Lessee view product detail', { listing: listing })}
                                        >
                                            <Image
                                                alt="thumbnail"
                                                width={150}
                                                height={150}
                                                padding={5}
                                                source={{ uri: listing.images[0] }}
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
                                                    {listing.product.productName.length > 11 ? listing.product.productName.substring(0, 11) + '...' : listing.product.productName}
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
                                                        <Text color='#9F6071' fontWeight={'bold'}>{listing.price.toLocaleString()}</Text>
                                                        / ngày
                                                    </Text>
                                                </Flex>
                                            </Flex>
                                        </View>
                                    ))
                                )}

                        </Flex>
                    </ScrollView>
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