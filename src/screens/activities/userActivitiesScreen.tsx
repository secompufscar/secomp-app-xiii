import React from "react";
import { View, Text, StatusBar, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SubscribedActivityList } from "../../components/activity/subscribedActivityList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import BackButton from "../../components/button/backButton";

export default function MyEvents() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

interface ActivityItem {
    id: string;
    [key: string]: any;
}

interface ScheduleDetailsParams {
    item: ActivityItem;
}

const handlePressActivity = (item: ActivityItem): void => {
    navigation.navigate("ActivityDetails", { item } as ScheduleDetailsParams);
};

  return (
    <SafeAreaView className="bg-blue-900 flex-1 items-center">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={Platform.OS === "android"}
      />
      <View className="flex-1 w-full px-6 max-w-[1000px] mx-auto">
        <BackButton />

        {/* Cabeçalho */}
        <View className="mb-6">
          <Text className="text-white text-2xl font-poppinsSemiBold mb-2">
            Atividades Inscritas
          </Text>
          <Text className="text-gray-400 font-inter">
            Uma lista com todas as suas inscrições
          </Text>
        </View>

        {/* Lista de Inscrições */}
        <View className="flex-1 w-full">
          <SubscribedActivityList onPressActivity={handlePressActivity} />
        </View>
      </View>
    </SafeAreaView>
  );
}
