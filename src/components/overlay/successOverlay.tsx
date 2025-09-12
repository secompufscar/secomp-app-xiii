import React, { useEffect } from 'react';
import { View, Text, Platform, StatusBar, Pressable } from 'react-native';
import { colors } from '../../styles/colors'; 
import * as NavigationBar from 'expo-navigation-bar';
import Feather from '@expo/vector-icons/Feather';

interface ErrorOverlayProps {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  confirmText?: string;
  originalNavBarColor?: string;
}

const SuccessOverlay: React.FC<ErrorOverlayProps> = ({
  visible,
  title,
  message,
  onConfirm,
  confirmText = 'Continuar',
  originalNavBarColor = colors.blue[900], 
}) => {

  useEffect(() => {
    const setAndroidNavColor = async (color: string) => {
      if (Platform.OS === 'android') {
        await NavigationBar.setBackgroundColorAsync(color);
        await NavigationBar.setButtonStyleAsync('light'); 
      }
    };

    if (visible) {
      StatusBar.setBackgroundColor('transparent', true);
      setAndroidNavColor(originalNavBarColor);
    }

    return () => {
      StatusBar.setBackgroundColor('transparent', true);
      setAndroidNavColor(originalNavBarColor);
    };
  }, [visible, originalNavBarColor]);

  if (!visible) {
    return null;
  }

  return (
    <View className="absolute inset-0 z-10 flex-1 justify-center items-center bg-black/60 px-10">
      <View className="bg-blue-900 rounded-lg p-7 w-full max-w-md">
        <View className="w-[36px] h-auto flex items-center rounded-lg bg-success/30 p-2 mb-6">
            <Feather name="check" size={20} color={colors.success} />
        </View>
        <Text className="text-white text-lg font-poppinsSemiBold mb-1">{title}</Text>
        <Text className="text-gray-400 mb-6 font-inter leading-normal">{message}</Text>

        <View className="flex-row justify-end">
          <Pressable
            onPress={onConfirm}
            className="w-full min-[375px]:w-28 h-11 px-2 flex justify-center items-center rounded border border-success bg-success/10 active:bg-success/20"
          >
            <Text className="text-success font-poppinsMedium">{confirmText}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SuccessOverlay;