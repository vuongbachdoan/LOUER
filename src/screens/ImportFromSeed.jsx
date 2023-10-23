import React from 'react';
import { ScrollView, StyleSheet, Switch, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native';
import { Input, Icon, Button, FormControl, WarningOutlineIcon, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { GradientButton } from '../components/GradientButton';

export const ImportFromSeed = ({ navigation }) => {
    const [showPhrase, setShowPhrase] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [passwordInvalid, setPasswordInvalid] = React.useState(false);
    const [passwordConfirmInvalid, setPasswordConfirmInvalid] = React.useState(false);
    const [isEnabled, setIsEnabled] = React.useState(false);
    const [canImport, setCanImport] = React.useState(true);
    
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const handleImport = () => {
        navigation.navigate('Home')
    }

    return (
        <KeyboardAvoidingView
            style={{
                flex: 1,
                backgroundColor: '#080A0C'
            }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -150} // Adjust the offset as needed
        >
            <ScrollView
                contentContainerStyle={{
                    flex: 1
                }}
                keyboardShouldPersistTaps='handled'
            >
                <View
                    style={styles.container}
                >
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        columnGap: 12,
                        width: '100%',
                        marginBottom: 24,
                    }}>
                        <Input
                            placeholder="Seed Phrase"
                            flex={1}
                            height='64px'
                            fontSize={14}
                            fontWeight='semibold'
                            type={showPassword ? 'text' : 'password'}
                            borderColor='#181E25'
                            color='#FFF'
                            borderWidth={1}
                            borderRadius={15}
                            InputRightElement={
                                <Icon
                                    as={<MaterialIcons name={showPhrase ? "visibility" : "visibility-off"} />}
                                    size="xl"
                                    mr={2}
                                    onPress={() => setShowPhrase(!showPhrase)}
                                />
                            }
                        />
                        <Button
                            size="sm"
                            width='64px'
                            height='64px'
                            borderColor='#181E25'
                            borderWidth={1}
                            borderRadius={15}
                            backgroundColor='#202832'
                            rightIcon={<Icon as={<MaterialIcons name="flip" />} size="xl" />}
                        >
                        </Button>
                    </View>

                    <FormControl marginBottom='24px' isInvalid={passwordInvalid} w="100%">
                        <Input borderColor='#181E25' fontWeight='semibold' fontSize={14} borderRadius={15} height='64px' placeholder="New Password"
                            InputRightElement={
                                <Icon
                                    as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />}
                                    size="xl"
                                    mr={2}
                                    onPress={() => setShowPassword(!showPassword)}
                                />
                            }
                        />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            Must be at least 8 characters.
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <FormControl marginBottom='24px' isInvalid={passwordConfirmInvalid} w="100%">
                        <Input borderColor='#181E25' fontWeight='semibold' fontSize={14} borderRadius={15} height='64px' placeholder="Confirm Password"
                            InputRightElement={
                                <Icon
                                    as={<MaterialIcons name={showConfirmPassword ? "visibility" : "visibility-off"} />}
                                    size="xl"
                                    mr={2}
                                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                />
                            }
                        />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            Confirm password does not match.
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        columnGap: 12,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%'
                    }}>
                        <Text fontSize={16} color='#FFF' fontWeight='semibold' marginY='24px'>Sign in with Face ID?</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#3D8DFF' }}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>

                    <Text color='#8FA2B7' fontSize={14} fontWeight={400}>
                        By proceeding, you agree to these <TouchableOpacity><Text color='#5F97FF' underline fontSize={14} fontWeight={400}>Term and Conditions.</Text></TouchableOpacity>
                    </Text>

                    <View
                        style={{
                            position: 'absolute',
                            bottom: 24,
                            display: 'flex',
                            flexDirection: 'column',
                            rowGap: 12,
                            width: '100%'
                        }}
                    >
                        <GradientButton onPress={handleImport} text='Import' colors={canImport ? ['#8AD4EC', '#EF96FF', '#FF56A9', '#FFAA6C'] : ['#101419', '#101419']} color={canImport ? '#FFF' : '#384657'} />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#080A0C'
    },
    text: {
        textTransform: 'uppercase',
    }
});
