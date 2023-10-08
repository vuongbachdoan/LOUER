import React from "react";
import { View, Text, StyleSheet, Image, Animated } from "react-native";
import GradientText from "react-native-gradient-texts";
import { Button } from 'native-base';
import DecorImg from '../../../assets/images/rocket.png';

export const Wellcome4 = ({ navigation }) => {
    const [timeoutId, setTimeoutId] = React.useState(null);
    React.useEffect(() => {
        const id = setTimeout(() => {
            navigation.navigate('Wellcome5')
        }, 3000)
        setTimeoutId(id);
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
            <Image
                width={295}
                height={295}
                source={DecorImg}
            />
            <Text style={{
                color: '#FFF',
                fontSize: 40,
                fontWeight: 600,
            }}
            >Convenient</Text>
            <GradientText
                text={"Banking"}
                fontSize={65}
                fontWeight={600}
                isGradientFill
                gradientColors={['#FF56A9', '#FFAA6C']}
            />
            <View
                style={{
                    position: 'absolute',
                    bottom: 24
                }}
            >
                <Button
                    borderRadius='48px'
                    height='48px'
                    width='100%'
                    backgroundColor='#202832'
                    onPress={() => {
                        clearTimeout(timeoutId);
                        navigation.navigate('Wellcome5');
                    }}
                >
                    <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 600 }}>Next</Text>
                </Button>
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
        textTransform: 'uppercase',
    }
})