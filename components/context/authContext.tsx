import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { createContext, useContext, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
            offlineAccess: true,
        });

        const unsubscribe = onAuthStateChanged(auth, async (usr) => {
            if (usr) {
                setUser(usr);
                await AsyncStorage.setItem('userToken', await usr.getIdToken());
            } else {
                setUser(null);
                await AsyncStorage.removeItem('userToken');
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
