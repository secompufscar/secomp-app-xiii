import React, { useState } from 'react';
import { View, ScrollView, Text, Pressable } from 'react-native';

// Lista fixa de categorias exibidas como botões
const categories = ['Palestras', 'Minicursos', 'Competições', 'Outros'];

// Componente que exibe filtros de categoria em botões
export default function CategoryFilter({ onSelect }: { onSelect?: (category: string) => void }) {
  // Estado para rastrear qual categoria está atualmente selecionada
  const [selectedCategory, setSelectedCategory] = useState<string>('Palestras');

  // Ao pressionar uma categoria, atualiza o estado e chama o callback do pai (se houver)
  const handlePress = (category: string) => {
    setSelectedCategory(category);
    if (onSelect) onSelect(category); // Notifica componente pai da nova seleção
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="w-full h-[40px]"
    >
      <View className="flex-row flex-wrap gap-2 items-center">
        {categories.map((category) => {
          const isSelected = selectedCategory === category; // Verifica se este botão está selecionado

          return (
            <Pressable
              key={category}
              onPress={() => handlePress(category)} 
              className={`px-5 py-2.5 rounded-full
                ${isSelected ? 'bg-green' : 'border border-neutral-200'}
                justify-center items-center`}
            >
              <Text
                className={`text-xs font-poppinsMedium transition duration-500 ease-in-out
                  ${isSelected ? 'text-blue-900' : 'text-neutral-200'}`} 
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
