import { useRouter } from 'expo-router'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
    const router = useRouter()
    const data = ["No Ads",
        "Free (beta-version)",
        "Transparent, honest, simple",
        "GDPR/AVG Compliant",
        "100% independed!"]
    return (
        <SafeAreaView>
            <View className='items-center justify-between h-full pt-10 pb-32'>
                <View className='items-center'>
                    <Image className='' source={require("@/assets/appImages/check-mark.png")} />
                    <Image className='mt-5' source={require("@/assets/appImages/LABELCHECKER.png")} />
                    <View>
                        <Text className='text-white mt-10 text-5xl text-center font-semibold px-10'>Scan the truth
                            not the marketing</Text>
                    </View>

                </View>
                <View>
                    <View className='items-center justify-center mb-32'>{data.map((text, id) => <Text className='text-white text-2xl' key={id}>{text}</Text>)}</View>
                    <TouchableOpacity onPress={() => router.push("/(screens)/scan")} className='bg-[#035683] max-w-fit rounded-md'>
                        <View className='flex-row items-center justify-center gap-3 w-fit rounded-md'>
                            <Text className='text-white py-2 text-xl'>Scan</Text>
                            <Image source={require("@/assets/appImages/ph_scan.png")} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default index