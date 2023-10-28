import { Avatar, Box, CheckIcon, Flex, Heading, Image, ScrollView, Select, Stack, Text, Toast } from "native-base";
import React from "react";
import { StyleSheet, Animated, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GradientButton } from "../../../components/GradientButton";
import { useIsFocused } from "@react-navigation/native";


import { store } from "../../../state/store";
import * as ListingService from "../../../services/Listing";
import { Touchable } from "react-native";





export const LessorHome = ({ navigation }) => {

    const fadeAnim = React.useRef(new Animated.Value(500)).current;

    const user = store.useState((state) => state.user);
    const listingStatus = store.useState((state) => state.listingStatus);
    const listingStatusColor = store.useState((state) => state.listingStatusColor);
    const [listing, setListing] = React.useState([]);
    const [isListEmpty, setIsListEmpty] = React.useState(true);

    const [sortStatus, setSortStatus] = React.useState("All");



    const handleGetListing = async () => {
        try {
            const res = await ListingService.getByUserId(user.userId);
            setListing(res);
        } catch (error) {
            console.error(error);
        }

        // alert(JSON.stringify(listing));
    };


    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);


    React.useEffect(() => {
        handleGetListing();
        if (listing.length !== 0) {
            setIsListEmpty(false);
        } else {
            setIsListEmpty(true);
        }
    }, [useIsFocused()]);


    const handleChangeRoute = (route) => {
        navigation.navigate(route);
    }

    const styles = StyleSheet.create({
        container: {
            paddingTop: 50,
            paddingBottom: 25,
            paddingLeft: 25,
            paddingRight: 25,
            width: '100%',
            height: '100%',
            backgroundColor: '#EDEDED',
        },
        text: {
            // textTransform: 'uppercase',
            color: '#FFF'
        },
        listingBox: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 6,
            margin: 10,
            columnGap: 10,
            backgroundColor: '#FFFFFF',
            borderRadius: 15,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 4,
            },
            elevation: 8,
            overflow: 'hidden',
        }
    })

    return (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            <Flex
                paddingX={15}
                paddingY={30}
                width='100%'
                flexDirection='column'
                height='100%'
                overflow='hidden'
            >
                <Flex
                    justifyContent='space-between'
                    flexDirection='row'
                    alignItems='center'
                    paddingBottom={15}
                    paddingTop={15}
                >
                    <Box>
                        <Heading fontSize={20} fontWeight='bold'>Xin Chào,</Heading>
                        <Heading fontSize={36} fontWeight='bold' color='#22A4DD'>{user.firstName} {user.lastName}</Heading>
                    </Box>
                    <Avatar bg="lightBlue.400" source={{ uri: user.images[0] }} size="lg"
                        onPress={() => navigation.navigate('Profile')}>
                        Avt
                        <Avatar.Badge bg="green.500" />
                    </Avatar>
                </Flex>

                <GradientButton onPress={() => navigation.navigate('Yêu cầu thuê')} text='Tìm kiếm yêu cầu' radius={15} colors={['#2A4AB6', '#269DDB']} />

                <Text paddingY={15} textAlign='center' fontSize={28} fontWeight='bold'>Tài sản trên louer</Text>

                <Flex
                    flexDirection='row'
                    justifyContent='space-between'
                    paddingBottom={15}
                >
                    <Flex
                        flexDirection='row'
                        style={{ columnGap: 5 }}
                    >
                        <GradientButton onPress={() => handleChangeRoute('History')} colors={['#2A4AB6', '#269DDB']} width={45} height={45} radius={15} prefixIcon={<Ionicons color='white' name='timer' size={22} />} />
                        <GradientButton onPress={() => handleChangeRoute('Activities')} colors={['#2A4AB6', '#269DDB']} width={45} height={45} radius={15} prefixIcon={<Ionicons color='white' name='list' size={22} />} />
                    </Flex>

                    <Select
                        selectedValue={sortStatus}
                        height={45}
                        width={170}
                        accessibilityLabel="Choose Service"
                        placeholder={sortStatus}
                        borderRadius={10}
                        fontSize={14}
                        fontWeight={700}
                        _selectedItem={{
                            bg: 'gray.100',
                            endIcon: <CheckIcon size="5" />
                        }} onValueChange={value => setSortStatus(value)}
                    >
                        <Select.Item label="Tất cả" value="All" />
                        {Object.keys(listingStatus).map((key) => (
                            <Select.Item label={listingStatus[key]} value={listingStatus[key]} />

                        ))}
                    </Select>
                </Flex>

                <Box
                    flex={1}
                    overflow='hidden'
                >
                    {(isListEmpty) ?
                        (
                            <Box height={30} /> &&
                            <Text fontSize='xl' fontWeight='semibold' color='gray.500'>Chưa có sản phẩm được đăng</Text>) :
                        (
                            <ScrollView>
                                {
                                    listing
                                        .slice()
                                        .reverse()
                                        .map((item) => (
                                            (sortStatus === 'All') ? (
                                                (item.images !== null) &&
                                                <Box
                                                    style={styles.listingBox}
                                                >
                                                    <Image alt="thumbnail"
                                                        source={{ uri: item.images[0] }}
                                                        borderRadius={15} width={100} height={100} paddingLeft={5}
                                                    />
                                                    <Box
                                                        flex={1}
                                                    // paddingRight={5}
                                                    // paddingLeft={5}
                                                    >
                                                        <Text fontSize='md' fontWeight='semibold' color='#01005C' marginBottom={15}>{item.product.productName}</Text>
                                                        <Text fontSize='sm' fontWeight='bold' color={listingStatusColor[item.statusColor]}>{listingStatus[item.listingStatus]}</Text>
                                                    </Box>
                                                    <Ionicons onPress={() => navigation.navigate('Product details', { item: item })} name='chevron-forward' size={28} />
                                                </Box>
                                            ) : (
                                                (item.listingStatus === sortStatus && item.images !== null)
                                                &&(
                                                    (console.log('listing Status:',item.listingStatus)) &&
                                                    <Box
                                                        style={styles.listingBox}
                                                    >
                                                        <Image alt="thumbnail"
                                                            source={{ uri: item.images[0] }}
                                                            borderRadius={15} width={100} height={100} paddingLeft={5}
                                                        />
                                                        <Box
                                                            flex={1}
                                                        // paddingRight={5}
                                                        // paddingLeft={5}
                                                        >
                                                            <Text fontSize='md' fontWeight='semibold' color='#01005C' marginBottom={15}>{item.product.productName}</Text>
                                                            <Text fontSize='sm' fontWeight='bold' color={listingStatusColor[item.statusColor]}>{listingStatus[item.listingStatus]}</Text>
                                                        </Box>
                                                        <Ionicons onPress={() => navigation.navigate('Product details', { item: item })} name='chevron-forward' size={28} />
                                                    </Box>

                                                )
                                            )


                                        ))
                                }
                            </ScrollView>

                        )}

                </Box>
            </Flex>
        </Animated.View>
    );

};