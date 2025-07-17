import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ImageBackground, View } from "react-native";

export default function Layout() {
    return (
        <ImageBackground
            source={require("@/assets/appImages/bg.jpg")}
            resizeMode="cover"
            className="flex-1"
        >
            {/* Overlay */}
            <View className="absolute inset-0 bg-black/85" />

            {/* Screen Content */}
            <View className="flex-1 relative">
                <Slot />
            </View>
            <StatusBar style="light" />
        </ImageBackground>
    );
}
