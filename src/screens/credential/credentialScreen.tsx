import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../hooks/AuthContext';
import AppLayout from '../../components/appLayout';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { colors } from '../../styles/colors';

export default function Credential() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { user }: any = useAuth();

    return (
        <SafeAreaView className="flex-1 bg-blue-900 items-center">
            <AppLayout>
                {/* Header */}
                <View className="w-full justify-center items-center mt-16 mb-10">
                    <Text className="text-white text-xl font-poppinsSemiBold text-center">
                        Credencial
                    </Text>

                    <View className="absolute left-0">
                        <Pressable
                            className="w-[32px] h-[32px] rounded-[4px] bg-[#29303F] active:bg-[#29303F]/80"
                            onPress={() => navigation.goBack()}
                        >
                            <View className={`flex items-center justify-center p-2 `}>
                                <FontAwesomeIcon icon={faChevronLeft} size={16} color={colors.blue[200]} />
                            </View>
                        </Pressable>
                    </View>
                </View>

                {/* Subtitle */}
                <Text className="w-full text-center text-gray-400 text-base mt-2 mb-6">
                    Use sua credencial para registrar presença nas atividades
                </Text>

                {/* Card Background */}
                <View className="relative self-center max-w-[440px] w-full h-fit bg-iconbg py-8 px-2 rounded-2xl">
                    {/* User Info */}
                    <View className="flex-row items-center ml-6 mb-[28px]">
                        <Image
                            source={require("../../../assets/qr-code/qrcode-perfil.png")}
                            resizeMode="stretch"
                            style={{ width: 48, height: 48, borderRadius: 24, marginRight: 16 }}
                        />
                        <View>
                            <Text className="text-white text-lg font-poppinsMedium">
                                {user.nome}
                            </Text>
                            <Text className="text-blue-200 text-base">{user.email}</Text>
                        </View>
                    </View>

                    <View className="absolute w-[36px] h-[36px] rounded-full bg-blue-900 left-[-20] top-[90px]"/>
                    <View className="absolute w-[36px] h-[36px] rounded-full bg-blue-900 right-[-20] top-[90px]"/>

                    {/* Separator */}
                    <View className="flex-row justify-between items-center px-6 mb-12">
                        {Array.from({ length: 20 }).map((_, index) => (
                            <View
                                key={index}
                                className="w-1 h-1 rounded-full bg-border opacity-50"
                            />
                        ))}
                    </View>

                    {/* QR Code */}
                    <View>
                        <Image
                            source={{
                                uri: user?.qrCode
                            }}
                            resizeMode="contain"
                            className="h-80 mx-6 mb-4"
                        />
                    </View>
                </View>
            </AppLayout>
        </SafeAreaView>
    );
}
