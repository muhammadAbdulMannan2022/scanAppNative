import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Easing,
    Image,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Loading = () => {
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, [spinValue]);

    const rotate = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <SafeAreaView className='h-full py-10'>
            <View className="flex-1 justify-center items-center">
                <View className="flex-1 items-center justify-start">
                    <Image className="mb-5 w-16" source={require('@/assets/appImages/check-mark.png')} />
                    <Image source={require('@/assets/appImages/LABELCHECKER.png')} />
                </View>
                <View className="flex-1 items-center justify-start">
                    <Text className="text-white text-center mb-4 ">Checking Ingredients</Text>
                    <Animated.Image
                        source={require('@/assets/appImages/speener.png')}
                        style={{ width: 40, height: 40, transform: [{ rotate }] }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Loading;
