import Gauge from '@/components/StatusIndicator'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Result = () => {
    const router = useRouter()
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                {/* Title */}
                <View className="mb-6">
                    <Text className="text-3xl font-bold text-black text-center">RESULT</Text>
                    <Text className="text-lg text-gray-600 text-center mt-2">HEALTH SCORE</Text>
                </View>

                {/* Gauge Chart */}
                <View className="items-center mb-6">
                    <Gauge value={500} />
                </View>

                {/* Verdict Card */}
                <View className="bg-gray-100 p-4 rounded-xl mb-6">
                    <Text className="text-xl font-semibold text-gray-800 mb-4">Verdict</Text>

                    <View className="mb-4">
                        <Text className="text-lg font-bold text-gray-700">Safety Level</Text>
                        <Text className="text-md text-gray-800">Limit Use</Text>
                    </View>

                    <View className="mb-4">
                        <Text className="text-lg font-bold text-gray-700">Suggested Use</Text>
                        <Text className="text-md text-gray-800">
                            Occasional treat; not for daily use
                        </Text>
                    </View>

                    <View>
                        <Text className="text-lg font-bold text-gray-700 mb-1">Summary</Text>
                        <Text className="text-md text-gray-800">
                            This chocolate product is high in sugar and contains emulsifiers and candied fruit,
                            placing it in the unhealthy and heavily processed category. It includes some nutritious
                            elements (almonds, cocoa, berries), but the sugar content dominates the profile. Best
                            consumed in small amounts, as an occasional treat.
                        </Text>
                    </View>
                </View>

                {/* Buttons */}
                <View className="flex-row justify-between gap-4">
                    <TouchableOpacity onPress={() => router.push("/(screens)/scan")} className="flex-1 bg-black py-3 rounded-full items-center">
                        <Text className="text-white font-semibold">NEW SCAN</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push("/(screens)/Details")} className="flex-1 border border-black py-3 rounded-full items-center">
                        <Text className="text-black font-semibold">DETAILS</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <StatusBar style='dark' />
        </SafeAreaView>
    )
}

export default Result
