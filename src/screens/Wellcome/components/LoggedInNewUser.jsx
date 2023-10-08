import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { GradientButton } from "../../../components/GradientButton";
import { getById } from "../../../services/User";


export const LoggedInNewUser = ({ navigation }) => {
    const [user, setUser] = React.useState(null);


    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const fadeAnim = React.useRef(new Animated.Value(500)).current;

    return (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            <View style={styles.container}>
                <View style={{ height: 0 }} />
                <View style={{ height: 50 }} />
                <Text style={{
                    color: 'black',
                    fontSize: 48,
                    fontWeight: '700',
                    // wordWrap: 'break-word',
                    textAlign: 'left'
                }}>Bạn...</Text>
                <View style={{ height: 5 }} />
                <Text style={{
                    color: '#545454',
                    fontSize: 24,
                    fontWeight: '400',
                    wordWrap: 'break-word',
                    textAlign: 'left'
                }}>Chơi hệ gì?</Text>
                <View style={{ height: 10 }} />
                <Text style={{
                    color: 'rgba(83, 94, 83, 0.50)',
                    fontSize: 16,
                    fontStyle: 'italic',
                    fontWeight: '400',
                    wordWrap: 'break-word',
                    textAlign: 'left'
                }}>Đừng lo, bạn vẫn có thể{"\n"}chuyển đổi giữa 2 chế độ sau</Text>
                <View style={{ height: 100 }} />
                <GradientButton
                    height={60}
                    text='Người cho thuê'
                    fontSize={25}
                    onPress={() => {
                        navigation.navigate('Home');
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                        });
                    }}
                    colors={['#2A4AB6', '#269DDB']}
                />
                <View style={{ height: 20 }} />
                <GradientButton
                    height={60}
                    text='Người thuê'
                    fontSize={25}
                    onPress={() => {
                        navigation.navigate('Home');
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                        });
                    }}
                    colors={['#FF5484', '#A76778']}
                />
                <View style={{ height: 20 }} />

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