import React, { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, Modal, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert, Image, Linking } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../styles/colors";
import { useAuth } from "../../hooks/AuthContext";
import { getSponsors, deleteSponsor, Sponsor } from "../../services/sponsors";
import AppLayout from "../../components/app/appLayout";
import Button from "../../components/button/button";
import BackButton from "../../components/button/backButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

export default function SponsorsAdmin() {

    const navigation = useNavigation<NativeStackNavigationProp<any>>(); // Hook de navegação
    const { user } = useAuth(); // Dados do usuário logado

    // Estado para armazenar a lista de patrocinadores
    const [list, setList] = useState<Sponsor[]>([]);

    // Estado para controle do loading
    const [loading, setLoading] = useState(true);

    // Estado para controle do modal de confirmação
    const [modalVisible, setModalVisible] = useState(false);

    // Armazena o ID do patrocinador a ser deletado
    const [toDeleteId, setToDeleteId] = useState<string | null>(null);

    // carrega patrocinadores
    const loadSponsors = async () => {
        setLoading(true);
        try {
            const data = await getSponsors();
            setList(data);
        } catch {
            Alert.alert("Erro", "Não foi possível carregar patrocinadores.");
        } finally {
            setLoading(false);
        }
    };

    // Recarrega a lista toda vez que a tela for focada
    useFocusEffect(
        useCallback(() => {
            loadSponsors();
        }, [])
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
            await loadSponsors();
        } catch {
            Alert.alert("Erro", "Falha ao remover.");
        } finally {
            setModalVisible(false);
            setToDeleteId(null);
        }
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-blue-900">
                <ActivityIndicator size="large" color={colors.blue[500]} />
            </View>
        );
    }

    return (
        <SafeAreaView className="bg-blue-900 flex-1 items-center">
            <AppLayout>
                <BackButton />
                <View className="flex-col flex-1 w-full gap-3 text-center justify-start">
                    {/* Cabeçalho */}
                    <View className="mb-8">
                        <Text className="text-white text-2xl font-poppinsSemiBold mb-2">Painel de patrocinadores</Text>
                        <Text className="text-gray-400 font-inter">
                            Painel de administração dos patrocinadores
                        </Text>
                    </View>


                    <Button
                        title="Criar patrocinador"
                        onPress={() => navigation.navigate("SponsorsAdminCreate")}
                    />


                    <Button title="Gerenciar Tags" onPress={() => navigation.navigate("TagsAdmin")} />

                    {/* Lista de patrocinadores */}
                    <View className="flex-1 mt-8">
                        <FlatList
                            data={list}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={{ paddingHorizontal: 6, paddingBottom: 40 }}
                            ListEmptyComponent={() => (
                                <View className="items-center justify-center mt-20">
                                    <Text className="text-default font-poppinsMedium text-base">
                                        Nenhum patrocinador encontrado
                                    </Text>
                                    <Text className="text-gray-400 font-inter mt-1">
                                        Que tal criar o primeiro?
                                    </Text>
                                </View>
                            )}
                            renderItem={({ item }) => (
                                <Pressable
                                    onPress={() => item.link && Linking.openURL(item.link)}
                                >
                                    {({ pressed }) => (
                                        <LinearGradient
                                            // cartão degradê
                                            colors={["#2E364B", "#161F36"]}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                            className={`relative w-full rounded-[8px] border p-6 mb-6 overflow-hidden ${pressed ? "border-blue-500" : "border-border"
                                                }`}
                                        >
                                            {/* Estrela */}
                                            <View className="absolute top-4 right-6 z-0">
                                                <AntDesign name="star" size={22} color={item.starColor} />
                                            </View>

                                            {/* NOVO: botões de editar/excluir */}
                                            {user?.tipo === "ADMIN" && (
                                                <View className="absolute top-12 right-3 flex-row space-x-3 z-10">
                                                    <Pressable
                                                        onPress={() =>
                                                            navigation.navigate("SponsorsAdminUpdate", {
                                                                id: item.id,
                                                            })
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faPencil}
                                                            size={18}
                                                            color={colors.blue[200]}
                                                        />
                                                    </Pressable>
                                                    <Pressable onPress={() => confirmDelete(item.id)}>
                                                        <FontAwesomeIcon
                                                            icon={faTrash}
                                                            size={18}
                                                            color={colors.danger}
                                                        />
                                                    </Pressable>
                                                </View>
                                            )}

                                            {/* === HEADER DO CARD === */}
                                            <View className="flex-row items-center justify-between mb-4">
                                                <View className="flex-row items-center gap-3">
                                                    <View className="w-[42px] h-[42px] bg-background rounded">
                                                        <Image
                                                            source={{ uri: item.logoUrl }}
                                                            className="w-full h-full rounded"
                                                        />
                                                    </View>
                                                    <Text className="text-white text-lg font-poppinsMedium">
                                                        {item.name}
                                                    </Text>
                                                </View>
                                            </View>

                                            {/* === TAGS === */}
                                            <View className="flex-row flex-wrap gap-2 mb-4">
                                                {item.tags.map((tag, idx) => (
                                                    <View
                                                        key={idx}
                                                        className="bg-blue-500 px-3 py-1.5 rounded-full"
                                                    >
                                                        <Text className="text-white text-xs font-inter">
                                                            {tag}
                                                        </Text>
                                                    </View>
                                                ))}
                                            </View>

                                            {/* === DESCRIÇÃO === */}
                                            <Text className="text-default text-sm font-inter leading-relaxed">
                                                {item.description}
                                            </Text>
                                        </LinearGradient>
                                    )}
                                </Pressable>
                            )}
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
                                <TouchableOpacity
                                    onPress={handleDelete}
                                    className="px-4 py-2 rounded bg-red-600"
                                >
                                    <Text className="text-white">Excluir</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </AppLayout>
        </SafeAreaView>
    );
}
