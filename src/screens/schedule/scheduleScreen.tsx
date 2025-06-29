import React, { useState } from "react";
import { View, Text, StatusBar, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "../../hooks/AuthContext";
import BackButton from "../../components/button/backButton";
import DaysFilter from "../../components/schedule/DaysFilter";
import ActivityList from "../../components/schedule/activityList"; 

export default function Activities() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { user: { user } }: any = useAuth(); 

  // Estado para armazenar o dia selecionado no filtro
  const [selectedDay, setSelectedDay] = useState<string>("SEG"); 

  // Callback ao selecionar um dia no DaysFilter
  const handleSelectDay = (day: string) => {
    setSelectedDay(day);
  };

  // Callback ao pressionar uma atividade
  const handlePressActivity = (item: Activity) => {
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

        <View className="w-full flex-1 px-6 max-w-[1000px] mx-auto">
          <BackButton />

          {/* Cabeçalho */}
          <View className="mb-8">
            <Text className="text-white text-2xl font-poppinsSemiBold mb-2">
              Cronograma
            </Text>
            <Text className="text-gray-400 font-inter text-">
              Calendário de atividades do evento
            </Text>
          </View>

          {/* Filtro de Dias */}
          <View className="w-full mb-3">
            <DaysFilter onSelect={handleSelectDay} />
          </View>

          {/* Lista de Atividades */}
          <View className="w-full flex-1">
            <ActivityList
              selectedDay={selectedDay} // Pass the selectedDay state to ActivityList
              onPressActivity={handlePressActivity}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}