import React from "react";
import { View, Text, Image, Pressable, ImageSourcePropType } from "react-native";

type IconButtonProps = {
  title: string;
  subtitle?: string;
  subtitleAlt?: string;
  icon: ImageSourcePropType;
  onPress: () => void;
};

const IconButton: React.FC<IconButtonProps> = ({
  title,
  subtitle,
  subtitleAlt,
  icon,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      className="h-[80px] py-3 px-5 flex-row items-center gap-4 border border-iconbg rounded-[8px] bg-background active:opacity-80"
    >
      <Image source={icon} style={{ width: 54, height: 54 }} />

      <View className="flex-col w-full justify-start gap-1">
        <Text className="text-white text-[12px] font-poppinsMedium">
          {title}
        </Text>

        {subtitle && (
          <Text className="hidden text-default text-[12px] font-inter leading-[1.4] xxs:block">
            {subtitle}
          </Text>
        )}

        {subtitleAlt && (
          <Text className="block text-default text-[12px] font-inter leading-[1.4] xxs:hidden">
            {subtitleAlt}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

export default IconButton;
