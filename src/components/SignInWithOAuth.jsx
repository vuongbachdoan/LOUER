import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Button } from 'native-base';
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = () => {
    React.userEffect(() => {
        void WebBrowser.warmUpAsync();
        return(() => {
            WebBrowser.coolDownAsync();
        })
    }, [])

    const { startOAuthFlow } = useOAuth({strategy: 'oauth_google'});

    const onPress = React.useCallback(async() => {
        try {
            const {createdSessionId, setActive,signUp} = await startOAuthFlow();
            if (createdSessionId) {
                setActive({sessionId: createdSessionId});
                signUp();
            }
            else{
                console.log('Failed to signIn or SignUp with OAuth, check requirements.');
            }
        } catch (error) {
            console.log(error);
        }
    },[]);
    
    return (
        <Button
            title=' Sign In With Google' 
            onPress={onPress}>  
        </Button>
    );
}