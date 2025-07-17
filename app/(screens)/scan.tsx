import { Ionicons } from '@expo/vector-icons'
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
import { useRef, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function App() {
    const [facing, setFacing] = useState<CameraType>('back')
    const [permission, requestPermission] = useCameraPermissions()
    const [photoUri, setPhotoUri] = useState<string | null>(null)

    const cameraRef = useRef<any>(null)

    // Upload from gallery
    const handlePickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        })
        if (!result.canceled) {
            setPhotoUri(result.assets[0].uri)
        }
    }

    // Take photo
    const handleTakePhoto = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync()
            setPhotoUri(photo.uri)
        }
    }

    // Reset image
    const resetPhoto = () => {
        setPhotoUri(null)
    }

    if (!permission) return <View />
    if (!permission.granted) {
        return (
            <View className="flex-1 justify-center items-center bg-black">
                <Text className="text-white text-lg mb-4">
                    We need your permission to show the camera
                </Text>
                <TouchableOpacity
                    onPress={requestPermission}
                    className="bg-blue-600 px-4 py-2 rounded"
                >
                    <Text className="text-white font-semibold">Grant Permission</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView className='h-full'>
            <View className="flex-1 relative px-4 pt-10 items-center justify-center">
                {/* Import from Gallery */}
                <TouchableOpacity onPress={handlePickImage} className="mb-4 absolute top-5 left-5">
                    <View className="flex-row items-center gap-2">
                        <Ionicons name="image" size={24} color="white" />
                        <Text className="text-white">Import</Text>
                    </View>
                </TouchableOpacity>
                {/* top title */}
                <View className='pb-5'>
                    {
                        !photoUri ? <Text className='text-2xl text-white'>Take A Picture</Text> : <View className='flex-col items-center justify-center'><Text className='text-2xl text-white'>Captured Image</Text>
                            <View className='border-2 border-green-500 rounded-full p-1 mt-5'>
                                <Image source={require("@/assets/appImages/check-mark.png")} />
                            </View>
                        </View>
                    }
                </View>
                {/* Photo Preview */}
                {photoUri ? (
                    <View className="w-full aspect-[3/4] rounded-xl overflow-hidden border border-gray-700 mx-auto mb-4">
                        <Image source={{ uri: photoUri }} className="w-full h-full" resizeMode="cover" />
                    </View>
                ) : (
                    <View className="w-full aspect-[3/4] rounded-xl overflow-hidden border border-gray-700 mx-auto mb-4">
                        <CameraView
                            className="flex-1"
                            facing={facing}
                            ref={cameraRef}
                        />
                    </View>
                )}

                {/* Action Buttons */}
                <View className="flex-row justify-around items-center mt-6">
                    {photoUri ? (
                        <View className='flex-col'>
                            <TouchableOpacity
                                onPress={resetPhoto}
                                className="bg-gray-700 px-4 py-2 rounded w-full mb-2"
                            >
                                <Text className="text-white">Retake</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => console.log('Submit logic')}
                                className="bg-blue-600 px-4 py-2 rounded w-full"
                            >
                                <Text className="text-white">Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity
                            onPress={handleTakePhoto}
                            className="bg-white w-20 h-20 rounded-full border-gray-400 border-2"
                        />
                    )}
                </View>
            </View>
        </SafeAreaView>
    )
}
