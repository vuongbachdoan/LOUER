import { Avatar, Box, CheckIcon, Flex, Heading, Image, ScrollView, Select, Stack, Text } from "native-base";
import React from "react";
import { StyleSheet, Animated, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GradientButton } from "../../../components/GradientButton";
import Prod1 from '../../../assets/images/prod1.png'
import Prod2 from '../../../assets/images/prod2.png'
import Prod3 from '../../../assets/images/prod3.png'



import { store } from "../../../state/store";
import * as UserService from "../../../services/User";
import * as ListingService from "../../../services/Listing";

// const prodData = [
//     {
//         name: 'Canon EOS 700D',
//         status: 'pending',
//         statusMessage: '2 Giao dịch đang đợi',
//         statusColor: '#FFC700',
//         thumbnail: Prod1
//     },
//     {
//         name: 'Nikon D7000',
//         status: 'warning',
//         statusMessage: 'Còn thiếu đền bù thiệt hại',
//         statusColor: '#FC0000',
//         thumbnail: Prod2
//     },
//     {
//         name: 'Canon 5d Mark IV',
//         status: 'available',
//         statusMessage: 'Chưa có giao dịch',
//         statusColor: '#0166FE',
//         thumbnail: Prod3
//     },
//     {
//         name: 'Nikon D7000',
//         status: 'available',
//         statusMessage: 'Chưa có giao dịch',
//         statusColor: '#0166FE',
//         thumbnail: Prod2
//     },
//     {
//         name: 'Canon EOS 700D',
//         status: 'available',
//         statusMessage: 'Chưa có giao dịch',
//         statusColor: '#0166FE',
//         thumbnail: Prod1
//     }
// ]

const prodData = []

export const LessorHome = ({ navigation }) => {

    const fadeAnim = React.useRef(new Animated.Value(500)).current;

    const user = store.useState((state) => state.user);
    // const listing = store.useState((state) => state.listing);

    const [service, setService] = React.useState("");

    const [listing, setListing] = React.useState([]);



    const handleGetListing = async () => {
        try {
            ListingService.getByUserId(user.userId).then((data) => {
                // const json = JSON.stringify(data);
                setListing(data);
                // ListingService.getByUserId(user.userId).then((data) => {
            });
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

    React.useEffect(() => {}, [listing]);



    React.useEffect(() => {
        setTimeout(() => {
            handleGetListing();
        }, 1000); // wait for 1 second before trying again
    }, [navigation, listing]);


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
            backgroundColor: '#FAFAFA',
        },
        text: {
            textTransform: 'uppercase',
            color: '#FFF'
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
                        <Heading fontSize={36} fontWeight='bold'>Xin Chào</Heading>
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
                        selectedValue={service}
                        height={45}
                        width={120}
                        accessibilityLabel="Choose Service"
                        placeholder="All"
                        borderRadius={10}
                        fontSize={14}
                        fontWeight={700}
                        _selectedItem={{
                            bg: 'gray.100',
                            endIcon: <CheckIcon size="5" />
                        }} onValueChange={itemValue => setService(itemValue)}
                    >
                        <Select.Item label="Pending" value="Pending" />
                        <Select.Item label="Available" value="Available" />
                        <Select.Item label="Leasing" value="Leasing" />
                        <Select.Item label="Damanged" value="Damanged" />
                    </Select>
                </Flex>

                <Box
                    flex={1}
                    overflow='hidden'
                >
                    {(!listing && listing.length > 0) ?
                        (
                            <Box height={30} /> &&
                            <Text fontSize='xl' fontWeight='semibold' color='gray.500'>Chưa có sản phẩm được đăng</Text>) :
                        (
                            <ScrollView>
                                {
                                    listing.map((item, index) => (
                                        // console.log(item),
                                        
                                        <Box
                                            key={index} // Use a unique key for each item
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                paddingBottom: 10,
                                                columnGap: 15
                                            }}
                                        >
                                            
                                            {/* <Image alt="thumbnail" source={} borderRadius={10} width={100} height={100} /> */}
                                            <Box
                                                flex={1}
                                            >
                                                <Text fontSize='xl' fontWeight='semibold' color='#01005C' marginBottom={15}>{item.product.productName}</Text>
                                                <Text fontSize='sm' fontWeight='semibold' color={item.statusColor}>{item.listingStatus}</Text>
                                            </Box>
                                            <Ionicons onPress={() => navigation.navigate('Product details', { product: item })} name='chevron-forward' size={28} />
                                        </Box>
                                        ))
                                        // prodData.map((item, index) => (
                                        //     <Box
                                        //         key={index} // Use a unique key for each item
                                        //         style={{
                                    //             flexDirection: 'row',
                                    //             justifyContent: 'space-between',
                                    //             alignItems: 'center',
                                    //             paddingBottom: 15,
                                    //             columnGap: 15
                                    //         }}
                                    //     >
                                    //         <Image alt="thumbnail" source={item.thumbnail} borderRadius={10} width={100} height={100} />
                                    //         <Box
                                    //             flex={1}
                                    //         >
                                    //             <Text fontSize='xl' fontWeight='semibold' color='#01005C' marginBottom={15}>{item.name}</Text>
                                    //             <Text fontSize='sm' fontWeight='semibold' color={item.statusColor}>{item.statusMessage}</Text>
                                    //         </Box>
                                    //         <Ionicons onPress={() => navigation.navigate('Product details', { product: item })} name='chevron-forward' size={28} />
                                    //     </Box>
                                    // ))
                                }
                            </ScrollView>

                        )}

                </Box>
            </Flex>
        </Animated.View>
    );

};