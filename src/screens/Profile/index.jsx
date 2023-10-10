import { Avatar, Box, Button, Flex, Icon, Image, Text } from "native-base";
import React from "react";
import { StyleSheet, Animated } from "react-native";
import AvatarUser from '../../assets/images/placeholder.png';
import { Ionicons } from "@expo/vector-icons";

export const Profile = ({ navigation, route }) => {

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
            <Box
                paddingX={15}
                paddingY={30}
                width='100%'
                display='flex'
                flexDirection='column'
                minHeight='100%'
                overflow='hidden'
            >
                <Flex
                    flexDirection='column'
                    rowGap={15}
                    alignItems='center'
                >
                    <Image alt="user" source={AvatarUser} width={140} height={140} borderRadius={15} />
                    <Text fontSize='2xl' fontWeight='semibold' color='#1B6BB5'>Nguyễn Văn A</Text>
                    <Text fontSize='xl' marginBottom={15} fontWeight='semibold'>anvse170000@fpt.edu.vn</Text>
                    
                    <Button 
                        leftIcon={<Ionicons name="person-outline" size={22} />}
                        width='60%'
                        background='transparent'
                        color='#000'
                        variant='outline'
                        display='flex'
                        flexDirection='row'
                        columnGap={30}
                        justifyContent='flex-start'
                        maxW={220}
                        marginBottom={15}
                        borderRadius={8}
                    >
                        <Text>
                            Thông tin cá nhân
                        </Text>
                    </Button>
                    <Button 
                        leftIcon={<Ionicons name="star-outline" size={22} />}
                        width='60%'
                        background='transparent'
                        color='#000'
                        variant='outline'
                        display='flex'
                        flexDirection='row'
                        columnGap={30}
                        justifyContent='flex-start'
                        maxW={220}
                        marginBottom={15}
                        borderRadius={8}
                    >
                        <Text>
                            Đánh giá của tôi
                        </Text>
                    </Button>
                    <Button 
                        leftIcon={<Ionicons color='#F24545' name="log-out-outline" size={22} />}
                        width='60%'
                        background='transparent'
                        color='#000'
                        variant='outline'
                        display='flex'
                        flexDirection='row'
                        columnGap={30}
                        justifyContent='flex-start'
                        maxW={220}
                        marginBottom={15}
                        borderRadius={8}
                        onPress={() => navigation.navigate('SignoutConfirm')}
                    >
                        <Text color='red.500'>
                            Đăng xuất
                        </Text>
                    </Button>
                </Flex>
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