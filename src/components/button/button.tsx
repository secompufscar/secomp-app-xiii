import React, { useState } from "react";
import { PressableProps } from "@react-native-material/core";
import { View, Text, Pressable } from "react-native";

type Props = PressableProps & {
  title: string;
};

export default function Button({ title, ...rest }: Props) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      {...rest}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <View
        className={`w-full px-4 py-[16px] items-center justify-center rounded-lg transition-transform duration-100 transform bg-blue-500 
        ${isPressed ? "opacity-80" : "opacity-100"}`}
      >
        <Text className="text-white text-base font-interMedium">{title}</Text>
      </View>
    </Pressable>
  );
}
