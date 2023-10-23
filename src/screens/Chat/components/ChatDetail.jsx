import { Avatar, Box, Flex, Image, Input, ScrollView, Stack, Text, View } from "native-base";
import React from "react";
import { StyleSheet, Animated } from "react-native";
import { useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import prodImage from '../../../assets/images/prod1.png';
import { GradientButton } from "../../../components/GradientButton";
import { useEffect } from "react";
import { store } from "../../../state/store";
import { getGradientColor, getMainColor } from "../../../state/color";

export const ChatDetail = ({ navigation, route }) => {

    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const user = store.useState((state) => state.user)

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const { chatDetail } = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <Text fontWeight='bold'>{chatDetail.receiver}</Text>,
            tabBarStyle: { display: 'none' }
        });
    }, [navigation, chatDetail]);

    const [currentUser, setCurrentUser] = React.useState('K');
    const productPreview = {
        thumbnail: prodImage,
        price: '500',
        name: 'Nikon D7000'
    }

    useEffect(() => {
        if(user.userMode) {
            setCurrentUser('A')
        } else {
            setCurrentUser('K')
        }
    }, [user.userMode])

    return (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
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
                    <Flex
                        flexDirection='row'
                        alignItems='center'
                        columnGap={15}
                    >
                        <Flex><Ionicons name="chevron-back" size={22} onPress={() => navigation.goBack()}/></Flex>
                        <Text fontSize={22} fontWeight='semibold'>{chatDetail.receiver}</Text>
                    </Flex>
                    <Avatar bg="amber.500" source={{
                        uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                    }} size="md">
                        <Avatar.Badge bg="green.500" />
                    </Avatar>
                </Flex>

                <Box
                    flex={1}
                    width='100%'
                    marginTop={15}
                    paddingX={15}
                >
                    <ScrollView
                        width='100%'
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                padding: 15,
                                backgroundColor: '#FFF',
                                borderRadius: 15,
                                marginBottom: 15
                            }}
                        >
                            <Box width={150} height={100}><Image source={productPreview.thumbnail} borderRadius={10} alt="thumbnail"/></Box>
                            <View
                                style={{ flex: 1 }}
                            >
                                <Flex
                                    flexDirection='column'
                                    justifyContent='space-between'
                                >
                                    <Text textAlign='left' numberOfLines={1} ellipsizeMode='tail' fontSize={16} fontWeight='semibold' color='#01005C'>{productPreview.name}</Text>
                                    <Flex
                                        flexDirection='row'
                                        width='100%'
                                        justifyContent='space-between'
                                        alignItems='flex-end'
                                    >
                                        <Text>{productPreview.price}k/ngày</Text>
                                        <GradientButton onPress={() => 
                                            navigation.navigate('Lessor View Product Details', 
                                            {product: productPreview})
                                            } 
                                            prefixIcon={<Ionicons 
                                                name="chevron-forward" 
                                                color='white' size={18} />} 
                                            colors={getGradientColor(user.userMode)} 
                                            width={35} height={35} radius={5} paddingBottom={0} paddingTop={0} paddingLeft={0} paddingRight={0} 
                                        />
                                    </Flex>
                                </Flex>
                            </View>
                        </View>
                        {
                            chatDetail?.messages.map((item) => (
                                (currentUser === item.sender) ?
                                    <Flex
                                        width='100%'
                                        justifyContent='flex-start'
                                        flexDirection='row'
                                        marginBottom='15px'
                                    >
                                        <Box
                                            width='80%'
                                            backgroundColor='#FFF'
                                            paddingX='15px'
                                            paddingY='15px'
                                            borderTopRadius={20}
                                            borderBottomRightRadius={20}
                                            borderBottomLeftRadius={5}
                                        >
                                            <Text fontSize={12} fontWeight='medium'>{item.content}</Text>
                                        </Box>
                                    </Flex> :
                                    <Flex
                                        width='100%'
                                        justifyContent='flex-end'
                                        flexDirection='row'
                                        marginBottom='15px'
                                    >
                                        <Box
                                            width='80%'
                                            backgroundColor={user.userMode ? '#4196D2' : '#FF5484'}
                                            paddingX='15px'
                                            paddingY='15px'
                                            borderTopRadius={20}
                                            borderBottomLeftRadius={20}
                                            borderBottomRightRadius={5}
                                        >
                                            <Text color={'#FFF'} fontSize={12} fontWeight='medium'>{item.content}</Text>
                                        </Box>
                                    </Flex>
                            ))
                        }
                    </ScrollView>
                </Box>


                <Box
                    backgroundColor='#FAFAFA'
                    paddingX="15px"
                    paddingY="30px"
                >
                    <Input backgroundColor='#FFF' rightElement={<Stack padding='15px' backgroundColor='#FFF'><Ionicons color='#B9C6CC' size={22} name="send" /></Stack>} variant="rounded" placeholder="Nhập tin nhắn ..." size='2xl' />
                </Box>
            </Box>
        </Animated.View >
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