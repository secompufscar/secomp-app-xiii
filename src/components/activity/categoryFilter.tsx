import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

// Lista fixa de categorias exibidas como botões
const categories = ['Competições', 'Palestra', 'Minicurso', 'Outros'];

// Componente que exibe filtros de categoria em botões
export function CategoryFilter({ onSelect }: { onSelect?: (category: string) => void }) {
  // Estado para rastrear qual categoria está atualmente selecionada
  const [selectedCategory, setSelectedCategory] = useState<string>('Minicurso');

  // Ao pressionar uma categoria, atualiza o estado e chama o callback do pai (se houver)
  const handlePress = (category: string) => {
    setSelectedCategory(category);
    if (onSelect) onSelect(category); // Notifica componente pai da nova seleção
  };

  return (
    // Container horizontal com espaçamento entre botões
    <View className="w-full flex-row justify-between items-center">
      {categories.map((category) => {
        const isSelected = selectedCategory === category; // Verifica se este botão está selecionado

        return (
          <Pressable
            key={category}
            onPress={() => handlePress(category)} // Define ação ao clicar no botão
            className={`px-4 py-1 rounded-full
              ${isSelected ? 'bg-green' : 'border border-neutral-200'}
              justify-center items-center`} // Estilização dinâmica com base na seleção
          >
            <Text
              className={`text-[10px] font-[Poppins_600SemiBold] 
                ${isSelected ? 'text-blue-900' : 'text-neutral-200'}`} // Cor de texto baseada na seleção
            >
              {category}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
