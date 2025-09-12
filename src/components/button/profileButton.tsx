import React from "react";
import { Pressable, View, Text, GestureResponderEvent } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../hooks/ThemeContext";
import { colors } from "../../styles/colors";

type MenuButtonProps = {
  icon: IconDefinition;
  label: string;
  onPress: (event: GestureResponderEvent) => void; 
};



const ProfileButton = ({ icon, label, onPress }: MenuButtonProps) => {
  const { theme } = useTheme();




  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View className={`flex-row h-[58px] items-center justify-between rounded-lg p-4 mb-3 transition-all duration-100 bg-light-secondary dark:bg-dark-secondary
          ${pressed ? "opacity-80" : "opacity-100"}`}
        >

          {/* Lado esquerdo com ícone e texto dinâmicos */}
          <View className="flex-row items-center gap-4">
            <View className="w-6 flex items-center justify-center">
              <FontAwesomeIcon icon={icon} size={20} color={theme === "dark" ? colors.dark.icon : colors.light.icon2} />
            </View>
            <Text className="text-light-text dark:text-dark-text text-base font-inter">{label}</Text>
          </View>

          {/* Lado direito com ícone estático */}
          <View className="w-6 flex items-center justify-center">
            <FontAwesomeIcon
              icon={faChevronRight}
              size={16}
              color={theme === "dark" ? colors.dark.icon : colors.light.icon2}
            />
          </View>
        </View>
      )}
    </Pressable>
  );
};

export default ProfileButton;