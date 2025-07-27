import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, Modal, SafeAreaView, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";

import AppLayout from "../../components/app/appLayout";
import BackButton from "../../components/button/backButton";
import Button from "../../components/button/button";
import { Input } from "../../components/input/input";

import { getTags, createTag, updateTag, deleteTag, Tag } from "../../services/tags";
import { colors } from "../../styles/colors";

export default function TagsAdmin() {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(true);

    // Estados para modal de criar/editar
    const [modalVisible, setModalVisible] = useState(false);
    const [editingTag, setEditingTag] = useState<Tag | null>(null);
    const [newTagName, setNewTagName] = useState("");

    // **Novos estados** para exclusão
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [toDeleteTag, setToDeleteTag] = useState<Tag | null>(null);

    // Carrega lista de tags
    const loadTags = async () => {
        setLoading(true);
        try {
            const data = await getTags();
            setTags(data);
        } catch {
            Alert.alert("Erro", "Não foi possível carregar as tags.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTags();
    }, []);

    // Abre modal de criar
    const openCreateModal = () => {
        setEditingTag(null);
        setNewTagName("");
        setModalVisible(true);
    };

    // Abre modal de editar
    const openEditModal = (tag: Tag) => {
        setEditingTag(tag);
        setNewTagName(tag.name);
        setModalVisible(true);
    };

    // Salvar (criar ou editar)
    const handleSave = async () => {
        if (!newTagName.trim()) {
            return Alert.alert("Aviso", "O nome da tag não pode ficar em branco.");
        }
        try {
            if (editingTag) {
                await updateTag(editingTag.id, { id: editingTag.id, name: newTagName.trim() });
            } else {
                await createTag({ name: newTagName.trim() });
            }
            await loadTags();
            setModalVisible(false);
        } catch {
            Alert.alert("Erro", editingTag ? "Falha ao editar tag" : "Falha ao criar tag");
        }
    };

    // Abre modal de confirmação de exclusão
    const openDeleteModal = (tag: Tag) => {
        setToDeleteTag(tag);
        setDeleteModalVisible(true);
    };

    // Confirma exclusão
    const handleConfirmDelete = async () => {
        if (!toDeleteTag) return;
        try {
            await deleteTag(toDeleteTag.id);
            await loadTags();
        } catch {
            Alert.alert("Erro", "Falha ao remover tag.");
        } finally {
            setDeleteModalVisible(false);
            setToDeleteTag(null);
        }
    };

    if (loading) {
        return (
            <View className="flex-1 bg-blue-900 justify-center items-center">
                <ActivityIndicator size="large" color={colors.blue[500]} />
            </View>
        );
    }

    return (
        <SafeAreaView className="bg-blue-900 flex-1 items-center">
            <AppLayout>
                <BackButton />

                {/* Cabeçalho */}
                <View className="flex-col w-full gap-3 text-center justify-start">
                    <Text className="text-white text-2xl font-poppinsSemiBold mb-1">
                        Gerenciar Tags
                    </Text>
                    <Text className="text-gray-400 font-inter mb-4">
                        Painel de administração para gerenciar as tags de patrocinadores
                    </Text>

                    {/* Botão criar nova tag */}
                    <Button title="Nova Tag" onPress={openCreateModal} className="mb-4" />
                </View>

                {/* Lista de tags */}
                
                <FlatList
                    data={tags}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingHorizontal: 6, paddingBottom: 20}}
                    ItemSeparatorComponent={() => <View className="h-px bg-border my-2 mx-6" />}
                    renderItem={({ item }) => (
                        <View className="flex-row justify-between items-center bg-background rounded-lg mx-6 px-4 py-3">
                            <Text className="text-white font-inter">{item.name}</Text>
                            <View className="flex-row gap-4">
                                <Pressable onPress={() => openEditModal(item)}>
                                    <FontAwesomeIcon icon={faPencil} size={18} color={colors.blue[200]} />
                                </Pressable>
                                <Pressable onPress={() => openDeleteModal(item)}>
                                    <FontAwesomeIcon icon={faTrash} size={18} color={colors.danger} />
                                </Pressable>
                            </View>
                        </View>
                    )}
                    ListEmptyComponent={() => (
                        <View className="items-center justify-center mt-20">
                            <Text className="text-default font-poppinsMedium text-base">
                                Nenhuma tag cadastrada
                            </Text>
                            <Text className="text-gray-400 font-inter mt-1">
                                Crie a primeira agora mesmo!
                            </Text>
                        </View>
                    )}
                />

                {/* === Modal de criação/edição === */}
                <Modal
                    transparent
                    animationType="fade"
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View className="flex-1 bg-black/40 justify-center items-center">
                        <View className="bg-blue-800 rounded-lg p-6 w-4/5">
                            <Text className="text-white text-xl font-poppinsSemiBold mb-4">
                                {editingTag ? "Editar Tag" : "Nova Tag"}
                            </Text>
                            <Input>
                                <Input.Field
                                    placeholder="Nome da tag"
                                    value={newTagName}
                                    onChangeText={setNewTagName}
                                />
                            </Input>
                            <View className="flex-row justify-end gap-6 mt-6">
                                <Pressable onPress={() => setModalVisible(false)}>
                                    <Text className="text-gray-300 font-inter">Cancelar</Text>
                                </Pressable>
                                <Pressable onPress={handleSave}>
                                    <Text className="text-blue-300 font-inter">
                                        {editingTag ? "Salvar" : "Criar"}
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* === Modal de confirmação de exclusão === */}
                <Modal
                    transparent
                    animationType="fade"
                    visible={deleteModalVisible}
                    onRequestClose={() => setDeleteModalVisible(false)}
                >
                    <View className="flex-1 bg-black/40 justify-center items-center">
                        <View className="bg-blue-800 rounded-lg p-6 w-4/5">
                            <Text className="text-white text-lg font-poppinsSemiBold mb-4">
                                Confirmar exclusão
                            </Text>
                            <Text className="text-gray-300 mb-6">
                                Tem certeza que deseja remover a tag "{toDeleteTag?.name}"?
                            </Text>
                            <View className="flex-row justify-end space-x-4">
                                <TouchableOpacity
                                    onPress={() => setDeleteModalVisible(false)}
                                    className="px-4 py-2 rounded bg-gray-600"
                                >
                                    <Text className="text-white">Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleConfirmDelete}
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
