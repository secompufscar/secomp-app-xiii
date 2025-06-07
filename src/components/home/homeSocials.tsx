import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Linking, Pressable, View } from "react-native";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";

export default function HomeSocials() {
    return (
        <View className="flex-row justify-between items-center gap-3">
            <Pressable
                className="flex-1"
                onPress={() => Linking.openURL("https://www.instagram.com/secompufscar/")}
            >
                <LinearGradient
                    colors={["#29303F", "#2A3B5E"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className={`p-5 items-center justify-center rounded-[6px] overflow-hidden active:opacity-80`}
                >
                    <FontAwesome6 name="instagram" size={36} color="white" />
                </LinearGradient>
            </Pressable>

            <Pressable
                className="flex-1"
                onPress={() => Linking.openURL("https://www.facebook.com/secompufscar")}
            >
                <LinearGradient
                    colors={["#29303F", "#2A3B5E"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className={`p-5 items-center justify-center rounded-[6px] overflow-hidden active:opacity-80`}
                >
                    <FontAwesome6 name="square-facebook" size={36} color="white" />
                </LinearGradient>
            </Pressable>

            <Pressable
                className="flex-1"
                onPress={() => Linking.openURL("https://www.linkedin.com/company/secomp-ufscar/posts")}
            >
                <LinearGradient
                    colors={["#29303F", "#2A3B5E"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className={`p-5 items-center justify-center rounded-[6px] overflow-hidden active:opacity-80`}
                >
                    <FontAwesome6 name="linkedin" size={36} color="white" />
                </LinearGradient>
            </Pressable>
            
            <Pressable
                className="flex-1"
                onPress={() => Linking.openURL("https://www.secompufscar.com.br/")}
            >
                <LinearGradient
                    colors={["#29303F", "#2A3B5E"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className={`p-5 items-center justify-center rounded-[6px] overflow-hidden active:opacity-80`}
                >
                    <MaterialCommunityIcons name="web" size={36} color="white" />
                </LinearGradient>
            </Pressable>
        </View>
    );
}