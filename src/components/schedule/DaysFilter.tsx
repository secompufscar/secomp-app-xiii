import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function DaysFilter({ onSelect }: { onSelect?: (day: string) => void }) {
  // Lista fixa de dias exibidos como botões
  const days = ['SEG', 'TER', 'QUA', 'QUI', 'SEX'];

  // Estado para rastrear qual dia está atualmente selecionado
  const [selectedDay, setSelectedDay] = useState<string>('SEG');

  // Ao pressionar um dia, atualiza o estado e chama o callback do pai (se houver)
  const handlePress = (day: string) => {
    setSelectedDay(day);
    if (onSelect) onSelect(day);
  };

  return (
    <View
      className="w-full h-[40px] px-0 justify-between" 
    >
      <View className="flex-row flex-wrap justify-between gap-2">
        {days.map((day) => {
          const isSelected = selectedDay === day;

          return (
            <Pressable
              key={day}
              onPress={() => handlePress(day)}
              className={`flex-1 px-5 py-1.5 rounded-full justify-center items-center
                ${isSelected ? 'bg-green' : 'border border-neutral-200'}`}
            >
              <Text
                className={`text-[11px] font-poppinsMedium transition duration-500 ease-in-out
                  ${isSelected ? 'text-blue-900' : 'text-neutral-200'}`}
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