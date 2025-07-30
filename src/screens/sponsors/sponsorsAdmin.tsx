import React, { useCallback, useState } from "react";
import { View, Text, FlatList, Pressable, Modal, TouchableOpacity, ActivityIndicator, Alert, Image, StatusBar, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../styles/colors";
import { useAuth } from "../../hooks/AuthContext";
import { getSponsors, deleteSponsor, Sponsor } from "../../services/sponsors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useFocusEffect, useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import Button from "../../components/button/button";
import BackButton from "../../components/button/backButton";

export default function SponsorsAdmin() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { user } = useAuth();

  // Estado para armazenar a lista de patrocinadores
  const [list, setList] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [toDeleteId, setToDeleteId] = useState<string | null>(null);

  // Carrega os patrocinadores
  const fetchSponsors = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getSponsors();
      setList(data);
    } catch {
      setError("Não foi possível carregar os patrocinadores. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Recarrega a lista toda vez que a tela for focada
  useFocusEffect(
    useCallback(() => {
      fetchSponsors();
    }, []),
  );

  // Abre modal de confirmação e armazena ID a ser deletado
  const confirmDelete = (id: string) => {
    setToDeleteId(id);
    setModalVisible(true);
  };

  // Deleta o patrocinador selecionado
  const handleDelete = async () => {
    if (!toDeleteId) return;
    try {
      await deleteSponsor(toDeleteId);
      await fetchSponsors();
    } catch {
      Alert.alert("Erro", "Falha ao remover.");
    } finally {
      setModalVisible(false);
      setToDeleteId(null);
    }
  };
  
  // Itens da lista
  const renderEventItem = ({ item }: { item: Sponsor }) => (
    <Pressable
      onPress={() => {navigation.navigate("SponsorsAdminUpdate", { id: item.id })}}
    >
      {({ pressed }) => (
        <View className={`flex flex-row justify-between p-4 rounded-lg shadow mb-4 border border-iconbg gap-3 ${pressed ? "bg-background/80" : "bg-background"}`}>
          <View className="flex-1 flex-row items-center gap-5">
            <View className="w-[36px] h-[36px] rounded">
              <Image
                source={{ uri: item.logoUrl }}
                className="w-full h-full rounded"
              />
            </View>

            <Text className="text-base text-white font-poppinsMedium">{item.name}</Text>
          </View>

          {/* Botão de deletar evento */}
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

  // Lista vazia
  const emptyList = () => (
    <View className="flex-1 items-center justify-center mt-2">
      <Text className="text-gray-400 font-inter">Nenhum evento encontrado</Text>
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
            <Text className="text-white text-2xl font-poppinsSemiBold mb-2">Painel de patrocinadores</Text>
            <Text className="text-gray-400 font-inter">
              Painel de administração dos patrocinadores
            </Text>
          </View>

          <Button title="Criar patrocinador" className="mb-4" onPress={() => navigation.navigate("SponsorsAdminCreate")}/>

          {/* Lista de patrocinadores */}
          <View className="flex-1 mt-8">
            {loading && <ActivityIndicator size="large" color={colors.blue[500]} className="mt-16"/>}

            {error && <Text className="text-red-400 text-center mt-8">{error}</Text>}

            <FlatList
              data={list}
              renderItem={renderEventItem}
              ListEmptyComponent={emptyList}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 36 }}
            />
          </View>
        </View>

        {/* Modal de confirmação de exclusão */}
        <Modal
          transparent
          animationType="fade"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 bg-black/40 justify-center items-center">
            <View className="bg-blue-800 rounded-lg p-6 w-4/5">
              <Text className="text-white text-lg font-poppinsSemiBold mb-4">
                Confirmar exclusão
              </Text>
              <Text className="text-gray-300 mb-6">
                Tem certeza que deseja remover este patrocinador?
              </Text>
              <View className="flex-row justify-end space-x-4">
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  className="px-4 py-2 rounded bg-gray-600"
                >
                  <Text className="text-white">Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDelete} className="px-4 py-2 rounded bg-red-600">
                  <Text className="text-white">Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
