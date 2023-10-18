import { Box, Checkbox, Flex, ScrollView, Stack, Text } from "native-base";
import React from "react";
import { StyleSheet, Animated } from "react-native";
import { GradientButton } from "../../../components/GradientButton";
import { useState } from "react";
import { useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

export const LesseeNoteBeforeOrder = ({ navigation }) => {

    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const [isChecked, setIsChecked] = useState(false);
    const handleRulesAllow = () => {
        setIsChecked(!isChecked)
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <Text fontWeight='bold' fontSize={24} color='#FDB400'>Lưu ý khi thuê</Text>,
        });
    }, [navigation]);

    return (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            <Box
                marginLeft={15}
                marginRight={15}
            >
                <ScrollView>
                    <Box
                        width='100%'
                    >
                        <Flex
                            flexDirection='row'
                            style={{columnGap: 15}}
                            width='100%'
                        >
                            <Box marginTop='5px'>
                                <Ionicons name='grid-outline' size={18} />
                            </Box>
                            <Box>
                                <Text fontSize={16} fontWeight='semibold'>Kiểm tra và xác thực thông tin</Text>
                                <Text color="gray.500" fontSize={14}>
                                    Cần kiểm tra và xác thực thông tin của bên đối tác để đảm bảo tính xác thực và tin cậy.
                                </Text>
                            </Box>
                        </Flex>

                        <Flex
                            flexDirection='row'
                            style={{columnGap: 15}}
                            marginBottom={15}
                        >
                            <Stack marginTop='5px'>
                                <Ionicons name='document-text-outline' size={18} />
                            </Stack>
                            <Stack>
                                <Text fontSize={16} fontWeight='semibold'>Đọc và hiểu hợp đồng</Text>
                                <Text color="gray.500" fontSize={14}>
                                    Cả hai bên cần đọc và hiểu kỹ nội dung trong hợp đồng thuê trước khi ký kết. Nếu có bất kỳ điều khoản nào gây khó hiểu hoặc không đồng ý, cần thảo luận và làm rõ trước khi cam kết.
                                </Text>
                            </Stack>
                        </Flex>

                        <Flex
                            flexDirection='row'
                            style={{columnGap: 15}}
                            marginBottom={15}
                        >
                            <Stack marginTop='5px'>
                                <Ionicons name='search-outline' size={18} />
                            </Stack>
                            <Stack>
                                <Text fontSize={16} fontWeight='semibold'>Kiểm tra tài sản</Text>
                                <Text color="gray.500" fontSize={14}>
                                    Trước khi thuê hoặc cho thuê, nên ghi chú và chụp ảnh tài sản để có bằng chứng về trạng thái ban đầu và tránh những tranh cãi về sau về tình trạng hoặc thiếu hụt của tài sản.
                                </Text>
                            </Stack>
                        </Flex>

                        <Checkbox marginTop={15} isChecked={isChecked} onChange={handleRulesAllow} colorScheme="green" display='flex' flexDirection='row'>
                            <Text>Tôi đồng ý với điều khoản trên.</Text>
                        </Checkbox>

                        <Stack marginTop={15}>
                            <GradientButton onPress={() => navigation.navigate('Lessee note before order')} radius={10} fontSize={18} text='Tiếp tục' height={55} colors={['#9F3553', '#E98EA6']} />
                        </Stack>
                    </Box>
                </ScrollView>
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