
import { useAuth } from '@/components/context/authContext';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Redirect } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function index() {
    const { user, loading } = useAuth();
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '575625011224-d05bsds2gt5k7q2gglgv0c1d43prtkb5.apps.googleusercontent.com',
            offlineAccess: true,
            forceCodeForRefreshToken: true,
        });
    }, []);
    if (loading) return null;
    return <View className='border'>
        <Redirect href={user ? '/(screens)' : '/(auth)/login'} />
    </View>;
}
