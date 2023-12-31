import { Box, Checkbox, ScrollView, Stack, Text } from "native-base";
import React from "react";
import { StyleSheet, Animated } from "react-native";
import { GradientButton } from "../../../components/GradientButton";
import { useState } from "react";

export const LessorRules = ({ navigation }) => {

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
    return (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            <Stack
                paddingX={15}
                paddingBottom={30}
                width='100%'
                display='flex'
                flexDirection='column'
                height='100vh'
                overflow='hidden'
            >
                <ScrollView>
                    <Text marginTop={15} fontSize={16} fontWeight='semibold'>Điều khoản chung</Text>
                    <Text color="gray.500" fontSize={14}>
                        1. Thay đổi điều khoản:
                    </Text>
                    <Text color="gray.500" fontSize={14}>
                        - Mọi thay đổi đối với các điều khoản và điều kiện thuê cần được thực hiện bằng văn bản và có sự đồng ý từ cả hai bên.
                    </Text>
                    <Text color="gray.500" fontSize={14}>
                        2. Chấm dứt hợp đồng:
                    </Text>
                    <Text color="gray.500" fontSize={14}>
                        - Hợp đồng thuê có thể được chấm dứt nếu một trong hai bên vi phạm các điều khoản quan trọng và không khắc phục được sau khi nhận được thông báo bằng văn bản từ bên kia.
                    </Text>
                    <Text color="gray.500" fontSize={14}>
                        - Mỗi bên cần tuân thủ các quy định về chấm dứt hợp đồng và trả lại tài sản thuê theo yêu cầu.
                    </Text>


                    <Text marginTop={15} fontSize={16} fontWeight='semibold'>Điều khoản dành cho người cho thuê</Text>
                    <Text color="gray.500" fontSize={14}>
                        1. Cung cấp tài sản:
                    </Text>
                    <Text color="gray.500" fontSize={14}>
                        - Người cho thuê cần cung cấp tài sản thuê đúng chất lượng và trong thời gian đã thỏa thuận trong hợp đồng thuê.
                    </Text>
                    <Text color="gray.500" fontSize={14}>
                        - Người cho thuê cần đảm bảo tài sản thuê đáp ứng các yêu cầu và tiêu chuẩn kỹ thuật đã được thỏa thuận.
                    </Text>
                    <Text color="gray.500" fontSize={14}>
                        2. Bảo mật thông tin:
                        - Người cho thuê cần bảo mật thông tin liên quan đến người thuê và không tiết lộ thông tin này cho bên thứ ba mà không có sự đồng ý bằng văn bản từ người thuê.
                    </Text>
                    <Text color="gray.500" fontSize={14}>
                        3. Sửa chữa và bảo trì:
                    </Text>
                    <Text color="gray.500" fontSize={14}>
                        - Người cho thuê cần thực hiện các công việc sửa chữa và bảo trì định kỳ để đảm bảo tài sản thuê hoạt động tốt.
                    </Text>
                    <Text color="gray.500" fontSize={14}>
                        - Người cho thuê cần thông báo trước cho người thuê về bất kỳ sửa chữa hoặc bảo trì nào có thể ảnh hưởng đến việc sử dụng tài sản.
                    </Text>

                    <Checkbox marginTop={15} isChecked={isChecked} onChange={handleRulesAllow} colorScheme="green" display='flex' flexDirection='row'>
                        <Text>Tôi đồng ý với điều khoản trên.</Text>
                    </Checkbox>
                    <Stack marginTop={15}>
                        <GradientButton onPress={() => navigation.navigate('Lessor request sent')} disabled={isChecked === false} text='Xác nhận cho thuê' colors={isChecked ? ['#9F3553', '#E98EA6'] : ['#868686', '#868686']} width='100%' height={45} radius={15} />
                    </Stack>
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