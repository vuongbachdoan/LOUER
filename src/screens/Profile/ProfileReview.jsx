import { Avatar, Box, Button, Flex, Icon, Image, Text, View, ScrollView } from "native-base";
import React from "react";
import { StyleSheet, Animated } from "react-native";
import AvatarUser from '../../assets/images/placeholder.png';
import { Ionicons } from "@expo/vector-icons";
import { GradientButton } from "../../components/GradientButton";
import * as Progress from 'react-native-progress';

import demoCmtAva from "../../assets/images/demo/ava lessee.jpg";


import { store } from "../../state/store";
import { getGradientColor, getMainColor } from "../../state/color";


const reviews = [
    {
        userId: 1,
        name: "Nguyễn Văn A",
        avaLink: demoCmtAva,
        date: "2021-11-01",
        isLike: true,
        comment: "Tôi rất hài lòng với trải nghiệm thuê của tôi với người dùng này. Sản phẩm được giữ gìn rất tốt và quá trình giao nhận cũng rất thuận tiện."
    },
    {
        userId: 2,
        name: "Trần Thị B",
        avaLink: demoCmtAva,
        date: "2021-10-28",
        isLike: false,
        comment: "Tôi không hài lòng với trải nghiệm thuê của mình với người dùng này. Sản phẩm không hoạt động đúng cách và người dùng không phản hồi khi tôi liên hệ với họ."
    },
    {
        userId: 3,
        name: "Lê Văn C",
        avaLink: demoCmtAva,
        date: "2021-10-25",
        isLike: true,
        comment: "Tôi rất ấn tượng với người dùng này. Họ rất nhanh chóng và thân thiện trong quá trình giao nhận sản phẩm. Tôi sẽ thuê lại từ họ trong tương lai."
    },
    {
        userId: 4,
        name: "Phạm Thị D",
        avaLink: demoCmtAva,
        date: "2021-10-23",
        isLike: true,
        comment: "Tôi rất hài lòng với sản phẩm và dịch vụ của người dùng này. Họ rất chuyên nghiệp và sản phẩm được giữ gìn rất tốt."
    },
    {
        userId: 5,
        name: "Hoàng Văn E",
        avaLink: demoCmtAva,
        date: "2021-10-20",
        isLike: false,
        comment: "Tôi không hài lòng với sản phẩm và dịch vụ của người dùng này. Sản phẩm không đúng như mô tả và người dùng không phản hồi khi tôi liên hệ với họ."
    }
];

export const ProfileReview = ({ navigation }) => {
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
                        style={{ columnGap: 15 }}
                        paddingTop={15}
                        paddingBottom={15}
                    >
                        <Flex><Ionicons name="chevron-back" size={22} onPress={() => navigation.goBack()} /></Flex>
                        <Text fontSize={22} fontWeight='semibold'
                            alignItems={'center'}
                        >Đánh giá của tôi</Text>
                    </Flex>
                </Flex>
                <Flex
                    width='100%'
                    flexDirection='row'
                    justifyContent='center'
                    alignItems='center'
                >
                    <Text fontSize={22} fontWeight='extrabold'
                        color={getMainColor(user.userMode)}
                        flexDirection={'column'}
                        alignItems={'center'}
                    >
                        {user.firstName} {user.middleName} {user.lastName}
                    </Text>
                </Flex>


                <Box
                    flex={1}
                    width='100%'
                    paddingX={15}
                >

                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            padding: 15,
                            backgroundColor: '#FFF',
                            borderRadius: 15,
                            columnGap: 15,
                            marginBottom: 15
                        }}
                    >
                        <View
                            style={{
                                width: "100%",
                                height: 130,
                                backgroundColor: '#F9F9F9',
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: 'transparent',
                            }}
                        >
                            <Flex
                                width='100%'
                                flexDirection='column'
                                justifyContent='center'
                                alignItems='center'
                            >
                                <Text fontSize={17} fontWeight='light'>
                                    Dựa trên {user.negativeRating + user.positiveRating} đánh giá
                                </Text>
                                <Flex
                                    width='100%'
                                    flexDirection='row'
                                    justifyContent='center'
                                    alignItems='center'
                                >
                                    <Ionicons name="thumbs-up-sharp" size={20} />
                                    <Text fontSize={22} fontWeight='bold'
                                        paddingLeft={5} paddingRight={5} paddingTop={2} paddingBottom={2}>
                                        {user.positiveRating}/{user.negativeRating}
                                    </Text>
                                    <Ionicons name="thumbs-down-sharp" size={20} />
                                </Flex>
                                <Flex
                                    width='100%'
                                    flexDirection='column'
                                    justifyContent='center'
                                    alignItems='center'
                                >
                                    <Text fontSize={17} fontWeight='light' paddingBottom={2}>
                                        <Text fontWeight='semibold' display='inline'>{user.rating}%</Text> đánh giá tích cực

                                    </Text>
                                    <Progress.Bar
                                        color='rgba(124, 172, 15, 1)'
                                        unfilledColor='rgba(235, 87, 12, 1)'
                                        borderWidth={0}
                                        height={10}
                                        progress={user.rating / 100} width={200} />

                                </Flex>


                            </Flex>
                        </View>


                        <View
                            style={{
                                width: "100%",
                                height: 50,
                                // backgroundColor: '#898989',
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: 'transparent',
                            }}
                        >
                            <Flex
                                width='100%'
                                flexDirection='column'
                                justifyContent='flex-start' // updated property
                                alignItems='flex-start'
                                paddingTop={2}
                            >
                                <Text fontWeight='bold' fontSize={20}>Đánh giá</Text>
                            </Flex>
                        </View>
                    </View>


                    <Flex
                        marginTop={15}
                        flexDirection='column'
                        style={{
                            rowGap: 15
                        }}
                    >
                        <Box
                            flex={1}
                            overflow='hidden'
                        >
                            {/* List of comments */}
                            <ScrollView>
                                {reviews.map((review, index) => (
                                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                        <Box
                                            key={index} // Use a unique key for each item
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                paddingBottom: 15,
                                                columnGap: 15
                                            }}
                                        >
                                            {/* <Image alt="thumbnail" source={review.avaLink} borderRadius={25} width={50} height={50} /> */}
                                            <View style={{ flex: 1 }}>
                                                <Text style={{ fontWeight: 'bold' }}>{review.name}</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                                    <Ionicons name={review.isLike ? "thumbs-up-sharp" : "thumbs-down-sharp"} size={20} color={review.isLike ? 'green' : 'red'} />
                                                    <Text style={{ marginLeft: 5 }}>{review.date}</Text>
                                                </View>
                                                <Text style={{ marginTop: 5 }}>{review.comment}</Text>
                                            </View>



                                        </Box>

                                    </View>
                                ))}
                            </ScrollView>
                        </Box>

                    </Flex>
                </Box>
            </Box>
        </Animated.View >
    );
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