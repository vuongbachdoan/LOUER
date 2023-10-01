import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import GradientText from "react-native-gradient-texts";
import LogoLouer from '../../../assets/images/logo.png';

export const Wellcome1 = ({ navigation }) => {
    React.useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Wellcome2')
        }, 3000)
    }, []);

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
            <View style={styles.container}>
                <GradientText
                    text={"Louer"}
                    fontSize={95}
                    fontWeight={1000}
                    isGradientFill
                    gradientColors={['#FF5484', '#26A0DD']}


                />
                <Text style={{
                    color: '#FFF',
                    fontSize: 22,
                    fontWeight: 600
                }}
                >Nơi cho thuê tài sản</Text>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingBottom: 50,
        paddingLeft: 50,
        paddingRight: 50,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#080A0C'
    },
    text: {
        textTransform: 'uppercase',
    }
})