import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Linking, Pressable, View } from "react-native";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";

export default function HomeSocials() {
    const [isInstagramPressed, setIsInstagramPressed] = useState(false);
    const [isFacebookPressed, setIsFacebookPressed] = useState(false);
    const [isLinkedinPressed, setIsLinkedinPressed] = useState(false);
    const [isWebsitePressed, setIsWebsitePressed] = useState(false);

    return (
        <View className="flex-row justify-between items-center gap-3">
            <Pressable
                className="flex-1"
                onPress={() => Linking.openURL("https://www.instagram.com/secompufscar/")}
                onPressIn={() => setIsInstagramPressed(true)}
                onPressOut={() => setIsInstagramPressed(false)}
            >
                <LinearGradient
                    colors={["#29303F", "#2A3B5E"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className={`p-5 items-center justify-center rounded-[6px] overflow-hidden ${isInstagramPressed ? "opacity-80" : "opacity-100"}`}
                >
                    <FontAwesome6 name="instagram" size={36} color="white" />
                </LinearGradient>
            </Pressable>

            <Pressable
                className="flex-1"
                onPress={() => Linking.openURL("https://www.facebook.com/secompufscar")}
                onPressIn={() => setIsFacebookPressed(true)}
                onPressOut={() => setIsFacebookPressed(false)}
            >
                <LinearGradient
                    colors={["#29303F", "#2A3B5E"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className={`p-5 items-center justify-center rounded-[6px] overflow-hidden ${isFacebookPressed ? "opacity-80" : "opacity-100"}`}
                >
                    <FontAwesome6 name="square-facebook" size={36} color="white" />
                </LinearGradient>
            </Pressable>

            <Pressable
                className="flex-1"
                onPress={() => Linking.openURL("https://www.linkedin.com/company/secomp-ufscar/posts")}
                onPressIn={() => setIsLinkedinPressed(true)}
                onPressOut={() => setIsLinkedinPressed(false)}
            >
                <LinearGradient
                    colors={["#29303F", "#2A3B5E"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className={`p-5 items-center justify-center rounded-[6px] overflow-hidden ${isLinkedinPressed ? "opacity-80" : "opacity-100"}`}
                >
                    <FontAwesome6 name="linkedin" size={36} color="white" />
                </LinearGradient>
            </Pressable>
            
            <Pressable
                className="flex-1"
                onPress={() => Linking.openURL("https://www.secompufscar.com.br/")}
                onPressIn={() => setIsWebsitePressed(true)}
                onPressOut={() => setIsWebsitePressed(false)}
            >
                <LinearGradient
                    colors={["#29303F", "#2A3B5E"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className={`p-5 items-center justify-center rounded-[6px] overflow-hidden ${isWebsitePressed ? "opacity-80" : "opacity-100"}`}
                >
                    <MaterialCommunityIcons name="web" size={36} color="white" />
                </LinearGradient>
            </Pressable>
        </View>
    );
}