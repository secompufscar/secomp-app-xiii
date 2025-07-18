import { View, Text, Pressable, StatusBar, Platform, ActivityIndicator, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { getActivities, deleteActivity } from "../../services/activities"; // Changed to activities service
import { colors } from "../../styles/colors";
import BackButton from "../../components/button/backButton";
import Button from "../../components/button/button";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { format, parseISO, addHours } from "date-fns"; // Imported date-fns for formatting
import { ptBR } from "date-fns/locale"; // Imported locale for date-fns

export default function ActivityAdmin() { // Renamed component
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [activities, setActivities] = useState<Activity[]>([]); // Changed state variable
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      const fetchActivities = async () => { // Renamed function
        setLoading(true);
        setError(null);

        try {
          const data = await getActivities(); // Changed service call
          setActivities(data); // Changed state variable
        } catch (err) {
          console.error("Erro ao carregar atividades:", err); // Updated error message
          setError("Não foi possível carregar as atividades. Tente novamente."); // Updated error message
        } finally {
          setLoading(false);
        }
      };

      fetchActivities();
    }, [])
  );

  // Itens da lista
  const renderActivityItem = ({ item }: { item: Activity }) => ( // Changed type to Activity
    <Pressable
      onPress={() => {
        navigation.navigate("ActivityDetails", { item });
      }}
      className=""
    >
      {({ pressed }) => (
        <View className={`flex flex-row justify-between p-4 rounded-lg shadow-md mb-4 border border-iconbg gap-3 ${pressed ? "bg-background/80" : "bg-background"}`}>
          <View className="flex-1">
            <Text className="text-lg text-white font-poppinsSemiBold">{item.nome}</Text> {/* Changed to item.nome */}

            <View className="flex flex-row mt-1 flex-wrap">
              <Text className="text-base text-gray-600 font-inter">
                {format(addHours(parseISO(item.data), 3), "dd/MM/yyyy", { locale: ptBR })} -
              </Text>
              <Text className="text-gray-600 font-inter ml-1">
                {format(addHours(parseISO(item.data), 3), "HH:mm", { locale: ptBR })}
              </Text>
            </View>
          </View>

          {/* Botão de deletar atividade */}
          <Pressable onPress={(e) => {
            e.stopPropagation();
            // IAdicionar confirmacao de exclusao aqui
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
            <Text className="text-white text-2xl font-poppinsSemiBold mb-2">Painel de Atividades</Text> {/* Updated text */}
            <Text className="text-gray-400 font-inter">
              Painel de administração das atividades
            </Text> {/* Updated text */}
          </View>

          <Button title="Criar atividade" onPress={() => {navigation.navigate("EventAdminCreate")}}/> {/* Updated text and assuming ActivityAdminCreate exists */}

          <View className="flex-1 mt-8">
            {loading && <ActivityIndicator size="large" color={colors.blue[500]} className="mt-16"/>}

            {error && <Text className="text-red-400 text-center mt-8">{error}</Text>}

            <FlatList
              data={activities} 
              renderItem={renderActivityItem} 
              keyExtractor={(item) => item.id.toString()} 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 36 }}
              ListEmptyComponent={() => (
                <View className="flex-1 items-center justify-center mt-4">
                  <Text className="text-default font-poppinsMedium text-base">Nenhuma atividade encontrada</Text> {/* Updated text */}
                  <Text className="text-gray-400 font-inter mt-1">Que tal criar a primeira?</Text> {/* Updated text */}
                </View>
              )}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}