import { Box, Stack, Text } from "native-base";
import React from "react";
import { StyleSheet, Animated, ScrollView, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Prod1 from '../../../../assets/images/prod1.png'
import Prod2 from '../../../../assets/images/prod2.png'
import Prod3 from '../../../../assets/images/prod3.png'

const prodData = [
    {
        name: 'Canon EOS 700D',
        user: 'Nguyễn Văn A - SE170111',
        startFrom: 'Sáng, 08/T7',
        endAt: null,
        thumbnail: Prod1,
        message: null,
        messageStatus: null
    },
    {
        name: 'Nikon D7000',
        user: 'Nguyễn Văn C - SE170111',
        startFrom: null,
        endAt: null,
        thumbnail: Prod2,
        message: 'Xác nhận gia hạn',
        messageStatus: '#0075FF',
        status: 'pending'
    },
    {
        name: 'Canon 5d Mark IV',
        user: 'Nguyễn Văn B - SE170111',
        startFrom: null,
        endAt: null,
        thumbnail: Prod3,
        message: 'Thiếu nợ bồi thường',
        messageStatus: '#BD0000',
        status: 'danger',
    },
    {
        name: 'Nikon D7000',
        user: 'Nguyễn Văn D - SE170111',
        startFrom: null,
        endAt: null,
        thumbnail: Prod2,
        message: 'Trễ hạn',
        messageStatus: '#FFB800',
        status: 'error',
    }
]

export const Activities = ({ navigation }) => {

    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
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
                                <Box  width={150} height={100}><Image source={item.thumbnail} borderRadius={10} /></Box>
                                <View
                                    style={{ flex: 1 }}
                                >
                                    <Text textAlign='left' fontSize={16} fontWeight={700} color='#01005C'>{item.name}</Text>
                                    <Text textAlign='left' fontSize={14} fontWeight={700} >{item.user}</Text>
                                    {
                                        item.startFrom &&
                                        <Text textAlign='left' fontSize={14} fontWeight={400} >Từ: {item.startFrom}</Text>
                                    }
                                    {
                                        item.endAt &&
                                        <Text textAlign='left' fontSize={14} fontWeight={400} >Đến: {item.endAt}</Text>
                                    }
                                    {
                                        item.message &&
                                        <Text fontSize={14} fontWeight={400} color={item.messageStatus}>{item.message}</Text>
                                    }
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