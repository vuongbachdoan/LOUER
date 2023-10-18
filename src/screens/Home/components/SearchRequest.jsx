import { Badge, Box, Flex, Input, Stack, Text } from "native-base";
import React from "react";
import { StyleSheet, Animated, ScrollView, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Prod1 from '../../../assets/images/prod1.png'
import Prod2 from '../../../assets/images/prod2.png'
import Prod3 from '../../../assets/images/prod3.png'
import { GradientButton } from "../../../components/GradientButton";

const requests = [
    {
        user: 'Nguyễn Văn A - SE170111',
        thumbnail: Prod1,
        title: 'Cần thuê Camera cho ngày hôm nay đi với bồ',
        reactions: '80%',
        address: 'FPT HCM, Q.9',
        requirement: '2 Cam tình trạng tốt, cond cao,tối thiểu là Nikon D7000. Thuê khoảng chiều t3 này.',
        startAt: 'Chiều 11/T7, 2023',
        endAt: 'Chiều 12/T7, 2023'
    },
    {
        user: 'Nguyễn Văn A - SE170111',
        thumbnail: Prod1,
        title: 'Cần thuê Camera cho ngày hôm nay đi với bồ',
        reactions: '80%',
        address: 'FPT HCM, Q.9',
        requirement: '2 Cam tình trạng tốt, cond cao,tối thiểu là Nikon D7000. Thuê khoảng chiều t3 này.',
        startAt: 'Chiều 11/T7, 2023',
        endAt: 'Chiều 12/T7, 2023'
    },
    {
        user: 'Nguyễn Văn A - SE170111',
        thumbnail: Prod1,
        title: 'Cần thuê Camera cho ngày hôm nay đi với bồ',
        reactions: '80%',
        address: 'FPT HCM, Q.9',
        requirement: '2 Cam tình trạng tốt, cond cao,tối thiểu là Nikon D7000. Thuê khoảng chiều t3 này.',
        startAt: 'Chiều 11/T7, 2023',
        endAt: 'Chiều 12/T7, 2023'
    },
]

export const SearchRequest = ({ navigation }) => {

    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            <Stack
                paddingX={15}
                paddingY={30}
                width='100%'
                display='flex'
                flexDirection='column'
                height='100vh'
                overflow='hidden'
            >
                <Input backgroundColor='#FFF' leftElement={<Stack padding='15px' backgroundColor='#FFF'><Ionicons color='#B9C6CC' size={22} name="search" /></Stack>} variant="rounded" placeholder="Find requested Property ..." size='2xl' />
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
                <ScrollView>
                    {
                        requests.map((item, index) => (
                            <View
                                key={index}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',
                                    paddingBottom: 15,
                                }}
                            >
                                <Box width={150} height={100}><Image source={item.thumbnail} borderRadius={10} /></Box>
                                <View
                                    style={{ flex: 1 }}
                                >
                                    <Text textAlign='left' numberOfLines={1} ellipsizeMode='tail' fontSize={16} fontWeight='semibold' color='#01005C'>{item.title}</Text>
                                    <Text textAlign='left' fontSize={14} fontWeight='semibold' >{item.user}</Text>
                                    <Flex flexDirection='row' columnGap={15}>
                                        <Ionicons name="heart-outline" size={18} />
                                        <Text textAlign='left' fontSize={14} fontWeight='semibold' >{item.reactions}</Text>
                                    </Flex>
                                    <Flex
                                        flexDirection='row'
                                        justifyContent='space-between'
                                        alignItems='flex-end'
                                    >
                                        <Text textAlign='left' fontSize={14} fontWeight='semibold' color='gray.500' >{item.address}</Text>
                                        <GradientButton onPress={() => navigation.navigate('View lessor request', {request: item})} paddingBottom={0} paddingTop={0} paddingLeft={0} paddingRight={0} prefixIcon={<Ionicons name="chevron-forward" color='#FFF' size={22} />} colors={['#2A4AB6', '#269DDB']} width={35} height={35} radius={5} />
                                    </Flex>
                                </View>
                            </View>
                        ))
                    }
                </ScrollView>
            </Stack>
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