import React from 'react';
import LottieView from 'lottie-react-native';
import { View, StyleSheet } from 'react-native';

const LoadScreen = () => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.3  )',
            zIndex: 1,
        },
    });
    
    return (
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <LottieView  
                source={require('../assets/animations/loading.json')} 
                autoPlay loop  
            />
        </View>
    );
};

export default LoadScreen;
