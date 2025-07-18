import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DetailsScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView className='h-full bg-white'>
            <View className="flex-1 p-4">
                <Text className="text-3xl font-bold mb-4 text-center">DETAILS</Text>

                <View className="mb-6">
                    <Text className="text-2xl font-bold mb-2">The Good</Text>
                    <View className="ml-4">
                        <Text className="text-gray-700 text-lg">✓ No preservatives</Text>
                        <Text className="text-gray-700 text-lg">✓ No artificial flavorings or colorants</Text>
                        <Text className="text-gray-700 text-lg">✓ No palm oil or processed fats</Text>
                        <Text className="text-gray-700 text-lg">✓ Fairtrade certified cocoa</Text>
                    </View>
                </View>

                <View className="mb-6">
                    <Text className="text-2xl font-bold mb-2">The Bad</Text>
                    <View className='ml-4'>
                        <View className='flex-row items-center justify-start gap-2'>
                            <Text className='text-red-700 text-lg'>✗</Text>
                            <Text className="text-gray-700 text-lg"> Too much sugar</Text>
                        </View>
                    </View>
                </View>

                <View className="mb-6">
                    <Text className="text-2xl font-bold mb-2">Allergens</Text>
                    <View className="ml-4">
                        <Text className='text-gray-700 text-lg'>- Contains soy</Text>
                        <Text className='text-gray-700 text-lg'>- May contain milk, tree nuts</Text>
                    </View>
                </View>

                <View className="mb-6">
                    <Text className="text-2xl font-bold mb-2">Ingredients</Text>
                    <View className="ml-4 gap-2">
                        {
                            ["Natriumdiacetat (E262)", "Ingredient X", "Ingredient Y"].map((data, i) => <View key={i} className='flex-row items-center justify-between border-2 border-gray-100 p-3 py-2 rounded-md'>
                                <Text className='text-gray-700 text-lg'>{data}</Text>
                                <View className='bg-slate-200 text-[#035683] p-1 rounded-full'>
                                    <Ionicons color="#035683" name='arrow-forward' size={24} />
                                </View>
                            </View>)
                        }


                    </View>
                </View>

                <TouchableOpacity
                    className="bg-[#035683] p-3 py-5 rounded"
                    onPress={() => navigation.goBack()}
                >
                    <Text className="text-white text-center text-xl font-bold">BACK</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style='dark' />
        </SafeAreaView>
    );
};

export default DetailsScreen;