import { useState } from "react";
import { PressableProps } from "@react-native-material/core";
import { View, Text, Pressable, ActivityIndicator } from "react-native";

type Props = PressableProps & {
  title: string;
  bgColor?: string;
  loading?: boolean;
};

export default function Button({ title, bgColor = "bg-blue-500", loading = false, ...rest }: Props) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      {...rest}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <View
        className={`w-full px-4 py-[16px] items-center justify-center rounded-lg transition-transform duration-100 transform ${bgColor} 
        ${isPressed ? "opacity-80" : "opacity-100"}`}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#F8F8F8" />
        ) : (
          <Text className="text-white text-base font-interMedium">{title}</Text>
        )}
      </View>
    </Pressable>
  );
}
