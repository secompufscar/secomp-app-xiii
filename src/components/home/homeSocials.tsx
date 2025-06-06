import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Linking, Pressable, View } from "react-native";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";

export default function HomeSocials() {

    return (
        <View className="flex-row justify-between items-center gap-3">
            <LinearGradient
                colors={["#29303F", "#2A3B5E"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="flex-1 p-5 rounded-[6px] overflow-hidden"
            >
                <Pressable
                    className="flex items-center justify-center"
                    onPress={() => Linking.openURL("https://www.instagram.com/secompufscar/")}
                >
                    <FontAwesome6 name="instagram" size={36} color="white" />
                </Pressable>
            </LinearGradient>

            <LinearGradient
                colors={["#29303F", "#2A3B5E"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="flex-1 p-5 rounded-[6px] overflow-hidden"
            >
                <Pressable
                    className="flex items-center justify-center"
                    onPress={() => Linking.openURL("https://www.facebook.com/secompufscar")}
                >
                    <FontAwesome6 name="square-facebook" size={36} color="white" />
                </Pressable>
            </LinearGradient>

            <LinearGradient
                colors={["#29303F", "#2A3B5E"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="flex-1 p-5 rounded-[6px] overflow-hidden"
            >
                <Pressable
                    className="flex items-center justify-center"
                    onPress={() => Linking.openURL("https://www.linkedin.com/company/secomp-ufscar/posts")}
                >
                    <FontAwesome6 name="linkedin" size={36} color="white" />
                </Pressable>
            </LinearGradient>

            <LinearGradient
                colors={["#29303F", "#2A3B5E"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="flex-1 p-5 rounded-[6px] overflow-hidden"
            >
                <Pressable
                    className="flex items-center justify-center"
                    onPress={() => Linking.openURL("https://www.secompufscar.com.br/")}
                >
                    <MaterialCommunityIcons name="web" size={36} color="white" />
                </Pressable>
            </LinearGradient>
        </View>
    );
}