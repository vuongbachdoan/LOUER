import { Avatar, Badge, Box, Flex, Heading, Input, Stack, Text, Image } from "native-base";
import React from "react";
import { StyleSheet, Animated, ScrollView, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Prod1 from '../../../assets/images/prod1.png'
import Prod2 from '../../../assets/images/prod2.png'
import Prod3 from '../../../assets/images/prod3.png'
import { GradientButton } from "../../../components/GradientButton";



import { store } from "../../../state/store";




const items = [
    {
        prodName: 'Nikon D700',
        price: 500,
        thumbnail: Prod1
    },
    {
        prodName: 'Nikon D700',
        price: 500,
        thumbnail: Prod2
    },
    {
        prodName: 'Nikon D700',
        price: 500,
        thumbnail: Prod3
    },
    {
        prodName: 'Nikon D700',
        price: 500,
        thumbnail: Prod3
    },
]

export const LesseeHome = ({ navigation }) => {


    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const user = store.useState((state) => state.user);




    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

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
                    >
                        <Box>
                            <Heading fontSize={36} fontWeight='bold'>Xin Chào</Heading>
                            <Heading fontSize={36} fontWeight='bold' color='#FF5484'>{user.firstName} {user.middleName} {user.lastName}</Heading>
                        </Box>
                        <Avatar 
                            bg="lightBlue.400" 
                            source={{uri: user.avaLink}}
                            size="md">
                            Avt
                            <Avatar.Badge bg="green.500" />
                        </Avatar>
                    </Flex>

                    <GradientButton onPress={() => navigation.navigate('LesseeCreateRequest')} text='Yêu cầu cho thuê' radius={15} colors={['#9F3553', '#E98EA6']} />
                    <Input placeholder="Tìm sản phẩm" size='2xl' borderRadius={15} marginTop={15} leftElement={<Stack marginLeft={15}><Ionicons name="search-outline" size={22} /></Stack>} />
                    <Flex
                        marginTop={15}
                        flexDirection='row'
                        style={{
                            columnGap: 7.5
                        }}
                    >
                        <GradientButton paddingLeft={0} paddingRight={0} paddingTop={0} paddingBottom={0} prefixIcon={<Ionicons name="refresh-outline" size={22} />} width={45} height={45} radius={15} colors={['#9F3553', '#E98EA6']} />
                        <GradientButton onPress={() => navigation.navigate("LesseeRecentActivity")} paddingLeft={0} paddingRight={0} paddingTop={0} paddingBottom={0} prefixIcon={<Ionicons name="timer-outline" size={22} />} width={45} height={45} radius={15} colors={['#9F3553', '#E98EA6']} />
                        <GradientButton paddingLeft={0} paddingRight={0} paddingTop={0} paddingBottom={0} prefixIcon={<Ionicons name="list-outline" size={22} />} width={45} height={45} radius={15} colors={['#9F3553', '#E98EA6']} />
                    </Flex>
                    <Box marginBottom={30} marginTop={30}>
                        <ScrollView horizontal>
                            <Badge borderRadius={25} height={35} colorScheme="blue" marginRight={15}>
                                <Text>Camera</Text>
                            </Badge>
                            <Badge borderRadius={25} height={35} colorScheme="blue" marginRight={15}>
                                <Text>Lens</Text>
                            </Badge>
                            <Badge borderRadius={25} height={35} colorScheme="blue" marginRight={15}>
                                <Text>Laptop</Text>
                            </Badge>
                            <Badge borderRadius={25} height={35} colorScheme="blue" marginRight={15}>
                                <Text>Cable</Text>
                            </Badge>
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
                            {
                                items.map((item, index) => (
                                    <View
                                        key={index}
                                        style={{
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                            paddingBottom: 15,
                                        }}
                                    >
                                        <Image alt="thumbnail" width={150} height={150} source={item.thumbnail} borderRadius={10} />
                                        <Flex
                                            flexDirection='column'
                                            justifyContent='space-between'
                                            alignItems='flex-start'
                                        >
                                            <Text textAlign='left' fontSize={18} fontWeight='semibold' color='gray.500' >{item.prodName}</Text>
                                            <Flex
                                                flexDirection='row'
                                                alignItems='flex-end'
                                                justifyContent='space-between'
                                                style={{
                                                    columnGap: 15
                                                }}
                                            >
                                                <Text textAlign='left' fontSize={14} fontWeight='semibold' color='gray.500' >{item.price}k / ngày</Text>
                                                <GradientButton onPress={() => navigation.navigate('Lessee view product detail', {product: item})} paddingBottom={0} paddingTop={0} paddingLeft={0} paddingRight={0} prefixIcon={<Ionicons name="chevron-forward" color='#FFF' size={22} />} colors={['#9F3553', '#E98EA6']} width={35} height={35} radius={5} />
                                            </Flex>
                                        </Flex>
                                    </View>
                                ))
                            }
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
        backgroundColor: '#FAFAFA',
    },
    text: {
        textTransform: 'uppercase',
        color: '#FFF'
    }
})