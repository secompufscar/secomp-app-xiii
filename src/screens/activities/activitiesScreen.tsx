import React, { useState } from "react";
import { View, Text, StatusBar, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "../../hooks/AuthContext";
import ActivityList from "../../components/activity/activityList";
import CategoryFilter from "../../components/activity/categoryFilter";

export default function Activities() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { user: { user } }: any = useAuth();

  // Estado para armazenar a categoria selecionada no filtro
  const [selectedCategory, setSelectedCategory] = useState<string>("Palestra");

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    // Aqui você pode passar `category` para o ActivityList ou filtrar localmente
    console.log("Categoria selecionada:", category);
  };

  const handlePressActivity = (item: Activity) => {
    // Ao clicar numa atividade, navega para os detalhes
    navigation.navigate("ScheduleDetails", { item });
  };

  return (
    <SafeAreaView className="bg-blue-900 flex-1 items-center">
      <View className="flex-1 w-full">
        <StatusBar
          barStyle="light-content"
          backgroundColor='transparent'
          translucent={Platform.OS === 'android'}
        />
        
        <View className="w-full flex-1 mt-16 px-6 max-w-[1000px] mx-auto">
          {/* Cabeçalho */}
          <View className="mb-8">
            <Text className="text-white text-2xl font-poppinsSemiBold mb-2">
              Atividades
            </Text>
            <Text className="text-gray-400 font-inter text-">
              Veja todas as atividades disponíveis no evento
            </Text>
          </View>

          {/* Filtro de Categorias */}
          <View className="w-full mb-3">
            <CategoryFilter onSelect={handleSelectCategory} />
          </View>

          {/* Lista de Atividades */}
          <View className="w-full flex-1">
            <ActivityList
              selectedCategory={selectedCategory}
              onPressActivity={handlePressActivity}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}