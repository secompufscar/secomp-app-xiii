import { useCallback, useState } from "react";
import { Text, View, StatusBar, Platform, ActivityIndicator, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../../hooks/AuthContext";
import { colors } from "../../styles/colors";
import { getTop50Users } from "../../services/users";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import BackButton from "../../components/button/backButton";

export default function Ranking() {
  const [ranking, setRanking] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  useFocusEffect(
    useCallback(() => {
      const fetchRanking = async () => {
        try {
  setLoading(true);
  const data = await getTop50Users();
  setRanking(data);
} catch (error: any) {
  console.error("Erro ao carregar ranking:", error.response?.data || error.message);
} finally {
  setLoading(false);
}
      };

      fetchRanking();
    }, [])
  );

  const emptyList = () => {
    if (loading) {
      return (
        <ActivityIndicator size="large" color={colors.blue[500]} className="my-4" />
      );
    }

    return (
      <View className="flex-1 items-center justify-center mt-2">
        <Text className="text-gray-400 font-inter">
          Nenhuma atividade encontrada
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="bg-blue-900 flex-1 items-center">
        <View className="flex-1 w-full">
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={Platform.OS === "android"} />

            <View className="w-full flex-1 px-6 max-w-[1000px] mx-auto">
              <BackButton />
              
              <View className="flex flex-row items-center mb-8 w-full p-6 gap-6 bg-background border border-iconbg rounded-lg">
                <FontAwesome5 name="trophy" size={42} color={colors.warning} />

                <View className="flex-1">
                  <Text className="text-[#F8F8F8] text-2xl font-poppinsSemiBold mb-2">Ranking</Text>
                  <Text className="text-gray-300 font-inter">Os 50 melhores desta edição!</Text>
                </View>
              </View>

              <FlatList
                data={ranking}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <View className="flex-row items-center justify-between px-4 py-3 mb-2 bg-background rounded-lg border border-iconbg">
                    <Text className="text-white font-poppinsSemiBold">{index + 1}º</Text>
                    <Text className="text-white font-inter flex-1 ml-4">{item.nome}</Text>
                    <Text className="text-gray-300 font-inter">{item.points} pts</Text>
                  </View>
                )}
              />
            </View>
        </View>
    </SafeAreaView>
  );
}
