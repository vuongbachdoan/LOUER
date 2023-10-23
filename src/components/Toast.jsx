import Toast from 'react-native-toast-message';
import { ToastAndroid } from 'react-native';
export  function show(message){
    ToastAndroid.show(message, ToastAndroid.SHORT);


    //From 'react-native-toast-message'
    // switch (type) {
    //     case 'success':
    //         Toast.show({
    //             type: 'success',
    //             text1: text,
    //             visibilityTime: 1000,
    //             position: 'bottom',
    //         });
    //         break;
    //     case 'error':
    //         Toast.show({
    //             type: 'error',
    //             text1: text,
    //             visibilityTime: 2000,
    //             position: 'bottom',
    //         });
    //         break;
    //     case 'info':
    //         Toast.show({
    //             type: 'info',
    //             text1: text,
    //             visibilityTime: 2000,
    //             position: 'bottom',
    //         });
    //         break;
    // }
}