import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Button, Icon, FormControl, Input, WarningOutlineIcon, Pressable } from 'native-base';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import Logo from '../assets/icons/icons';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingTop: 60,
        paddingBottom: 25,
        paddingLeft: 25,
        paddingRight: 25,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 500,
        color: '#2F1155',
        textAlign: 'center',
        lineHeight: '30px'
    },
    input: {
        height: 54,
        padding: 10,
    },
    button: {
        minWidth: '75%',
        backgroundColor: '#5B259F',
        height: 63,
        padding: ' 20px 60px 20px 60px',
        borderRadius: 15,
        fontWeight: 700,
        letterSpacing: '0em',
    },
    socialButton: {
        flex: 1,
        height: 63,
        padding: ' 20px 60px 20px 60px',
        borderRadius: 15,
        fontWeight: 700,
        letterSpacing: '0em',
        borderColor: '#ccc',
        borderWidth: '0.5px',
        backgroundColor: 'transparent',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 700,
        color: 'white'
    }
})

export const Login = ({ navigation }) => {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isLogin, setIsLogin] = React.useState(false);
    const [show, setShow] = React.useState(false);

    handleLogin = () => {
        setIsLogin(true);
        setTimeout(() => {
            setIsLogin(false);
            navigation.navigate('Home');
        }, 3000)
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -150} // Adjust the offset as needed
        >
            <ScrollView
                // contentContainerStyle={{
                //     flex: 1
                // }}
                keyboardShouldPersistTaps="handled" // Allows tapping outside of input to dismiss keyboard
            >
                <View style={styles.container}>

                    <Text style={styles.title}>🥷 Welcome back to <Text style={{fontWeight: 'bold'}}>Suriken</Text></Text>
                    <Logo width={75} height={75} />
                    <View style={{ width: '100%' }}>
                        {/* Social Buttons */}
                        <Text style={{textAlign: 'center', marginBottom: 24}}>Sign-in with</Text>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: 'space-between',
                            gap: 24,
                            marginBottom: 24
                        }}>
                            <Button style={styles.socialButton} endIcon={<Icon style={{ color: '#000' }} as={Ionicons} name="logo-google" size="md" />}>
                                <Text fontSize='md'>Facebook</Text>
                            </Button>
                            <Button style={styles.socialButton} endIcon={<Icon style={{ color: '#000' }} as={Ionicons} name="logo-facebook" size="md" />}>
                                <Text fontSize='md'>Google</Text>
                            </Button>
                        </View>
                        <Text style={{textAlign: 'center', marginBottom: 24}}>or using</Text>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'column',
                            rowGap: '12px',
                            marginBottom: 24,
                        }}>
                            <Input
                                w={{
                                    base: "100%",
                                    md: "25%"
                                }}
                                h={{
                                    base: '54px',
                                }}
                                borderRadius={15}
                                InputLeftElement={
                                    <Icon as={<MaterialIcons name="person" />}
                                        size={5}
                                        ml="2"
                                        color="muted.400"
                                    />
                                }
                                placeholder="Name"
                            />
                            <Input
                                w={{
                                    base: "100%",
                                    md: "25%"
                                }}
                                h={{
                                    base: '54px'
                                }}
                                borderRadius={15}
                                type={show ? "text" : "password"} InputLeftElement={
                                    <Icon as={<MaterialIcons name="lock" />}
                                        size={5}
                                        ml="2"
                                        color="muted.400"
                                    />
                                }
                                InputRightElement={
                                    <Pressable onPress={() => setShow(!show)}>
                                        <Icon
                                            as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
                                            size={5}
                                            mr="2"
                                            color="muted.400"
                                        />
                                    </Pressable>}
                                placeholder="Password"
                            />
                        </View>
                    </View>
                    <View>
                        <Button style={styles.button} isLoading={isLogin} onPress={handleLogin} spinnerPlacement="end" isLoadingText="Submitting">
                            <Text style={styles.buttonText}>Login</Text>
                        </Button>

                        <TouchableOpacity style={{ marginTop: 24 }} onPress={() => navigation.navigate('Register')}>
                            <Text style={{textAlign: 'center', color: '#2F2F2F'}}>Don't have an account? Register here</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
