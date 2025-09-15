import { useState } from "react";
import { View, ScrollView, Text, Pressable } from "react-native";

const categories = ["Palestras", "Minicursos", "Competições", "Outros"];

export default function CategoryFilter({ onSelect }: { onSelect?: (category: string) => void }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Palestras");

  const handlePress = (category: string) => {
    setSelectedCategory(category);
    if (onSelect) onSelect(category); 
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="w-full h-[40px]">
      <View className="flex-row flex-wrap gap-2 items-center">
        {categories.map((category) => {
          const isSelected = selectedCategory === category; 

          return (
            <Pressable
              key={category}
              onPress={() => handlePress(category)}
              className={`px-5 py-2.5 rounded-full
                ${isSelected ? "border border-green bg-green" : "border border-neutral-200"}
                justify-center items-center`}
            >
              <Text
                className={`text-xs font-poppinsMedium transition duration-500 ease-in-out
                  ${isSelected ? "text-blue-900" : "text-neutral-200"}`}
              >
                {category}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}
