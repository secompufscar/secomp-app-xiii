import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Linking, Pressable, View } from "react-native";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";

const openLink = async (url: string) => {
    try {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            console.warn(`Não é possível abrir este link: ${url}`);
        }
    } catch (error) {
        console.error("Ocorreu um erro ao abrir o link:", error);
    }
};

const socialLinks = [
    { key: "instagram", url: "https://www.instagram.com/secompufscar/", icon: <FontAwesome6 name="instagram" size={36} color="white" /> },
    { key: "facebook", url: "https://www.facebook.com/secompufscar", icon: <FontAwesome6 name="square-facebook" size={36} color="white" /> },
    { key: "linkedin", url: "https://www.linkedin.com/company/secomp-ufscar/posts", icon: <FontAwesome6 name="linkedin" size={36} color="white" /> },
    { key: "website", url: "https://www.secompufscar.com.br/", icon: <MaterialCommunityIcons name="web" size={36} color="white" /> },
];

export default function HomeSocials() {
    return (
        <View className="flex-row justify-between items-center gap-3">
            {socialLinks.map(({ key, url, icon }) => (
                <LinearGradient
                    colors={["#29303F", "#2A3B5E"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="flex-1 p-5 items-center justify-center rounded-[6px] overflow-hidden active:opacity-80"
                >
                    <Pressable
                        key={key}
                        onPress={() => openLink(url)}
                    >
                        {icon}
                    </Pressable>
                </LinearGradient>
            ))}
        </View>
    );
}