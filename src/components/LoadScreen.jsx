import React from 'react';
import LottieView from 'lottie-react-native';
import { View, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const LoadScreen = () => {
    const { width, height } = Dimensions.get('window');
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)',
            zIndex: 1,
        },
    });
    
    return (
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <LottieView  
                source={require('../assets/animations/loading.json')} 
                autoPlay 
                loop  
                style={{ width: width, height: height }}
            />
        </View>
    );
};

export default LoadScreen;
