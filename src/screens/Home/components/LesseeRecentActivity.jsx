import { Box, Flex, Stack, Text } from "native-base";
import React from "react";
import { StyleSheet, Animated, ScrollView, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Prod1 from '../../../assets/images/prod1.png'
import Prod2 from '../../../assets/images/prod2.png'
import Prod3 from '../../../assets/images/prod3.png'
import { useLayoutEffect } from "react";
import { GradientButton } from "../../../components/GradientButton";

const prodData = [
    {
        name: 'Canon EOS 700D',
        user: 'Nguyễn Văn A - SE170111',
        thumbnail: Prod1,
        rating: 100,
    },
    {
        name: 'Nikon D7000',
        user: 'Nguyễn Văn C - SE170111',
        thumbnail: Prod2,
        rating: 100,
    },
    {
        name: 'Canon 5d Mark IV',
        user: 'Nguyễn Văn B - SE170111',
        thumbnail: Prod3,
        rating: 100,
    },
    {
        name: 'Nikon D7000',
        user: 'Nguyễn Văn D - SE170111',
        thumbnail: Prod2,
        rating: 100,
    }
]

export const LesseeRecentActivity = ({ navigation }) => {

    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const [service, setService] = React.useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <Text fontWeight='bold' fontSize={18}>Giao dịch gần đây</Text>,
            headerLeft: () => <Ionicons name="chevron-back" size={18} onPress={() => navigation.goBack()} />,
            headerRight: () => <GradientButton paddingLeft={0} paddingRight={0} paddingTop={0} paddingBottom={0} prefixIcon={<Ionicons name="refresh-outline" size={22} />} width={45} height={45} radius={15} colors={['#9F3553', '#E98EA6']} />,
        });
    }, [navigation]);

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
                <ScrollView>
                    {
                        prodData.map((item, index) => (
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
                                    <Text textAlign='left' fontSize={16} fontWeight={700} color='#01005C'>{item.name}</Text>
                                    <Text textAlign='left' fontSize={14} fontWeight={700} >{item.user}</Text>
                                    <Flex
                                        flexDirection='row'
                                        alignItems='center'
                                        style={{
                                            columnGap: 5
                                        }}
                                    >
                                        <Ionicons name="heart-outline" size={18} />
                                        <Text textAlign='left'>{item.rating}%</Text>
                                    </Flex>
                                </View>
                                <Ionicons name='chevron-forward' size={20} />
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