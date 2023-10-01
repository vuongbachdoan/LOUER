import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Animated } from "react-native";
import Checkbox from 'expo-checkbox';
import LogoLouer from '../../../assets/images/logo.png';
import { GradientButton } from "../../../components/GradientButton";
import { TouchableOpacity } from "react-native";

export const Wellcome5 = ({ navigation }) => {
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const [isChecked, setChecked] = useState(false); //Checkbox terms & cond accepting
    const buttonStyle = isChecked ? {} : { opacity: 0.5 };


    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            <View style={styles.container}>
                <Image
                    style={{ 
                        position: 'absolute',
                        top: "15%",
                        width: 280, 
                        height: 280, 
                        resizeMode: 'contain' }}
                        source={LogoLouer}
                />

                <Text style={{
                    color: '#FFF',
                    fontSize: 40,
                    fontWeight: 600,
                    position: 'absolute',
                    top: "45%",
                }}
                >Louer</Text>
                <Text style={{
                    color: '#FFF',
                    fontSize: 15,
                    fontWeight: 300,
                    position: 'absolute',
                    top: "52%",
                }}
                >The app</Text>
                
                <Text style={{
                    color: '#FFF',
                    fontSize: 24,
                    fontWeight: 600,
                    position: 'absolute',
                    top: "60%",
                    left: 30,
                }}
                >Đăng ký / Đăng nhập</Text>
                <Text style={{
                    color: '#FFF',
                    fontSize: 15,
                    fontWeight: 100,
                    position: 'absolute',
                    top: "65%",
                    left: 30,
                }}
                >Sử dụng mail FPT Edu / Google của bạn</Text>

                <View
                    style={{
                        position: 'absolute',
                        bottom: "30%",
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: 12,
                        width: '100%'
                    }}
                >
                    <GradientButton 
                    text='Login with Google account'
                    onPress={() => navigation.navigate('Home')}
                    style={buttonStyle}
                    />
                </View>
                <View
                    style={{
                        position: 'absolute',
                        bottom: "15%",
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center', // Add this line
                        width: '100%'
                    }}>
                    <Checkbox
                        value={isChecked}
                        onValueChange={setChecked}
                        color={isChecked ? '#4630EB' : undefined}
                    />   
                    <Text 
                        style={[styles.text, {marginLeft: 8}]} 
                        color='#8FA2B7' 
                        fontSize={14} 
                        fontWeight={400}
                        >
                        By proceeding, you agree to these <TouchableOpacity><Text color='#5F97FF' underline fontSize={14} fontWeight={400}>Terms and Conditions.</Text></TouchableOpacity>
                    </Text>
                </View>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingBottom: 24,
        paddingLeft: 24,
        paddingRight: 24,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#080A0C',
    },
    text: {
        // textTransform: 'uppercase',
        color: '#8FA2B7',
        fontSize: 14,
        fontWeight: '400',
    }
})