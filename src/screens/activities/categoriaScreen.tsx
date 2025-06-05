import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FontAwesome6 } from "@expo/vector-icons";

import { useAuth } from "../../hooks/AuthContext";
import BackButton from "../../components/button/backButton";
import AppLayout from "../../components/appLayout";
import { ActivityList } from "../../components/activity/activityList";
import { CategoryFilter } from "../../components/activity/categoryFilter";

type Category = {
  id: string;
  nome: string;
};



export default function Categorias() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { user: { user } }: any = useAuth();

  // Estado para armazenar a categoria selecionada no filtro
  const [selectedCategory, setSelectedCategory] = useState<string>("Minicurso");

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    // Aqui você pode passar `category` para o ActivityList ou filtrar localmente
    console.log("Categoria selecionada:", category);
  };

  const handlePressActivity = (item: Activity) => {
    // Ao clicar numa atividade, navega para os detalhes
    navigation.navigate("ScheduleDetails", { item });
  };

  // Função para obter o ícone de categoria (caso decida reaproveitar)
  const getIconName = (categoryName: string): string => {
    switch (categoryName) {
      case "Minicursos":
        return "laptop-file";
      case "Palestras":
        return "chalkboard-user";
      case "Competições":
        return "trophy";
      case "Workshops":
        return "people-group";
      case "SECOMP":
        return "id-badge";
      default:
        return "list";
    }
  };

  // (Opcional) Se você ainda precisar renderizar algo baseado em categorias genéricas:
  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity onPress={() => navigation.navigate(item.nome)}>
      <View className="grow h-20 flex-row items-center space-x-1 rounded-lg bg-neutral-200/20 my-2 border border-neutral-200/40">
        <View className="w-14 h-full ml-2 items-center justify-center">
          <FontAwesome6 name={getIconName(item.nome)} size={20} color="#445BE6" />
        </View>
        <View className="grow">
          <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-lg font-semibold text-neutral-700">
            {item.nome}
          </Text>
        </View>
        <View className="w-14 h-full ml-2 items-center justify-center">
          <FontAwesome6 name="chevron-right" size={18} color="#a3a3a3" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="bg-blue-900 flex-1 items-center">
      <AppLayout>
        <BackButton />

        {/* Cabeçalho */}
        <View className="mb-8">
          <Text className="text-white text-2xl font-poppinsSemiBold mb-2">
            Atividades
          </Text>
          <Text className="text-gray-400 font-inter text-sm">
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
      </AppLayout>
    </SafeAreaView>
  );
}