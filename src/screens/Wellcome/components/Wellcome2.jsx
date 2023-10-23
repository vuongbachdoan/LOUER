import React, { useState } from "react";
import { Image, Animated } from "react-native";
import LogoLouer from '../../../assets/images/logo.png';
import { Checkbox, Flex, Link, Stack, Text } from "native-base";
import GradientText from "react-native-gradient-texts";
import { Clerk, ClerkProvider, SignedOut, SignedIn} from "@clerk/clerk-expo";
import SignInWithOAuth from "../../../components/SignInWithOAuth";

import { store } from "../../../state/store";
import { enviroment} from "../../../state/enviroment";

import * as UserService from "../../../services/User";

export const Wellcome2 = ({ navigation }) => {
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const [isChecked, setChecked] = useState(false);


    const user = store.useState((state) => state.user);
    const clerkPublicKey = enviroment.useState((state) => state.clerkPublicKey);
    // user = 


    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);


    const handleUserFromServer = async () => {
        Clerk.
        UserService.getById(userId).then((data) => {
            store.update((state) => {
                state.user = data;
                state.user.userId = userId;
            })
        });
        UserService.getAvaLinkById(userId).then((ava) => {
            store.update((state) => {
                state.user.avaLink = ava;
            });
        });
    }

    const handleUserFromClerk = () => {
        // const res =  useUser().user;
        // console.log(res);
        {/* {navigation.navigate('Home')} */}
    }
    




    return (
        <ClerkProvider publishableKey={clerkPublicKey}>
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
                        <SignedIn>
                            {handleUserFromClerk()}
                            

                        </SignedIn>
                        <SignedOut>
                            <SignInWithOAuth/>
                        </SignedOut>
                        
                    </Stack>
                </Flex>
            </Animated.View>
        </ClerkProvider>

    );
};