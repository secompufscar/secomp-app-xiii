import { View, Text, Pressable, StatusBar, Platform, ActivityIndicator, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { getActivities, deleteActivity } from "../../services/activities"; 
import { colors } from "../../styles/colors";
import ConfirmationOverlay from "../../components/overlay/confirmationOverlay";
import ErrorOverlay from "../../components/overlay/errorOverlay";
import BackButton from "../../components/button/backButton";
import Button from "../../components/button/button";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function ActivityAdmin() { 
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [activities, setActivities] = useState<Activity[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [toDeleteId, setToDeleteId] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      const fetchActivities = async () => { 
        setLoading(true);
        setError(null);

        try {
          const data = await getActivities(); 
          setActivities(data); 
        } catch (err) {
          setError("Não foi possível carregar as atividades. Tente novamente."); 
        } finally {
          setLoading(false);
        }
      };

      fetchActivities();
    }, [])
  );

  // Abre modal de confirmação e armazena ID a ser deletado
  const confirmDelete = (id: string) => {
    setToDeleteId(id);
    setModalVisible(true);
  };

  const renderActivityItem = ({ item }: { item: Activity }) => ( 
    <Pressable
      onPress={() => {
        navigation.navigate("ActivityDetails", { item });
      }}
    >
      {({ pressed }) => (
        <View className={`flex flex-row items-center justify-between p-4 rounded-lg shadow mb-4 border border-iconbg gap-3 ${pressed ? "bg-background/80" : "bg-background"}`}>
          <View className="flex-1 flex-col gap-1">
            <Text className="text-base text-white font-poppinsMedium line-clamp-1">{item.nome}</Text>
            <Text className="text-sm text-gray-600 font-interMedium line-clamp-1">{item.palestranteNome}</Text>
          </View>

          <Pressable onPress={(e) => {
            e.stopPropagation();
          }}>
            {({ pressed }) => (
              <View className={`flex w-[44px] h-[44px] items-center justify-center bg-danger/10 rounded border border-danger ${pressed ? "bg-danger/20" : "bg-danger/10"}`}>
                <FontAwesome name="trash" size={20} color={colors.danger} />
              </View>
            )}
          </Pressable>
        </View>
      )}
    </Pressable>
  );

  const emptyList = () => (
    <View className="flex-1 items-center justify-center mt-2">
      <Text className="text-gray-400 font-inter">Nenhuma atividade encontrada</Text>
    </View>
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
            <Text className="text-white text-2xl font-poppinsSemiBold mb-2">Painel de Atividades</Text> 
            <Text className="text-gray-400 font-inter">
              Painel de administração das atividades
            </Text> 
          </View>

          <Button title="Criar atividade" onPress={() => {navigation.navigate("ActivityAdminCreate")}}/> 

          <View className="flex-1 mt-8">
            {loading && <ActivityIndicator size="large" color={colors.blue[500]} className="mt-16"/>}

            {error && <Text className="text-red-400 text-center mt-8">{error}</Text>}

            <FlatList
              data={activities} 
              renderItem={renderActivityItem} 
              ListEmptyComponent={emptyList}
              keyExtractor={(item) => item.id.toString()} 
              showsVerticalScrollIndicator={false}
              initialNumToRender={15}
              contentContainerStyle={{ paddingBottom: 36 }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}