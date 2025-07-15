import { View, Text, Pressable, StatusBar, Platform, ActivityIndicator, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { getEvents, deleteEvent } from "../../services/events";
import { colors } from "../../styles/colors";
import BackButton from "../../components/button/backButton";
import Button from "../../components/button/button";
import FontAwesome from '@expo/vector-icons/FontAwesome';


export default function EventAdmin() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [events, setEvents] = useState<Events[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      const fetchEvents = async () => {
        setLoading(true); 
        setError(null); 

        try {
          const data = await getEvents();
          setEvents(data);
        } catch (err) {
          setError("Não foi possível carregar os eventos. Tente novamente.");
        } finally {
          setLoading(false); 
        }
      };

      fetchEvents();
    }, []) 
  );

  // Itens da lista
  const renderEventItem = ({ item }: { item: Events }) => (
    <Pressable
      onPress={() => {}}
      className=""
    >
      {({ pressed }) => (
        <View className={`flex flex-row justify-between p-4 rounded-lg shadow-md mb-4 border border-iconbg gap-3 ${pressed ? "bg-background/80" : "bg-background"}`}>
          <View className="flex-1">
            <Text className="text-lg text-white font-poppinsSemiBold">{item.year}</Text>

            <View className="flex flex-row mt-1 flex-wrap">
              <Text className="text-base text-gray-600 font-inter">
                {new Date(item.startDate).toLocaleDateString('pt-BR')} -
              </Text>
              <Text className="text-gray-600 font-inter ml-1">
                {new Date(item.endDate).toLocaleDateString('pt-BR')}
              </Text>
            </View>
          </View>

          {/* Botão de deletar evento */}
          <Pressable onPress={(e) => {
            e.stopPropagation(); 
          }}>
            {({ pressed }) => (
              <View className={`flex w-[44px] h-full items-center justify-center bg-danger/10 rounded border border-danger ${pressed ? "bg-danger/20" : "bg-danger/10"}`}>
                <FontAwesome name="trash" size={20} color={colors.danger} />
              </View>
            )}
          </Pressable>
        </View>
      )}
    </Pressable>
  );

  return (
    <SafeAreaView className="bg-blue-900 flex-1 items-center">
      <View className="flex-1 w-full">
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={Platform.OS === "android"}
        />

        <View className="w-full flex-1 px-6 max-w-[1000px] mx-auto">
          <BackButton/>

          {/* Cabeçalho */}
          <View className="mb-8">
            <Text className="text-white text-2xl font-poppinsSemiBold mb-2">Painel de eventos</Text>
            <Text className="text-gray-400 font-inter">
              Painel de administração dos eventos
            </Text>
          </View>

          <Button title="Criar evento" onPress={() => {navigation.navigate("EventAdminCreate")}}/>

          <View className="flex-1 mt-8">
            {loading && <ActivityIndicator size="large" color={colors.blue[500]} className="mt-16"/>}

            {error && <Text className="text-red-400 text-center mt-8">{error}</Text>}

            <FlatList
              data={events}
              renderItem={renderEventItem}
              keyExtractor={(item) => item.year.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 36 }}
              ListEmptyComponent={() => (
                <View className="flex-1 items-center justify-center mt-4">
                  <Text className="text-default font-poppinsMedium text-base">Nenhum evento encontrado</Text>
                  <Text className="text-gray-400 font-inter mt-1">Que tal criar o primeiro?</Text>
                </View>
              )}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
