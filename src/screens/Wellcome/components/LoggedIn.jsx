import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { GradientButton } from "../../../components/GradientButton";
import { getById } from "../../../services/User";
import GradientText from "react-native-gradient-texts";


export const LoggedIn = ({ navigation }) => {
    const [user, setUser] = React.useState(null);
    const userName = {
        firstname: 'Người',
        surname: 'Đẹp',
        lastname: 'Trai'
    };


    const fadeAnim = React.useRef(new Animated.Value(500)).current;

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);


    // React.useEffect(() => {
    //     getById(1).then((user) => setUser(user));
    //     console.log(user);
    // })

    return (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            <View style={styles.container}>
                <View style={{ height: 0 }} />
                <Text style={{
                    color: 'black',
                    fontSize: 40,
                    fontWeight: '700',
                    // wordWrap: 'break-word',
                    textAlign: 'left'
                }}>Chào mừng</Text>
                <Text style={{
                    color: 'black',
                    fontSize: 40,
                    fontWeight: '700',
                    // wordWrap: 'break-word',
                    textAlign: 'left'
                }}>trở lại,</Text>
                <View style={{ height: 50 }} />
                {/* Show name */}
                <View style={{ flexDirection: 'column', textAlign: 'left' }}>
                    {Object.keys(userName).map((key) => (
                        <GradientText 
                            key={key} 
                            text={userName[key]} 
                            fontSize={90} 
                            fontWeight={900}  
                            isGradientFill 
                            gradientColors={['#FF5484', '#26A0DD']} 
                            style={{ textAlign: 'left' }} 
                        />
                    ))}
                </View>
                <View style={{ height: 50 }} />
                <GradientButton
                        text='Tiếp tục'
                        onPress={() => {
                            // navigation.navigate('LoggedInNewUser');
                            navigation.navigate('Home');
                        }}
                        colors={['#2A4AB6', '#269DDB']}
                    />

            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 100,
        paddingBottom: 50,
        paddingLeft: 10,
        paddingRight: 10,
        width: '100%',
        height: '100%',
        display: 'flex',
        // alignItems: 'flex-start',
    },
    text: {
        textTransform: 'uppercase',
        textAlign: 'left'
    }
})