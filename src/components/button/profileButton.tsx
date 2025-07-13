import React from "react";
import { Pressable, View, Text, GestureResponderEvent } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight, IconDefinition } from "@fortawesome/free-solid-svg-icons";

type MenuButtonProps = {
  icon: IconDefinition;
  label: string;
  onPress: (event: GestureResponderEvent) => void; 
};

const ProfileButton = ({ icon, label, onPress }: MenuButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View
          // A margem foi removida para tornar o componente mais genérico
          className={`flex-row h-[58px] items-center justify-between rounded-lg p-4 mb-3 ${
            pressed ? "bg-background/60" : "bg-background"
          }`}
        >
          {/* Lado esquerdo com ícone e texto dinâmicos */}
          <View className="flex-row items-center gap-4">
            <View className="w-6 flex items-center justify-center">
              <FontAwesomeIcon icon={icon} size={20} color="#A9B4F4" />
            </View>
            <Text className="text-white text-base font-inter">{label}</Text>
          </View>

          {/* Lado direito com ícone estático */}
          <View className="w-6 flex items-center justify-center">
            <FontAwesomeIcon icon={faChevronRight} size={16} color="#A9B4F4" />
          </View>
        </View>
      )}
    </Pressable>
  );
};

export default ProfileButton;