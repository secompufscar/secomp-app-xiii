import React, { useEffect, ReactNode } from 'react';
import { View, Text, Platform, StatusBar, Pressable } from 'react-native';
import { colors } from '../../styles/colors';
import * as NavigationBar from 'expo-navigation-bar';

interface CreationEditionOverlayProps {
  visible: boolean;
  title: string;
  children: ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  originalNavBarColor?: string;
}

const CreationEditionOverlay: React.FC<CreationEditionOverlayProps> = ({
  visible,
  title,
  children,
  onCancel,
  onConfirm,
  confirmText = 'Salvar',
  cancelText = 'Cancelar',
  originalNavBarColor = colors.blue[900],
}) => {
  useEffect(() => {
    // Esta função só fará algo no Android
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

    // Função de limpeza do useEffect: Garante que ao desmontar o componente, a cor volte ao normal.
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
        <Text className="text-white text-lg font-poppinsSemiBold mb-4">{title}</Text>
        
        <View className="mb-6">
            {children}
        </View>

        <View className="flex-row flex-wrap justify-end gap-4">
          <Pressable
            onPress={onCancel}
            className="w-full min-[375px]:w-28 h-11 px-2 flex justify-center items-center rounded border border-gray-600 bg-gray-600/20 active:bg-gray-600/40 order-2 min-[375px]:order-1"
          >
            <Text className="text-gray-400 font-poppinsMedium">{cancelText}</Text>
          </Pressable>

          <Pressable
            onPress={onConfirm}
            className="w-full min-[375px]:w-28 h-11 px-2 flex justify-center items-center rounded bg-blue-500 active:opacity-80 order-1 min-[375px]:order-2"
          >
            <Text className="text-white font-poppinsMedium">{confirmText}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CreationEditionOverlay;