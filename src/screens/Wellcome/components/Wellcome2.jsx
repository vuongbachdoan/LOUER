import React, { useState } from "react";
import { Image, Animated } from "react-native";
import LogoLouer from '../../../assets/images/logo.png';
import { GradientButton } from "../../../components/GradientButton";
import { Checkbox, Flex, Link, Stack, Text } from "native-base";
import GradientText from "react-native-gradient-texts";





import SignInWithOAuth from "../../../components/SignInWithOAuth";

export const Wellcome2 = ({ navigation }) => {
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const [isChecked, setChecked] = useState(false);
    

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);



    const handlePolicyAllow = () => {
        setChecked(!isChecked);
    }

    return (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            <Flex
                display='flex'
                justifyContent='center'
                alignItems='center'
                flexDirection='column'
                height='100%'
                width='100%'
            >
                <Stack
                    alignItems='center'
                    marginLeft={15}
                    marginRight={15}
                >
                    <Image
                        style={{
                            width: 280,
                            height: 280,
                            resizeMode: 'contain',
                        }}
                        source={LogoLouer}
                    />

                    <GradientText
                        text={"Louer"}
                        fontSize={95}
                        fontWeight={1000}
                        isGradientFill
                        gradientColors={['#FF5484', '#26A0DD']}
                    />

                    <Text fontSize={22} fontWeight='bold' marginBottom={7.5}>Đăng ký / Đăng nhập</Text>
                    <Text fontSize={16} fontWeight='semibold' color='coolGray.500' marginBottom={15}>Sử dụng mail FPT Edu / Google của bạn</Text>
                    <GradientButton
                        text='Login with Google account'
                        onPress={() => navigation.navigate('LoggedIn')}
                        // onPress={SignInWithOAuth()}
                        colors={isChecked ? ['#2A4AB6', '#269DDB'] : ['gray', 'gray']}
                        disabled={!isChecked}
                    />                    
                    <Checkbox marginTop={15} isChecked={isChecked} onChange={handlePolicyAllow} colorScheme="green" display='flex' flexDirection='row'>
                        <Text>By click, you aggree with our</Text><Link href='/policy'>Tern and Conditional</Link>
                    </Checkbox>
                </Stack>
            </Flex>
        </Animated.View>
    );
};