import React from 'react';
import { Modal, View, Text, Pressable } from 'react-native';
import Button from '../button/button';

type CustomModalProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  text: string;
};

const CustomModal: React.FC<CustomModalProps> = ({ visible, onClose, title, text }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onClose();
      }}
    >
      <View className="flex-1 items-center justify-center bg-black/60">
        <View className="flex-col m-8 p-8 bg-blue-900 rounded-[8px] items-center justify-center">
            <Text className="text-white text-center text-lg font-poppinsSemiBold mb-2">{title}</Text>
            <Text className="text-gray-400 text-center text-base font-inter mb-6">{text}</Text>
            <Pressable onPress={onClose}>
                <View className="w-full px-6 py-3 items-center justify-center rounded-[4px] transition-transform duration-100 transform bg-blue-500 active:opacity-80">
                    <Text className="text-white text-sm font-interMedium">Fechar</Text>
                </View>
            </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default CustomModal;