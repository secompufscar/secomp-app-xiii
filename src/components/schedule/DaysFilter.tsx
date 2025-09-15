import { useState } from "react";
import { View, Text, Pressable } from "react-native";

export default function DaysFilter({ onSelect }: { onSelect?: (day: string) => void }) {
  const days = ["SEG", "TER", "QUA", "QUI", "SEX"];
  const [selectedDay, setSelectedDay] = useState<string>("SEG");

  const handlePress = (day: string) => {
    setSelectedDay(day);
    if (onSelect) onSelect(day);
  };

  return (
    <View className="w-full h-[40px] px-0 justify-between">
      <View className="flex-row flex-wrap justify-between gap-2">
        {days.map((day) => {
          const isSelected = selectedDay === day;

          return (
            <Pressable
              key={day}
              onPress={() => handlePress(day)}
              className={`flex-1 px-5 py-2 rounded-full justify-center items-center
                ${isSelected ? "border border-green bg-green" : "border border-neutral-200"}`}
            >
              <Text
                className={`text-xs font-poppinsMedium transition duration-500 ease-in-out
                  ${isSelected ? "text-blue-900" : "text-neutral-200"}`}
              >
                {day}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
