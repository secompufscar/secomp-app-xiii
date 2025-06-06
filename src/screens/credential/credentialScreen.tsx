import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, Modal, TouchableWithoutFeedback, ImageBackground, ScrollView } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../hooks/AuthContext';
import AppLayout from '../../components/appLayout';
import BackButton from '../../components/button/backButton';

export default function Credential() {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { user }: any = useAuth();

    return (
        <SafeAreaView className="flex-1 bg-blue-900 flex-1 items-center">
            <AppLayout>
                {/* Header */}
                <View className="flex-row items-center mt-2 px-6">
                    <BackButton />
                    <Text className="flex-1 text-white text-lg font-poppinsSemiBold text-center mt-6">
                        Credencial
                    </Text>
                    <View className="w-6" />
                </View>

                {/* Subtitle */}
                <Text className="text-gray-300 text-xs text-left mt-2 mb-10 px-6">
                    Use sua credencial para registrar sua presença nas atividades
                </Text>

                {/* Card Background */}
                <ImageBackground
                    source={require("../../../assets/qr-code/qrcode-bg.png")}
                    resizeMode="stretch"
                    className="w-full mb-36 rounded-3xl overflow-hidden"
                    style={{ paddingTop: 15, paddingBottom: 44, width: '100%', aspectRatio: 312 / 402 }}
                >
                    {/* User Info */}
                    <View className="flex-row items-center ml-6 mb-5">
                        <Image
                            source={require("../../../assets/qr-code/qrcode-perfil.png")}
                            resizeMode="stretch"
                            style={{ width: 48, height: 48, borderRadius: 24, marginRight: 16 }}
                        />
                        <View>
                            <Text className="text-white text-sm font-poppinsSemiBold mb-1">
                                {user.nome}
                            </Text>
                            <Text className="text-gray-300 text-xs">{user.email}</Text>
                        </View>
                    </View>

                    {/* Separator */}
                    <View className="flex-row justify-between items-center px-6 mb-12">
                        {Array.from({ length: 20 }).map((_, index) => (
                            <View
                                key={index}
                                className="w-1 h-1 rounded-full bg-border opacity-50"
                            />
                        ))}
                    </View>

                    {/* QR Code (touchable) */}
                    <TouchableOpacity 
                    onPress={() => setModalVisible(true)}>
                        <Image
                            source={{
                                uri: user?.qrCode
                            }}
                            resizeMode="contain"
                            className="h-56 mx-12"
                        />
                    </TouchableOpacity>
                </ImageBackground>
            </AppLayout>

            {/* Modal de Ampliação */}
            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View className="flex-1 bg-black/80 justify-center items-center">
                        <Image
                            source={{
                                uri: user?.qrCode
                            }}
                            resizeMode="contain"
                            className="w-80 h-80"
                        />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </SafeAreaView>
    );
}
