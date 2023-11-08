import { Avatar, Box, Button, CheckIcon, Divider, Flex, Heading, Icon, Select, Stack, Text, Image } from "native-base";
import React from "react";
import { StyleSheet, Animated, ScrollView, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GradientButton } from "../../../components/GradientButton";
import Prod1 from '../../../assets/images/prod1.png'
import Prod2 from '../../../assets/images/prod2.png'
import Prod3 from '../../../assets/images/prod3.png'



import { store } from "../../../state/store";
import * as UserService from "../../../services/User";




const prodData = [
    {
        name: 'Canon EOS 700D',
        status: 'pending',
        statusMessage: '2 Giao dịch đang đợi',
        statusColor: '#FFC700',
        thumbnail: Prod1
    },
    {
        name: 'Nikon D7000',
        status: 'warning',
        statusMessage: 'Còn thiếu đền bù thiệt hại',
        statusColor: '#FC0000',
        thumbnail: Prod2
    },
    {
        name: 'Canon 5d Mark IV',
        status: 'available',
        statusMessage: 'Chưa có giao dịch',
        statusColor: '#0166FE',
        thumbnail: Prod3
    },
    {
        name: 'Nikon D7000',
        status: 'available',
        statusMessage: 'Chưa có giao dịch',
        statusColor: '#0166FE',
        thumbnail: Prod2
    },
    {
        name: 'Canon EOS 700D',
        status: 'available',
        statusMessage: 'Chưa có giao dịch',
        statusColor: '#0166FE',
        thumbnail: Prod1
    }
]
export const Dashboard = ({ navigation }) => {

    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    const userId = '1';
    const user = store.useState((state) => state.user);




    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const [service, setService] = React.useState("");

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
                <Stack
                    display='flex'
                    justifyContent='space-between'
                    flexDirection='row'
                    alignItems='center'
                    paddingBottom={15}
                    paddingTop={15}
                >
                    <Stack>
                        <Heading fontSize={36} fontWeight='bold'>Xin Chào</Heading>
                        <Heading fontSize={36} fontWeight='bold' color='#22A4DD'>{user.firstName} {user.middleName} {user.lastName}</Heading>
                    </Stack>
                    <Avatar bg="lightBlue.400" source={{
                        uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    }} size="md">
                        Avt
                        <Avatar.Badge bg="green.500" />
                    </Avatar>
                </Stack>

                <GradientButton text='Tìm kiếm yêu cầu' radius={15} colors={['#2A4AB6', '#269DDB']} />

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
                        <GradientButton colors={['#2A4AB6', '#269DDB']} width={45} height={45} radius={15} prefixIcon={<Ionicons color='white' name='timer' size={24} />} />
                        <GradientButton colors={['#2A4AB6', '#269DDB']} width={45} height={45} radius={15} prefixIcon={<Ionicons color='white' name='list' size={24} />} />
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
                        <Select.Item label="All" value="all" />
                        <Select.Item label="All" value="all" />
                        <Select.Item label="All" value="all" />
                    </Select>
                </Flex>

                <ScrollView>
                    {
                        prodData.map((item, index) => (
                            <View
                                key={index} // Use a unique key for each item
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingBottom: 15,
                                }}
                            >
                                <Image source={item.thumbnail} borderRadius={10} width={100} />
                                <View>
                                    <Text fontSize='xl' fontWeight='semibold' color='#01005C'>{item.name}</Text>
                                    <Text fontSize='small' fontWeight='semibold' color={item.statusColor}>{item.statusMessage}</Text>
                                </View>
                                <Ionicons name='chevron-forward' size={28} />
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