import { auth } from '@/firebase/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
    signOut as firebaseSignOut,
    GoogleAuthProvider,
    signInWithCredential,
} from 'firebase/auth';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

GoogleSignin.configure({
    webClientId: '575625011224-d05bsds2gt5k7q2gglgv0c1d43prtkb5.apps.googleusercontent.com',
});

// Sign in with Google and Firebase, store token
async function onGoogleButtonPress() {
    try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const { idToken } = await GoogleSignin.signIn(); // Directly get the idToken

        if (!idToken) {
            Alert.alert('Login Error', 'Could not get ID token from Google.');
            return;
        }

        const googleCredential = GoogleAuthProvider.credential(idToken);
        const userCredential = await signInWithCredential(auth, googleCredential);

        console.log('✅ Successfully signed in with Firebase');
        return userCredential.user;

    } catch (err: any) {
        if (err.code === '10') { // This is the DEVELOPER_ERROR code
            Alert.alert('Login Error', 'Configuration Mismatch. Please re-check your SHA-1 fingerprint and package name in Firebase and rebuild the app.');
        } else {
            Alert.alert('Login Error', err.message);
        }
        console.error('❌ Google login error:', JSON.stringify(err, null, 2));
    }
}

// Sign out function clears Firebase and AsyncStorage
export async function signOut() {
    try {
        await firebaseSignOut(auth);
        await GoogleSignin.signOut();
        await AsyncStorage.removeItem('userToken');
        console.log('🔒 User signed out');
    } catch (err) {
        console.error('Sign out error:', err);
        Alert.alert('Logout Error', 'Failed to log out');
    }
}

// Check if token exists on app start (optional usage example)
export async function checkUserToken() {
    try {
        const token = await AsyncStorage.getItem('userToken');
        return token !== null;
    } catch (err) {
        console.error('Error checking token:', err);
        return false;
    }
}

export default function SignInScreen() {
    const [loading, setLoading] = useState(false);

    return (
        <SafeAreaView className="flex-1 bg-black">
            <View className="flex-1 justify-center items-center px-6">
                <TouchableOpacity
                    disabled={loading}
                    onPress={() =>
                        onGoogleButtonPress(setLoading).then((user) => {
                            if (user) {
                                console.log('🎉 Signed in successfully');
                            }
                        })
                    }
                    className="flex-row items-center bg-neutral-900 border border-neutral-700 rounded-xl px-5 py-3 shadow-lg active:opacity-80"
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" className="mr-3" />
                    ) : (
                        <Image
                            source={require('@/assets/google.png')}
                            className="w-6 h-6 mr-3"
                            resizeMode="contain"
                        />
                    )}
                    <Text className="text-white text-base font-semibold">
                        {loading ? 'Signing in...' : 'Sign in with Google'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
